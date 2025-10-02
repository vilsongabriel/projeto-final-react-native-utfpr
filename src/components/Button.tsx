import { useAppTheme } from '@/hooks/useAppTheme'
import { Theme } from '@/theme'
import {
	SpacingProps,
	VariantProps,
	createRestyleComponent,
	createVariant,
	spacing,
} from '@shopify/restyle'
import {
	ActivityIndicator,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native'
import { Text } from './Text'

export type ButtonContainerProps = SpacingProps<Theme> &
	VariantProps<Theme, 'buttonVariants'> &
	TouchableOpacityProps

const ButtonContainer = createRestyleComponent<ButtonContainerProps, Theme>(
	[spacing, createVariant({ themeKey: 'buttonVariants' })],
	TouchableOpacity,
)

type ButtonProps = ButtonContainerProps & {
	label: string
	isLoading?: boolean
}

export const Button = ({
	label,
	variant = 'primary',
	isLoading = false,
	disabled,
	style,
	...rest
}: ButtonProps) => {
	const theme = useAppTheme()
	const isDisabled = isLoading || disabled
	const textColor =
		variant === 'secondary' ? 'buttonSecondaryText' : 'buttonText'

	return (
		<ButtonContainer
			variant={variant}
			activeOpacity={0.8}
			disabled={isDisabled}
			style={[isDisabled ? { opacity: 0.6 } : null, style]}
			{...rest}>
			{isLoading ? (
				<ActivityIndicator color={theme.colors[textColor]} />
			) : (
				<Text variant="buttonLabel" color={textColor}>
					{label}
				</Text>
			)}
		</ButtonContainer>
	)
}
