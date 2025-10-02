import { Box, Button, Card, Input, Logo, Screen, Text } from '@/components'
import { useState } from 'react'

export default function Index() {
	const [topic, setTopic] = useState('')

	return (
		<Screen paddingHorizontal="l" justifyContent="space-between">
			<Box flex={1} justifyContent="center" alignItems="center" gap="m">
				<Logo />
				<Text variant="title" textAlign="center" fontSize={20}>
					O que vamos aprender hoje?
				</Text>
				<Text variant="body" textAlign="center">
					Digite um tema e configure.
				</Text>
			</Box>
			<Card
				title="Tema do dia"
				subtitle="Você pode mudar quando quiser"
				gap="s">
				<Input
					placeholder="Que tal React Native?"
					value={topic}
					onChangeText={setTopic}
				/>
				<Button label="Começar agora" />
			</Card>
		</Screen>
	)
}
