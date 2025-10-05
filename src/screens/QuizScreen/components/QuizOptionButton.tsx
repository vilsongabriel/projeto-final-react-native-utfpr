import { Text } from '@/components'
import { useAppTheme } from '@/hooks/useAppTheme'
import { memo, useEffect, useMemo } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withSpring,
	withTiming,
} from 'react-native-reanimated'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

type QuizOptionButtonProps = {
	label: string
	index: number
	onPress: (index: number) => void
	selectedOption: number | null
	correctOption: number
} & Omit<TouchableOpacityProps, 'onPress'>

type OptionVariant = 'default' | 'selected' | 'correct' | 'incorrect'

const resolveVariant = (
	index: number,
	selected: number | null,
	correct: number,
): OptionVariant => {
	if (selected === null) {
		return 'default'
	}

	if (index === correct) {
		return 'correct'
	}

	if (selected === index) {
		return 'incorrect'
	}

	return 'default'
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export const QuizOptionButton = memo(
	({
		label,
		index,
		onPress,
		selectedOption,
		correctOption,
		style,
		...rest
	}: QuizOptionButtonProps) => {
		const theme = useAppTheme()
		const variant = useMemo(
			() => resolveVariant(index, selectedOption, correctOption),
			[index, selectedOption, correctOption],
		)

		const shakeTranslate = useSharedValue(0)
		const scaleValue = useSharedValue(1)
		const elevationValue = useSharedValue(0)

		useEffect(() => {
			if (selectedOption === null) {
				return
			}

			if (variant === 'incorrect') {
				shakeTranslate.value = withSequence(
					withTiming(-10, { duration: 50 }),
					withTiming(10, { duration: 50 }),
					withTiming(-10, { duration: 50 }),
					withTiming(10, { duration: 50 }),
					withTiming(0, { duration: 50 }),
				)
			} else if (variant === 'correct') {
				scaleValue.value = withSequence(
					withSpring(1.015, { damping: 15, stiffness: 100 }),
					withSpring(1, { damping: 20, stiffness: 80 }),
				)
				elevationValue.value = withSequence(
					withTiming(6, { duration: 200 }),
					withTiming(2, { duration: 250 }),
					withTiming(0, { duration: 200 }),
				)
			}
		}, [selectedOption, variant, shakeTranslate, scaleValue, elevationValue])

		const animatedStyle = useAnimatedStyle(() => ({
			transform: [
				{ translateX: shakeTranslate.value },
				{ scale: scaleValue.value },
			],
			elevation: elevationValue.value,
			shadowOpacity: elevationValue.value > 0 ? 0.2 : 0,
			shadowRadius: elevationValue.value,
			shadowOffset: {
				width: 0,
				height: elevationValue.value / 2,
			},
		}))

		const letter = LETTERS[index] ?? String.fromCharCode(65 + index)
		const { textColor, containerStyle } = useMemo(() => {
			switch (variant) {
				case 'correct':
					return {
						textColor: theme.colors.successContrast,
						containerStyle: {
							backgroundColor: theme.colors.success,
							borderColor: theme.colors.success,
						},
					}
				case 'incorrect':
					return {
						textColor: theme.colors.errorContrast,
						containerStyle: {
							backgroundColor: theme.colors.error,
							borderColor: theme.colors.error,
						},
					}
				case 'selected':
					return {
						textColor: theme.colors.subtleText,
						containerStyle: styles.selected,
					}
				default:
					return {
						textColor: theme.colors.text,
						containerStyle: styles.default,
					}
			}
		}, [theme.colors, variant])

		const sanitizedLabel = useMemo(() => {
			const normalized = label.trimStart()
			const upperNormalized = normalized.toUpperCase()
			const upperLetter = letter.toUpperCase()
			const prefixes = [
				`${upperLetter}.`,
				`${upperLetter})`,
				`${upperLetter} -`,
				`${upperLetter}-`,
				`${upperLetter}:`,
			]
			for (const prefix of prefixes) {
				if (upperNormalized.startsWith(prefix)) {
					const sliced = normalized.slice(prefix.length).trimStart()
					return sliced.length > 0 ? sliced : normalized
				}
			}
			return normalized
		}, [label, letter])

		return (
			<AnimatedTouchable
				activeOpacity={0.82}
				onPress={() => onPress(index)}
				disabled={selectedOption !== null}
				style={[styles.container, containerStyle, style, animatedStyle]}
				{...rest}>
				<Text style={[styles.text, { color: textColor }]}>
					{`${letter}) ${sanitizedLabel}`}
				</Text>
			</AnimatedTouchable>
		)
	},
)

QuizOptionButton.displayName = 'QuizOptionButton'

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		borderWidth: 2,
		borderColor: 'rgba(59, 47, 40, 0.25)',
		paddingVertical: 12,
		paddingHorizontal: 20,
		overflow: 'hidden',
		shadowColor: '#000',
	},
	text: {
		fontFamily: 'Zain_700Bold',
		fontSize: 20,
	},
	default: {
		backgroundColor: 'transparent',
	},
	selected: {
		backgroundColor: 'rgba(117, 61, 38, 0.14)',
		borderColor: 'rgba(117, 61, 38, 0.6)',
	},
})
