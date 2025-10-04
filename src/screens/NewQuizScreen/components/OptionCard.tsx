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
				borderWidth={selected ? 2 : 1}
				borderColor={selected ? 'accent' : 'muted'}
				backgroundColor={selected ? 'buttonSecondaryBackground' : 'surface'}
				padding="m"
				gap="s">
				<Text variant="subtitle" color={selected ? 'accent' : 'text'}>
					{label}
				</Text>
				{description ? (
					<Text
						variant="body"
						color={selected ? 'accent' : 'subtleText'}
						style={styles.description}>
						{description}
					</Text>
				) : null}
			</Card>
		</Pressable>
	)
}
