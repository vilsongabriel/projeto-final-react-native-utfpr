import { RefObject, useCallback, useMemo, useRef, useState } from 'react'
import PagerView, {
	PagerViewOnPageSelectedEvent,
} from 'react-native-pager-view'

export type DifficultyOption =
	| 'beginner'
	| 'intermediate'
	| 'advanced'
	| 'expert'
export type QuestionAmountOption = 5 | 10 | 15
export type TimeLimitOption = 2 | 5 | 10 | 15 | 30

export type StepKey = 'difficulty' | 'quantity' | 'timeLimit'

export type StepDefinition = {
	key: StepKey
	title: string
	description: string
}

export type OptionItem<T> = {
	value: T
	label: string
	description?: string
}

export type UseNewQuizScreenParams = {
	theme: string
	onEditTheme: () => void
	questionAmountValues: QuestionAmountOption[]
	timeLimitValues: TimeLimitOption[]
	steps: StepDefinition[]
	onStartQuiz: (payload: QuizSetupPayload) => void
}

export type NewQuizScreenState = {
	theme: string
	steps: StepDefinition[]
	currentIndex: number
	primaryLabel: string
	pagerRef: RefObject<PagerView | null>
	handlePageSelected: (event: PagerViewOnPageSelectedEvent) => void
	difficultyOptions: OptionItem<DifficultyOption>[]
	selectedDifficulty: DifficultyOption
	onSelectDifficulty: (value: DifficultyOption) => void
	questionAmountOptions: OptionItem<QuestionAmountOption>[]
	selectedQuestionAmount: QuestionAmountOption
	onSelectQuestionAmount: (value: QuestionAmountOption) => void
	timeLimitOptions: OptionItem<TimeLimitOption>[]
	selectedTimeLimit: TimeLimitOption
	onSelectTimeLimit: (value: TimeLimitOption) => void
	onPrimaryAction: () => void
	onEditTheme: () => void
}

export type QuizSetupPayload = {
	theme: string
	difficulty: DifficultyOption
	questionAmount: QuestionAmountOption
	timeLimit: TimeLimitOption
}

const DIFFICULTY_OPTIONS: DifficultyOption[] = [
	'beginner',
	'intermediate',
	'advanced',
	'expert',
]

const DIFFICULTY_LABELS: Record<DifficultyOption, string> = {
	beginner: 'Iniciante',
	intermediate: 'Intermediário',
	advanced: 'Avançado',
	expert: 'Expert',
}

const formatTimeLabel = (minutes: TimeLimitOption) => `${minutes} minutos`

type StepNavigatorState = {
	pagerRef: RefObject<PagerView | null>
	currentIndex: number
	goToStep: (index: number) => void
	goToNextStep: () => void
	handlePageSelected: (event: PagerViewOnPageSelectedEvent) => void
	isLastStep: boolean
}

const useStepNavigator = (totalSteps: number): StepNavigatorState => {
	const pagerRef = useRef<PagerView | null>(null)
	const [currentIndex, setCurrentIndex] = useState(0)

	const clampIndex = useCallback(
		(index: number) => Math.min(Math.max(index, 0), totalSteps - 1),
		[totalSteps],
	)

	const goToStep = useCallback(
		(index: number) => {
			const nextIndex = clampIndex(index)
			const pager = pagerRef.current
			if (pager) {
				pager.setPage(nextIndex)
			}
			setCurrentIndex(nextIndex)
		},
		[clampIndex],
	)

	const goToNextStep = useCallback(() => {
		goToStep(currentIndex + 1)
	}, [currentIndex, goToStep])

	const handlePageSelected = useCallback(
		(event: PagerViewOnPageSelectedEvent) => {
			setCurrentIndex(event.nativeEvent.position)
		},
		[],
	)

	const isLastStep = currentIndex === totalSteps - 1

	return {
		pagerRef,
		currentIndex,
		goToStep,
		goToNextStep,
		handlePageSelected,
		isLastStep,
	}
}

type QuizSelectionsState = {
	difficultyOptions: OptionItem<DifficultyOption>[]
	selectedDifficulty: DifficultyOption
	onSelectDifficulty: (value: DifficultyOption) => void
	questionAmountOptions: OptionItem<QuestionAmountOption>[]
	selectedQuestionAmount: QuestionAmountOption
	onSelectQuestionAmount: (value: QuestionAmountOption) => void
	timeLimitOptions: OptionItem<TimeLimitOption>[]
	selectedTimeLimit: TimeLimitOption
	onSelectTimeLimit: (value: TimeLimitOption) => void
}

const useQuizSelections = (
	questionAmountValues: QuestionAmountOption[],
	timeLimitValues: TimeLimitOption[],
): QuizSelectionsState => {
	const [difficulty, setDifficulty] = useState<DifficultyOption>(
		DIFFICULTY_OPTIONS[0],
	)
	const [questionAmount, setQuestionAmount] = useState<QuestionAmountOption>(
		questionAmountValues[0] ?? 5,
	)
	const [timeLimit, setTimeLimit] = useState<TimeLimitOption>(
		timeLimitValues[0] ?? 2,
	)

	const difficultyOptions = useMemo(
		() =>
			DIFFICULTY_OPTIONS.map<OptionItem<DifficultyOption>>(value => ({
				value,
				label: DIFFICULTY_LABELS[value],
			})),
		[],
	)

	const questionAmountOptions = useMemo(
		() =>
			questionAmountValues.map<OptionItem<QuestionAmountOption>>(value => ({
				value,
				label: `${value} questões`,
			})),
		[questionAmountValues],
	)

	const timeLimitOptionItems = useMemo(
		() =>
			timeLimitValues.map<OptionItem<TimeLimitOption>>(value => ({
				value,
				label: formatTimeLabel(value),
			})),
		[timeLimitValues],
	)

	return {
		difficultyOptions,
		selectedDifficulty: difficulty,
		onSelectDifficulty: setDifficulty,
		questionAmountOptions,
		selectedQuestionAmount: questionAmount,
		onSelectQuestionAmount: setQuestionAmount,
		timeLimitOptions: timeLimitOptionItems,
		selectedTimeLimit: timeLimit,
		onSelectTimeLimit: setTimeLimit,
	}
}

export const useNewQuizScreen = ({
	theme,
	onEditTheme,
	questionAmountValues,
	timeLimitValues,
	steps,
	onStartQuiz,
}: UseNewQuizScreenParams): NewQuizScreenState => {
	const {
		pagerRef,
		currentIndex,
		goToNextStep,
		handlePageSelected,
		isLastStep,
	} = useStepNavigator(steps.length)

	const {
		difficultyOptions,
		selectedDifficulty,
		onSelectDifficulty,
		questionAmountOptions,
		selectedQuestionAmount,
		onSelectQuestionAmount,
		timeLimitOptions: timeLimitOptionItems,
		selectedTimeLimit,
		onSelectTimeLimit,
	} = useQuizSelections(questionAmountValues, timeLimitValues)

	const primaryLabel = isLastStep ? 'Gerar quiz' : 'Continuar'

	const handlePrimaryAction = useCallback(() => {
		if (!isLastStep) {
			goToNextStep()
			return
		}

		onStartQuiz({
			theme,
			difficulty: selectedDifficulty,
			questionAmount: selectedQuestionAmount,
			timeLimit: selectedTimeLimit,
		})
	}, [
		goToNextStep,
		isLastStep,
		onStartQuiz,
		selectedDifficulty,
		selectedQuestionAmount,
		selectedTimeLimit,
		theme,
	])

	return {
		theme,
		steps,
		currentIndex,
		primaryLabel,
		pagerRef,
		handlePageSelected,
		difficultyOptions,
		selectedDifficulty,
		onSelectDifficulty,
		questionAmountOptions,
		selectedQuestionAmount,
		onSelectQuestionAmount,
		timeLimitOptions: timeLimitOptionItems,
		selectedTimeLimit,
		onSelectTimeLimit,
		onPrimaryAction: handlePrimaryAction,
		onEditTheme,
	}
}
