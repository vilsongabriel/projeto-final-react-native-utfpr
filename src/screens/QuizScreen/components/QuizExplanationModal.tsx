import { Box, Button, Card, Text } from '@/components'
import { Modal, Pressable, StyleSheet, View } from 'react-native'

export type QuizExplanationModalProps = {
	visible: boolean
	title: string
	explanation: string
	statusLabel: string
	statusColor: 'success' | 'error'
	onClose: () => void
}

export const QuizExplanationModal = ({
	visible,
	title,
	explanation,
	statusLabel,
	statusColor,
	onClose,
}: QuizExplanationModalProps) => {
	return (
		<Modal
			transparent
			visible={visible}
			animationType="fade"
			onRequestClose={onClose}>
			<View style={styles.backdrop}>
				<Pressable style={styles.overlay} onPress={onClose} />
				<Card style={styles.card} gap="m" padding="l">
					<Box gap="xs">
						<Text variant="subtitle" color={statusColor}>
							{statusLabel}
						</Text>
						<Text variant="subtitle" color={statusColor}>
							Explicação
						</Text>
						<Text variant="body" color="subtleText">
							{title}
						</Text>
					</Box>
					<Text>{explanation}</Text>
					<Button
						label="Fechar"
						onPress={onClose}
						variant="primary"
						paddingVertical="s"
						style={styles.closeButton}
					/>
				</Card>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
	},
	card: {
		width: '100%',
		maxWidth: 360,
	},
	closeButton: {
		alignSelf: 'flex-end',
		marginTop: 8,
	},
})
