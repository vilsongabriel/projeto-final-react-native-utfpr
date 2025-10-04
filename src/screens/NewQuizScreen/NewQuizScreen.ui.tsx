import { Box, Button, Screen, Text } from '@/components'
import { StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'
import { OptionCard, StepIndicators, StepInfo, ThemeHeader } from './components'
import { NewQuizScreenState } from './NewQuizScreen.hooks'

const styles = StyleSheet.create({
	pager: {
		flex: 1,
	},
})

export type NewQuizScreenUIProps = NewQuizScreenState

export const NewQuizScreenUI = ({
	theme,
	steps,
	currentIndex,
	primaryLabel,
	pagerRef,
	handlePageSelected,
	difficultyOptions,
	onSelectDifficulty,
	selectedDifficulty,
	questionAmountOptions,
	onSelectQuestionAmount,
	selectedQuestionAmount,
	timeLimitOptions,
	onSelectTimeLimit,
	selectedTimeLimit,
	onPrimaryAction,
	onEditTheme,
}: NewQuizScreenUIProps) => {
	const currentStep = steps[currentIndex]

	return (
		<Screen flex={1} paddingHorizontal="xl" gap="xl">
			<ThemeHeader theme={theme} onEditTheme={onEditTheme} />
			<Box flex={1} gap="l">
				<StepInfo step={currentStep} />
				<PagerView
					ref={pagerRef}
					initialPage={0}
					style={styles.pager}
					onPageSelected={handlePageSelected}>
					<Box key="difficulty" flex={1} justifyContent="center" gap="m">
						{difficultyOptions.map(option => (
							<OptionCard
								key={option.value}
								{...option}
								onSelect={onSelectDifficulty}
								selected={selectedDifficulty === option.value}
							/>
						))}
					</Box>
					<Box key="quantity" flex={1} justifyContent="center" gap="m">
						{questionAmountOptions.map(option => (
							<OptionCard
								key={option.value}
								{...option}
								onSelect={onSelectQuestionAmount}
								selected={selectedQuestionAmount === option.value}
							/>
						))}
					</Box>
					<Box key="timeLimit" flex={1} justifyContent="center" gap="m">
						{timeLimitOptions.map(option => (
							<OptionCard
								key={option.value}
								{...option}
								onSelect={onSelectTimeLimit}
								selected={selectedTimeLimit === option.value}
							/>
						))}
					</Box>
				</PagerView>
			</Box>
			<Box gap="m">
				<StepIndicators steps={steps} currentIndex={currentIndex} />
				<Text textAlign="center" color="subtleText">
					{currentIndex + 1} de {steps.length}
				</Text>
				<Button label={primaryLabel} onPress={onPrimaryAction} />
			</Box>
		</Screen>
	)
}
