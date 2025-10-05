import { Box, Text } from '@/components'
import { useAppTheme } from '@/hooks/useAppTheme'
import { StyleSheet } from 'react-native'

type QuizHeaderProps = {
	title: string
	theme: string
	difficultyLabel: string
	progressLabel: string
	timerLabel: string
	timerProgress: number
}

export const QuizHeader = ({
	title,
	theme,
	difficultyLabel,
	progressLabel,
	timerLabel,
	timerProgress,
}: QuizHeaderProps) => {
	const themeObj = useAppTheme()
	const clampedProgress = Math.min(Math.max(timerProgress, 0), 1)
	const progressWidth = `${clampedProgress * 100}%` as const

	return (
		<Box gap="s">
			<Box>
				<Text variant="subtitle" color="subtleText">
					Tema: {theme}
				</Text>
			</Box>
			<Box flexDirection="row" justifyContent="space-between">
				<Text variant="body" color="subtleText">
					Nível: {difficultyLabel}
				</Text>
				<Text variant="body" color="subtleText">
					{progressLabel}
				</Text>
			</Box>
			<Text color="muted">{timerLabel}</Text>
			<Box style={styles.progressTrack}>
				<Box
					height={8}
					borderRadius="full"
					style={[
						styles.progressFill,
						{
							width: progressWidth,
							backgroundColor: themeObj.colors.accent,
						},
					]}
				/>
			</Box>
		</Box>
	)
}

const styles = StyleSheet.create({
	progressTrack: {
		backgroundColor: 'rgba(59, 47, 40, 0.15)',
		borderRadius: 12,
		height: 8,
		overflow: 'hidden',
	},
	progressFill: {
		alignSelf: 'flex-start',
	},
})
