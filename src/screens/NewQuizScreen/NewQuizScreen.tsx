import type { Router } from 'expo-router'
import { useCallback } from 'react'
import type {
	QuestionAmountOption,
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

export const NewQuizScreen = ({ theme, router }: NewQuizScreenProps) => {
	const handleEditTheme = useCallback(() => {
		router.back()
	}, [router])

	const newQuizState = useNewQuizScreen({
		theme,
		onEditTheme: handleEditTheme,
		questionAmountValues: QUESTION_AMOUNTS,
		timeLimitValues: TIME_LIMIT_OPTIONS,
		steps: STEPS,
	})

	return <NewQuizScreenUI {...newQuizState} />
}
