import { useCallback, useState } from 'react'

type UseQuizNavigationReturn = {
	currentQuestionIndex: number
	goToNext: () => void
	goToPrevious: () => void
	canGoNext: boolean
	canGoPrevious: boolean
	isLastQuestion: boolean
	reset: () => void
}

/**
 * Manages navigation between quiz questions.
 * Handles moving forward, backward, and tracking position.
 */
export const useQuizNavigation = (
	totalQuestions: number,
): UseQuizNavigationReturn => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

	const goToNext = useCallback(() => {
		setCurrentQuestionIndex(prev => Math.min(prev + 1, totalQuestions - 1))
	}, [totalQuestions])

	const goToPrevious = useCallback(() => {
		setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))
	}, [])

	const reset = useCallback(() => {
		setCurrentQuestionIndex(0)
	}, [])

	const canGoPrevious = currentQuestionIndex > 0
	const canGoNext = currentQuestionIndex < totalQuestions - 1
	const isLastQuestion = currentQuestionIndex === totalQuestions - 1

	return {
		currentQuestionIndex,
		goToNext,
		goToPrevious,
		canGoNext,
		canGoPrevious,
		isLastQuestion,
		reset,
	}
}
