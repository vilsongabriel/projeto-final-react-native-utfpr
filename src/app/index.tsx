import { Screen } from '@/components'
import { keys as storageKeys } from '@/constants/storage'
import { useAppTheme } from '@/hooks/useAppTheme'
import { storage } from '@/utils/storage'
import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

export default function Index() {
	const theme = useAppTheme()
	const [hasCheckedWelcome, setHasCheckedWelcome] = useState(false)
	const [welcomeCompleted, setWelcomeCompleted] = useState(false)

	useEffect(() => {
		const loadWelcomeState = async () => {
			try {
				const storedValue = await storage.getString(
					storageKeys.WELCOME_SCREEN_COMPLETED,
				)
				setWelcomeCompleted(storedValue === 'true')
			} catch (error) {
				console.error('Falha ao carregar estado', error)
			} finally {
				setHasCheckedWelcome(true)
			}
		}

		loadWelcomeState()
	}, [])

	if (!hasCheckedWelcome) {
		return (
			<Screen flex={1} justifyContent="center" alignItems="center" gap="m">
				<ActivityIndicator color={theme.colors.primary} />
			</Screen>
		)
	}

	return <Redirect href={welcomeCompleted ? '/(tabs)/main' : '/welcome'} />
}
