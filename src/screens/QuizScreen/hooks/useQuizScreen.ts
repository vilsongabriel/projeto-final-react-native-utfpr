import type { QuizPayload } from '@/services/quiz'
import type { Router } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
	DIFFICULTY_LABELS,
	extractSingleParam,
	formatTime,
	parseDifficulty,
	parseNumberParam,
} from '../QuizScreen.utils'
import { useCountdownTimer } from './useCountdownTimer'
import { useExplanationModal } from './useExplanationModal'
import { useQuizAnswers } from './useQuizAnswers'
import { useQuizNavigation } from './useQuizNavigation'

export type QuizStatus = 'quiz' | 'finished'

export type QuizScreenUIProps = {
	status: QuizStatus
	header: {
		theme: string
		title: string
		difficultyLabel: string
		progressLabel: string
		timerLabel: string
		timerProgress: number
	}
	question?: {
		currentNumber: number
		totalQuestions: number
		statement: string
		options: string[]
		selectedOption: number | null
		correctOption: number
		explanation: string
		isExplanationRevealed: boolean
		canShowExplanation: boolean
		onShowExplanation: () => void
		onSelectOption: (index: number) => void
	}
	controls?: {
		canGoPrevious: boolean
		onPrevious: () => void
		onNext: () => void
		primaryLabel: string
		isPrimaryDisabled: boolean
	}
	explanationModal?: {
		visible: boolean
		title: string
		explanation: string
		statusLabel: string
		statusColor: 'success' | 'error'
		onClose: () => void
	}
	summary?: {
		title: string
		message: string
		correctAnswers: number
		totalQuestions: number
		elapsedTimeLabel: string
		onRestart: () => void
	}
}

export type QuizRouteParams = {
	theme?: string | string[]
	difficulty?: string | string[]
	timeLimit?: string | string[]
	quizData?: string | string[]
}

type UseQuizScreenParams = {
	params: QuizRouteParams
	router: Router
}

export const useQuizScreen = ({
	params,
	router,
}: UseQuizScreenParams): QuizScreenUIProps => {
	const theme = extractSingleParam(params.theme)?.trim() || 'Tema livre'
	const difficulty = parseDifficulty(params.difficulty)
	const timeLimitMinutes = parseNumberParam(params.timeLimit, 5)

	const quizData = useMemo(() => {
		const quizDataParam = extractSingleParam(params.quizData)
		if (!quizDataParam) {
			return null
		}
		try {
			return JSON.parse(decodeURIComponent(quizDataParam)) as QuizPayload
		} catch {
			return null
		}
	}, [params.quizData])

	const [isFinished, setIsFinished] = useState(false)
	const [finishedInfo, setFinishedInfo] = useState<{
		correctAnswers: number
		elapsedSeconds: number
	} | null>(null)
	const startedAtRef = useRef<number | null>(null)

	const totalQuestions = quizData?.questions.length ?? 0

	const navigation = useQuizNavigation(totalQuestions)
	const answersHook = useQuizAnswers(navigation.currentQuestionIndex, quizData)
	const explanationHook = useExplanationModal(navigation.currentQuestionIndex)

	const completeQuiz = useCallback(() => {
		if (isFinished) {
			return
		}

		setIsFinished(true)

		const elapsedSeconds = startedAtRef.current
			? Math.round((Date.now() - startedAtRef.current) / 1000)
			: timeLimitMinutes * 60

		setFinishedInfo({
			correctAnswers: answersHook.correctAnswersCount,
			elapsedSeconds,
		})
	}, [isFinished, timeLimitMinutes, answersHook.correctAnswersCount])

	const timer = useCountdownTimer(completeQuiz)

	useEffect(() => {
		if (quizData && !startedAtRef.current) {
			startedAtRef.current = Date.now()
			const totalSeconds = timeLimitMinutes * 60

			if (totalSeconds > 0) {
				timer.start(totalSeconds)
			}

			answersHook.resetAnswers(quizData.questions.length)
			explanationHook.resetExplanations(quizData.questions.length)
			navigation.reset()
		}
	}, [
		quizData,
		timeLimitMinutes,
		timer,
		answersHook,
		explanationHook,
		navigation,
	])

	const handleNext = useCallback(() => {
		if (navigation.isLastQuestion) {
			timer.stop()
			completeQuiz()
		} else {
			navigation.goToNext()
		}
	}, [navigation, timer, completeQuiz])

	const handleRestart = useCallback(() => {
		router.replace({
			pathname: '/new-quiz',
			params: { theme },
		})
	}, [router, theme])

	const handleShowExplanation = useCallback(() => {
		if (quizData) {
			explanationHook.showExplanation(
				navigation.currentQuestionIndex,
				answersHook.selectedAnswer,
				quizData,
			)
		}
	}, [
		quizData,
		explanationHook,
		navigation.currentQuestionIndex,
		answersHook.selectedAnswer,
	])

	const uiStatus: QuizStatus = isFinished ? 'finished' : 'quiz'

	const difficultyLabel = DIFFICULTY_LABELS[difficulty] ?? 'Personalizado'

	const progressLabel = useMemo(() => {
		if (!quizData) {
			return ''
		}
		return `Pergunta ${navigation.currentQuestionIndex + 1} de ${quizData.questions.length}`
	}, [navigation.currentQuestionIndex, quizData])

	const timerLabel = useMemo(() => {
		if (timeLimitMinutes <= 0) {
			return 'Sem limite de tempo'
		}
		return `Tempo restante: ${timer.timerLabel}`
	}, [timeLimitMinutes, timer.timerLabel])

	const timerProgress = timeLimitMinutes > 0 ? timer.timerProgress : 1

	const currentQuestion =
		quizData?.questions[navigation.currentQuestionIndex] ?? null

	return {
		status: uiStatus,
		header: {
			theme,
			title: quizData?.title ?? theme,
			difficultyLabel,
			progressLabel,
			timerLabel,
			timerProgress,
		},
		question:
			uiStatus === 'quiz' && currentQuestion
				? {
						currentNumber: navigation.currentQuestionIndex + 1,
						totalQuestions,
						statement: currentQuestion.statement,
						options: currentQuestion.options,
						selectedOption: answersHook.selectedAnswer,
						correctOption: currentQuestion.answerIndex,
						explanation: currentQuestion.explanation,
						isExplanationRevealed: explanationHook.isExplanationShown(
							navigation.currentQuestionIndex,
						),
						canShowExplanation:
							Boolean(currentQuestion.explanation?.trim()) &&
							answersHook.selectedAnswer !== null,
						onShowExplanation: handleShowExplanation,
						onSelectOption: answersHook.selectAnswer,
					}
				: undefined,
		controls:
			uiStatus === 'quiz' && currentQuestion
				? {
						canGoPrevious: navigation.canGoPrevious,
						onPrevious: navigation.goToPrevious,
						onNext: handleNext,
						primaryLabel: navigation.isLastQuestion ? 'Finalizar' : 'Próxima',
						isPrimaryDisabled: answersHook.selectedAnswer === null,
					}
				: undefined,
		explanationModal: explanationHook.modalState
			? {
					visible: true,
					...explanationHook.modalState,
					onClose: explanationHook.closeModal,
				}
			: undefined,
		summary:
			uiStatus === 'finished' && finishedInfo
				? {
						title: 'Questionário finalizado',
						message: 'Confira seu desempenho abaixo.',
						correctAnswers: finishedInfo.correctAnswers,
						totalQuestions,
						elapsedTimeLabel:
							timeLimitMinutes > 0
								? `Tempo utilizado: ${formatTime(finishedInfo.elapsedSeconds)}`
								: `Duração: ${formatTime(finishedInfo.elapsedSeconds)}`,
						onRestart: handleRestart,
					}
				: undefined,
	}
}
