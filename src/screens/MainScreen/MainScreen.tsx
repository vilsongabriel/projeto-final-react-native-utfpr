import { useCallback, useState } from 'react'
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
	const [inputValue, setInputValue] = useState('')
	const suggestedTheme = useSuggestedTheme(THEME_SUGGESTIONS)

	const handleChangeInput = useCallback((value: string) => {
		setInputValue(value)
	}, [])

	const handleContinue = useCallback(() => {
		console.log(inputValue)
	}, [inputValue])

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
