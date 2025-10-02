import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { Box, BoxProps } from './Box'
import { Text } from './Text'

export type CardProps = BoxProps & {
	title?: string
	subtitle?: string
	footer?: ReactNode
	elevated?: boolean
}

export const Card = ({
	title,
	subtitle,
	children,
	footer,
	elevated = true,
	style,
	padding = 'm',
	borderRadius = 'l',
	backgroundColor = 'surface',
	...rest
}: CardProps) => {
	return (
		<Box
			padding={padding}
			borderRadius={borderRadius}
			backgroundColor={backgroundColor}
			style={[elevated ? styles.shadow : null, style]}
			{...rest}>
			{title ? <Text variant="title">{title}</Text> : null}
			{subtitle ? <Text variant="subtitle">{subtitle}</Text> : null}
			{children}
			{footer ? (
				<Box marginTop={children ? 'm' : subtitle ? 's' : 'm'}>{footer}</Box>
			) : null}
		</Box>
	)
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#000',
		shadowOpacity: 0.12,
		shadowOffset: { width: 0, height: 6 },
		shadowRadius: 12,
		elevation: 6,
	},
})
