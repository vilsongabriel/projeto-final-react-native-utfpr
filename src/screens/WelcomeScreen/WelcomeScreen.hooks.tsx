import { keys as storageKeys } from '@/constants/storage'
import { storage } from '@/utils/storage'
import { useRouter } from 'expo-router'
import { RefObject, useCallback, useMemo, useRef, useState } from 'react'
import { Alert } from 'react-native'
import PagerView, {
	PagerViewOnPageSelectedEvent,
} from 'react-native-pager-view'

export type WelcomeSlide = {
	key: string
	title: string
	description: string
}

export type WelcomeScreenState = {
	slides: WelcomeSlide[]
	currentIndex: number
	isCompleting: boolean
	primaryLabel: string
	pagerRef: RefObject<PagerView | null>
	handlePageSelected: (event: PagerViewOnPageSelectedEvent) => void
	handlePrimaryAction: () => void
}

export const useWelcomeScreen = (
	initialSlides: WelcomeSlide[],
): WelcomeScreenState => {
	const router = useRouter()
	const pagerRef = useRef<PagerView | null>(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isCompleting, setIsCompleting] = useState(false)

	const handlePageSelected = useCallback(
		(event: PagerViewOnPageSelectedEvent) => {
			setCurrentIndex(event.nativeEvent.position)
		},
		[],
	)

	const completeWelcome = useCallback(async () => {
		setIsCompleting(true)
		try {
			await storage.setString(storageKeys.WELCOME_SCREEN_COMPLETED, 'true')
			router.replace('/(tabs)/main')
		} catch (error) {
			console.error('Failed to complete welcome flow', error)
			Alert.alert(
				'Ops! Algo deu errado',
				'Não foi possível salvar seu progresso agora. Tente novamente.',
			)
			setIsCompleting(false)
		}
	}, [router])

	const goToSlide = useCallback(
		(index: number) => {
			const pager = pagerRef.current
			if (!pager) return
			const targetIndex = Math.min(Math.max(index, 0), initialSlides.length - 1)
			if (targetIndex === currentIndex) return
			pager.setPage(targetIndex)
		},
		[currentIndex, initialSlides.length],
	)

	const handlePrimaryAction = useCallback(() => {
		const isLastSlide = currentIndex === initialSlides.length - 1
		if (isLastSlide) {
			void completeWelcome()
			return
		}
		goToSlide(currentIndex + 1)
	}, [completeWelcome, currentIndex, goToSlide, initialSlides.length])

	const primaryLabel = useMemo(
		() =>
			currentIndex === initialSlides.length - 1 ? 'Começar agora' : 'Continuar',
		[currentIndex, initialSlides.length],
	)

	return {
		slides: initialSlides,
		currentIndex,
		isCompleting,
		primaryLabel,
		pagerRef,
		handlePageSelected,
		handlePrimaryAction,
	}
}
