import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAppFonts } from '../hooks/useAppFonts'
import { ThemeProvider } from '../theme'

export default function RootLayout() {
	const { loaded, error } = useAppFonts()

	useEffect(() => {
		void SplashScreen.preventAutoHideAsync()
	}, [])

	useEffect(() => {
		if (loaded) {
			void SplashScreen.hideAsync()
		}
	}, [loaded])

	useEffect(() => {
		if (error) {
			throw error
		}
	}, [error])

	if (!loaded) {
		return null
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<ThemeProvider>
					<Stack screenOptions={{ headerShown: false }} />
				</ThemeProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)
}
