import { Box, Button, Card, Text } from '@/components'

type QuizSummaryCardProps = {
	title: string
	message: string
	correctAnswers: number
	totalQuestions: number
	elapsedTimeLabel: string
	onRestart: () => void
}

const formatScore = (correct: number, total: number) => {
	if (total === 0) {
		return '0%'
	}
	return `${Math.round((correct / total) * 100)}%`
}

export const QuizSummaryCard = ({
	title,
	message,
	correctAnswers,
	totalQuestions,
	elapsedTimeLabel,
	onRestart,
}: QuizSummaryCardProps) => {
	const scoreLabel = formatScore(correctAnswers, totalQuestions)

	return (
		<Card gap="m">
			<Text variant="subtitle" color="subtleText">
				{title}
			</Text>
			<Text variant="body">{message}</Text>
			<Box
				flexDirection="row"
				borderRadius="l"
				backgroundColor="background"
				padding="m"
				justifyContent="space-between">
				<Box>
					<Text variant="subtitle">Acertos</Text>
					<Text variant="title">
						{correctAnswers}/{totalQuestions}
					</Text>
				</Box>
				<Box alignItems="flex-end">
					<Text variant="subtitle">Aproveitamento</Text>
					<Text variant="title">{scoreLabel}</Text>
				</Box>
			</Box>
			<Text color="muted">{elapsedTimeLabel}</Text>
			<Box gap="s">
				<Button label="Recomeçar" variant="secondary" onPress={onRestart} />
			</Box>
		</Card>
	)
}
