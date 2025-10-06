import { Card, Text } from '@/components'
import { Pressable, StyleSheet } from 'react-native'

export type OptionCardProps<T> = {
	label: string
	description?: string
	value: T
	selected: boolean
	onSelect: (value: T) => void
}

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.85,
	},
	description: {
		marginTop: 4,
		fontSize: 14,
	},
})

export function OptionCard<T>({
	label,
	description,
	value,
	selected,
	onSelect,
}: OptionCardProps<T>) {
	return (
		<Pressable
			onPress={() => onSelect(value)}
			style={({ pressed }) => [pressed && styles.pressed]}
			accessibilityRole="button">
			<Card
				elevated={false}
				borderWidth={2}
				borderRadius="m"
				borderColor={selected ? 'accent' : 'primary'}
				backgroundColor="buttonSecondaryBackground"
				paddingVertical="s"
				paddingHorizontal="l">
				<Text
					color={selected ? 'accent' : 'text'}
					fontSize={22}
					lineHeight={30}>
					{label}
				</Text>
				{description ? (
					<Text
						color={selected ? 'accent' : 'subtleText'}
						style={styles.description}>
						{description}
					</Text>
				) : null}
			</Card>
		</Pressable>
	)
}
