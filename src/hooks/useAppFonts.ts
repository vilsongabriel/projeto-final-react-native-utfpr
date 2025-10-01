import {
	DynaPuff_400Regular,
	DynaPuff_500Medium,
	DynaPuff_600SemiBold,
	DynaPuff_700Bold,
} from '@expo-google-fonts/dynapuff'
import {
	Zain_200ExtraLight,
	Zain_300Light,
	Zain_400Regular,
	Zain_700Bold,
	Zain_800ExtraBold,
	Zain_900Black,
} from '@expo-google-fonts/zain'
import { useFonts } from 'expo-font'

export const useAppFonts = () => {
	const [loaded, error] = useFonts({
		DynaPuff_400Regular,
		DynaPuff_500Medium,
		DynaPuff_600SemiBold,
		DynaPuff_700Bold,
		Zain_200ExtraLight,
		Zain_300Light,
		Zain_400Regular,
		Zain_700Bold,
		Zain_800ExtraBold,
		Zain_900Black,
	})

	return { loaded, error }
}
