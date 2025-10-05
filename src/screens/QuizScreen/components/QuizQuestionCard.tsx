import { Box, Button, Card, Text } from '@/components'
import { ScrollView, StyleSheet } from 'react-native'
import { QuizOptionButton } from './QuizOptionButton'

type QuizQuestionCardProps = {
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

export const QuizQuestionCard = ({
	currentNumber,
	totalQuestions,
	statement,
	options,
	selectedOption,
	correctOption,
	explanation: _explanation,
	isExplanationRevealed,
	canShowExplanation,
	onShowExplanation,
	onSelectOption,
}: QuizQuestionCardProps) => {
	const explanationButtonLabel = isExplanationRevealed
		? 'Ver explicação novamente'
		: 'Ver explicação'
	return (
		<Card gap="m" flex={1} style={styles.card}>
			<Box gap="s">
				<Text variant="subtitle" color="subtleText">
					{`Questão ${currentNumber} de ${totalQuestions}`}
				</Text>
				<Text variant="body">{statement}</Text>
			</Box>
			<Box flex={1}>
				<ScrollView
					style={styles.optionsContainer}
					contentContainerStyle={styles.optionsContent}
					showsVerticalScrollIndicator={false}>
					<Box gap="s">
						{options.map((option, index) => {
							const isSelected = selectedOption === index
							const isCorrect = correctOption === index
							const showYourChoice =
								selectedOption !== null && isSelected && !isCorrect
							const showCorrectAnswer = selectedOption !== null && isCorrect

							return (
								<Box key={option} gap="xs">
									{showYourChoice ? (
										<Text
											variant="subtitle"
											color="error"
											paddingLeft="s"
											style={styles.label}>
											Você escolheu
										</Text>
									) : null}
									{showCorrectAnswer ? (
										<Text
											variant="subtitle"
											color="success"
											paddingLeft="s"
											style={styles.label}>
											Resposta correta
										</Text>
									) : null}
									<QuizOptionButton
										label={option}
										index={index}
										onPress={onSelectOption}
										selectedOption={selectedOption}
										correctOption={correctOption}
									/>
								</Box>
							)
						})}
					</Box>
				</ScrollView>
			</Box>
			{canShowExplanation ? (
				<Button
					label={explanationButtonLabel}
					onPress={onShowExplanation}
					variant="secondary"
					paddingVertical="s"
					paddingHorizontal="m"
					style={styles.revealButton}
				/>
			) : null}
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
	},
	optionsContainer: {
		flex: 1,
	},
	optionsContent: {
		paddingBottom: 8,
	},
	revealButton: {
		alignSelf: 'flex-start',
	},
	label: {
		fontSize: 12,
		fontWeight: '600',
	},
})
