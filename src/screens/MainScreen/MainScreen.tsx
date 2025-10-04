import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { useSuggestedTheme } from './MainScreen.hooks'
import { MainScreenUI } from './MainScreen.ui'

const THEME_SUGGESTIONS = [
	'React Native',
	'Design de Interação',
	'Física Quântica',
	'Filosofia',
	'Senhor dos Anéis',
	'Vendas',
	'Algoritmos',
]

export const MainScreen = () => {
	const router = useRouter()
	const [inputValue, setInputValue] = useState('')
	const suggestedTheme = useSuggestedTheme(THEME_SUGGESTIONS)

	const handleChangeInput = useCallback((value: string) => {
		setInputValue(value)
	}, [])

	const handleContinue = useCallback(() => {
		const themeToUse = inputValue.trim() || suggestedTheme
		if (!themeToUse) {
			Alert.alert(
				'Tema obrigatório',
				'Digite ou selecione um tema para continuar.',
			)
			return
		}
		router.push({
			pathname: '/new-quiz',
			params: { theme: themeToUse },
		})
	}, [inputValue, router, suggestedTheme])

	return (
		<MainScreenUI
			highlightColor="accent"
			suggestedTheme={suggestedTheme}
			inputValue={inputValue}
			onChangeInput={handleChangeInput}
			onContinue={handleContinue}
		/>
	)
}
