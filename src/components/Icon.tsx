import { useAppTheme } from '@/hooks/useAppTheme'
import { Theme } from '@/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ComponentProps } from 'react'
import { Box, BoxProps } from './Box'

type ThemeColor = keyof Theme['colors']

type IoniconsColor = ComponentProps<typeof Ionicons>['color']

type IconBaseProps = Omit<ComponentProps<typeof Ionicons>, 'color'>

export type IconProps = IconBaseProps & {
	color?: IoniconsColor | ThemeColor
	containerProps?: BoxProps
}

export const Icon = ({ color, containerProps, ...iconProps }: IconProps) => {
	const theme = useAppTheme()
	const resolvedColor: IoniconsColor =
		typeof color === 'string' && color in theme.colors
			? theme.colors[color as ThemeColor]
			: color

	return (
		<Box {...containerProps}>
			<Ionicons color={resolvedColor} {...iconProps} />
		</Box>
	)
}
