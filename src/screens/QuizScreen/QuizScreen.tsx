import type { Router } from 'expo-router'

import { useQuizScreen, type QuizRouteParams } from './hooks'
import { QuizScreenUI } from './QuizScreen.ui'

type QuizScreenProps = {
	params: QuizRouteParams
	router: Router
}

export const QuizScreen = ({ params, router }: QuizScreenProps) => {
	const quizState = useQuizScreen({
		params,
		router,
	})

	return <QuizScreenUI {...quizState} />
}
