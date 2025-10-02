import { useAppTheme } from '@/hooks/useAppTheme'
import { forwardRef } from 'react'
import {
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps,
} from 'react-native'
import { Box } from './Box'
import { Text } from './Text'

export type InputProps = RNTextInputProps & {
	label?: string
	helperText?: string
	errorMessage?: string
}

export const Input = forwardRef<RNTextInput, InputProps>(
	({ label, helperText, errorMessage, style, ...rest }, ref) => {
		const theme = useAppTheme()
		const feedbackMessage = errorMessage ?? helperText
		const feedbackColor = errorMessage ? 'accent' : 'subtleText'

		return (
			<Box width="100%">
				{label ? (
					<Text variant="subtitle" marginBottom="xs">
						{label}
					</Text>
				) : null}
				<RNTextInput
					ref={ref}
					placeholderTextColor={theme.colors.subtleText}
					style={[
						{
							borderWidth: 1,
							borderColor: errorMessage
								? theme.colors.accent
								: theme.colors.muted,
							borderRadius: theme.borderRadii.m,
							paddingVertical: theme.spacing.s,
							paddingHorizontal: theme.spacing.m,
							fontFamily: theme.textVariants.body.fontFamily,
							fontSize: theme.textVariants.body.fontSize,
							color: theme.colors.text,
							backgroundColor: theme.colors.surface,
						},
						style,
					]}
					{...rest}
				/>
				{feedbackMessage ? (
					<Text variant="body" marginTop="xs" color={feedbackColor}>
						{feedbackMessage}
					</Text>
				) : null}
			</Box>
		)
	},
)

Input.displayName = 'Input'
