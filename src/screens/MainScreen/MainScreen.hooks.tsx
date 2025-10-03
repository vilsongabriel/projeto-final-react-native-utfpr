import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'

const pickRandomTheme = (themes: string[]) => {
	if (themes.length === 0) return ''
	const randomIndex = Math.floor(Math.random() * themes.length)
	return themes[randomIndex]
}

export const useSuggestedTheme = (themes: string[]) => {
	const [suggestedTheme, setSuggestedTheme] = useState(() =>
		pickRandomTheme(themes),
	)

	useFocusEffect(
		useCallback(() => {
			if (themes.length === 0) return
			setSuggestedTheme(pickRandomTheme(themes))
		}, [themes]),
	)

	return suggestedTheme
}
