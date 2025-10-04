import { Box, Text } from '@/components'
import { StepDefinition } from '../NewQuizScreen.hooks'

type StepInfoProps = {
	step: StepDefinition
}

export const StepInfo = ({ step }: StepInfoProps) => {
	return (
		<Box gap="s">
			<Text variant="title">{step.title}</Text>
			<Text variant="body" color="subtleText">
				{step.description}
			</Text>
		</Box>
	)
}
