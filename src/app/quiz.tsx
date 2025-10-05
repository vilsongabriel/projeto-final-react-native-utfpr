import { QuizScreen } from '@/screens'
import { useLocalSearchParams, useRouter } from 'expo-router'

export default function QuizRoute() {
	const params = useLocalSearchParams<{
		theme?: string | string[]
		difficulty?: string | string[]
		timeLimit?: string | string[]
		quizData?: string | string[]
	}>()
	const router = useRouter()

	return <QuizScreen params={params} router={router} />
}
