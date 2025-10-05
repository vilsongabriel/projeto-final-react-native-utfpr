import { Box, Button, Screen } from '@/components'
import {
	QuizExplanationModal,
	QuizHeader,
	QuizQuestionCard,
	QuizSummaryCard,
} from './components'
import { QuizScreenUIProps } from './hooks'

type QuizScreenUIComponentProps = QuizScreenUIProps

export const QuizScreenUI = ({
	header,
	question,
	controls,
	summary,
	status,
	explanationModal,
}: QuizScreenUIComponentProps) => {
	return (
		<>
			<Screen flex={1} paddingHorizontal="l" gap="l">
				<QuizHeader {...header} />
				<Box flex={1}>
					{status === 'quiz' && question ? (
						<Box flex={1}>
							<QuizQuestionCard {...question} />
						</Box>
					) : null}
					{status === 'finished' && summary ? (
						<QuizSummaryCard {...summary} />
					) : null}
				</Box>
				{status === 'quiz' && controls ? (
					<Box flexDirection="row" gap="s">
						<Button
							label="Anterior"
							variant="secondary"
							onPress={controls.onPrevious}
							disabled={!controls.canGoPrevious}
							paddingVertical="s"
							paddingHorizontal="l"
							style={{ flex: 1 }}
						/>
						<Button
							label={controls.primaryLabel}
							onPress={controls.onNext}
							disabled={controls.isPrimaryDisabled}
							paddingVertical="s"
							paddingHorizontal="l"
							style={{ flex: 1 }}
						/>
					</Box>
				) : null}
			</Screen>
			{explanationModal ? <QuizExplanationModal {...explanationModal} /> : null}
		</>
	)
}
