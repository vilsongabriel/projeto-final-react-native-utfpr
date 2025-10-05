import type { QuizPayload } from '@/services/quiz'
import { useCallback, useMemo, useState } from 'react'

type UseQuizAnswersReturn = {
	answers: (number | null)[]
	selectedAnswer: number | null
	selectAnswer: (index: number) => void
	resetAnswers: (totalQuestions: number) => void
	correctAnswersCount: number
}

export const useQuizAnswers = (
	currentQuestionIndex: number,
	quiz: QuizPayload | null,
): UseQuizAnswersReturn => {
	const [answers, setAnswers] = useState<(number | null)[]>([])

	const selectAnswer = useCallback(
		(optionIndex: number) => {
			setAnswers(current => {
				if (current[currentQuestionIndex] !== null) {
					return current
				}

				const next = [...current]
				next[currentQuestionIndex] = optionIndex
				return next
			})
		},
		[currentQuestionIndex],
	)

	const resetAnswers = useCallback((totalQuestions: number) => {
		setAnswers(Array.from({ length: totalQuestions }, () => null))
	}, [])

	const selectedAnswer = answers[currentQuestionIndex] ?? null

	const correctAnswersCount = useMemo(() => {
		if (!quiz) {
			return 0
		}

		return quiz.questions.reduce((count, question, index) => {
			if (answers[index] === question.answerIndex) {
				return count + 1
			}
			return count
		}, 0)
	}, [quiz, answers])

	return {
		answers,
		selectedAnswer,
		selectAnswer,
		resetAnswers,
		correctAnswersCount,
	}
}
