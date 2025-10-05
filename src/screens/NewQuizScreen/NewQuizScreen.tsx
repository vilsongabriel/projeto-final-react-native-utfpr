import { Box, Button, Screen, Text } from '@/components'
import { useAppTheme } from '@/hooks/useAppTheme'
import { quizService, type QuizPromptInput } from '@/services/quiz'
import type { Router } from 'expo-router'
import { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import type {
	QuestionAmountOption,
	QuizSetupPayload,
	StepDefinition,
	TimeLimitOption,
} from './NewQuizScreen.hooks'
import { useNewQuizScreen } from './NewQuizScreen.hooks'
import { NewQuizScreenUI } from './NewQuizScreen.ui'

type NewQuizScreenProps = {
	theme: string
	router: Router
}

const QUESTION_AMOUNTS: QuestionAmountOption[] = [5, 10, 15]

const TIME_LIMIT_OPTIONS: TimeLimitOption[] = [2, 5, 10, 15, 30]

const STEPS: StepDefinition[] = [
	{
		key: 'difficulty',
		title: 'Escolha a dificuldade',
		description: 'Selecione o nível de desafio desejado para este quiz.',
	},
	{
		key: 'quantity',
		title: 'Quantidade de questões',
		description: 'Defina quantas perguntas você quer responder.',
	},
	{
		key: 'timeLimit',
		title: 'Tempo limite',
		description: 'Escolha quanto tempo terá para concluir o quiz.',
	},
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const MAX_RETRY_ATTEMPTS = 3
const RETRY_BASE_DELAY = 1200

export const NewQuizScreen = ({ theme, router }: NewQuizScreenProps) => {
	const appTheme = useAppTheme()
	const [isGenerating, setIsGenerating] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleEditTheme = useCallback(() => {
		router.back()
	}, [router])

	const handleStartQuiz = useCallback(
		async ({ difficulty, questionAmount, timeLimit }: QuizSetupPayload) => {
			setIsGenerating(true)
			setError(null)

			const promptInput: QuizPromptInput = {
				subject: theme,
				difficulty,
				numberOfQuestions: questionAmount,
				optionsPerQuestion: 4,
				language: 'pt-BR',
			}

			let lastError: unknown

			for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt += 1) {
				try {
					const quizData = await quizService.generate(promptInput)

					const quizDataParam = encodeURIComponent(JSON.stringify(quizData))

					router.replace({
						pathname: '/quiz',
						params: {
							theme,
							difficulty,
							timeLimit: String(timeLimit),
							quizData: quizDataParam,
						},
					})
					return
				} catch (err) {
					lastError = err
					if (attempt < MAX_RETRY_ATTEMPTS) {
						await delay(RETRY_BASE_DELAY * attempt)
					}
				}
			}

			const errorMessage =
				lastError instanceof Error && lastError.message
					? lastError.message
					: 'Não foi possível gerar o quiz. Tente novamente.'

			setError(errorMessage)
			setIsGenerating(false)
		},
		[router, theme],
	)

	const newQuizState = useNewQuizScreen({
		theme,
		onEditTheme: handleEditTheme,
		questionAmountValues: QUESTION_AMOUNTS,
		timeLimitValues: TIME_LIMIT_OPTIONS,
		steps: STEPS,
		onStartQuiz: handleStartQuiz,
	})

	if (isGenerating) {
		return (
			<Screen flex={1} paddingHorizontal="l" gap="l" justifyContent="center">
				<Box flex={1} justifyContent="center" alignItems="center" gap="m">
					<ActivityIndicator size="large" color={appTheme.colors.primary} />
					<Text textAlign="center" color="muted">
						Preparando tudo...
					</Text>
				</Box>
			</Screen>
		)
	}

	if (error) {
		return (
			<Screen flex={1} paddingHorizontal="l" gap="l" justifyContent="center">
				<Box flex={1} justifyContent="center" gap="m">
					<Text textAlign="center">{error}</Text>
					<Button label="Tentar novamente" onPress={() => setError(null)} />
				</Box>
			</Screen>
		)
	}

	return <NewQuizScreenUI {...newQuizState} />
}
