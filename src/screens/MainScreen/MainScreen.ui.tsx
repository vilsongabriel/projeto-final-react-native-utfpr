import {
	Box,
	Button,
	HighlightableText,
	Input,
	Logo,
	Screen,
} from '@/components'
import { mainScreenStyles } from './MainScreen.styles'

export type MainScreenUIProps = {
	highlightColor?: string
	suggestedTheme: string
	inputValue: string
	onChangeInput: (value: string) => void
	onContinue: () => void
}

export const MainScreenUI = ({
	highlightColor,
	suggestedTheme,
	inputValue,
	onChangeInput,
	onContinue,
}: MainScreenUIProps) => {
	return (
		<Screen flex={1} paddingHorizontal="xl" paddingTop="xxl" gap="xxl">
			<Logo mode="full" alignSelf="center" width={120} />
			<Box style={mainScreenStyles.content} justifyContent="center" gap="xl">
				<HighlightableText
					text={'O que vamos **revisar** hoje?'}
					delimiter="**"
					highlightColor={highlightColor ?? 'accent'}
					variant="title"
					textAlign="center"
					fontSize={20}
				/>
				<Input
					value={inputValue}
					onChangeText={onChangeInput}
					placeholder={`Que tal "${suggestedTheme}"?`}
					accessibilityLabel="Tema do quiz"
				/>
				<Button label="Continuar" onPress={onContinue} />
			</Box>
		</Screen>
	)
}
