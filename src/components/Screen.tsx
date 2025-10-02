import { useAppTheme } from '@/hooks/useAppTheme'
import { StatusBar } from 'expo-status-bar'
import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, BoxProps } from './Box'

export type ScreenProps = BoxProps & {
	children: ReactNode
	statusBarStyle?: 'auto' | 'inverted' | 'light' | 'dark'
}

export const Screen = ({
	children,
	statusBarStyle = 'dark',
	...rest
}: ScreenProps) => {
	const theme = useAppTheme()

	return (
		<SafeAreaView
			style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
			<StatusBar
				style={statusBarStyle}
				backgroundColor={theme.colors.background}
			/>
			<Box flex={1} backgroundColor="background" {...rest}>
				{children}
			</Box>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
})
