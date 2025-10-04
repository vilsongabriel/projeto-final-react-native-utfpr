import { NewQuizScreen } from '@/screens'
import { useLocalSearchParams, useRouter } from 'expo-router'

const normalizeThemeParam = (themeParam: string | string[] | undefined) => {
	if (Array.isArray(themeParam)) {
		return themeParam[0] ?? ''
	}
	return themeParam ?? ''
}

export default function NewQuizRoute() {
	const params = useLocalSearchParams<{ theme?: string | string[] }>()
	const router = useRouter()
	const theme = normalizeThemeParam(params.theme)

	return <NewQuizScreen theme={theme} router={router} />
}
