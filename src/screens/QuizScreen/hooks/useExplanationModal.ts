import type { QuizPayload } from '@/services/quiz'
import { useCallback, useEffect, useState } from 'react'

type ExplanationModalState = {
	title: string
	explanation: string
	statusLabel: string
	statusColor: 'success' | 'error'
} | null

type UseExplanationModalReturn = {
	modalState: ExplanationModalState
	explanationsShown: boolean[]
	showExplanation: (
		questionIndex: number,
		userAnswer: number | null,
		quiz: QuizPayload,
	) => void
	closeModal: () => void
	resetExplanations: (totalQuestions: number) => void
	isExplanationShown: (questionIndex: number) => boolean
}

export const useExplanationModal = (
	currentQuestionIndex: number,
): UseExplanationModalReturn => {
	const [modalState, setModalState] = useState<ExplanationModalState>(null)
	const [explanationsShown, setExplanationsShown] = useState<boolean[]>([])

	const showExplanation = useCallback(
		(questionIndex: number, userAnswer: number | null, quiz: QuizPayload) => {
			const question = quiz.questions[questionIndex]
			if (!question) {
				return
			}

			const explanationText = question.explanation?.trim()
			if (!explanationText) {
				return
			}

			setExplanationsShown(current => {
				const next = [...current]
				next[questionIndex] = true
				return next
			})

			const isCorrect = userAnswer === question.answerIndex

			setModalState({
				title: `Questão ${questionIndex + 1}`,
				explanation: explanationText,
				statusLabel: isCorrect ? 'Correto' : 'Incorreto',
				statusColor: isCorrect ? 'success' : 'error',
			})
		},
		[],
	)

	const closeModal = useCallback(() => {
		setModalState(null)
	}, [])

	const resetExplanations = useCallback((totalQuestions: number) => {
		setExplanationsShown(Array.from({ length: totalQuestions }, () => false))
	}, [])

	const isExplanationShown = useCallback(
		(questionIndex: number) => {
			return explanationsShown[questionIndex] ?? false
		},
		[explanationsShown],
	)

	useEffect(() => {
		setModalState(null)
	}, [currentQuestionIndex])

	return {
		modalState,
		explanationsShown,
		showExplanation,
		closeModal,
		resetExplanations,
		isExplanationShown,
	}
}
