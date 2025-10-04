import { Box } from '@/components'
import { StepDefinition } from '../NewQuizScreen.hooks'

type StepIndicatorsProps = {
	steps: StepDefinition[]
	currentIndex: number
}

export const StepIndicators = ({
	steps,
	currentIndex,
}: StepIndicatorsProps) => {
	return (
		<Box
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			gap="s">
			{steps.map((step, index) => {
				const isActive = index === currentIndex
				return (
					<Box
						key={step.key}
						width={isActive ? 24 : 8}
						height={8}
						borderRadius="full"
						backgroundColor={isActive ? 'accent' : 'muted'}
					/>
				)
			})}
		</Box>
	)
}
