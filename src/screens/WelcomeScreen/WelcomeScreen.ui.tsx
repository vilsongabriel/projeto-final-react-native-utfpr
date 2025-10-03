import { Box, Button, Logo, Screen, Text } from '@/components'
import PagerView from 'react-native-pager-view'
import { WelcomeScreenState } from './WelcomeScreen.hooks'
import { welcomeScreenStyles } from './WelcomeScreen.styles'

export type WelcomeScreenUIProps = WelcomeScreenState

export const WelcomeScreenUI = ({
	slides,
	currentIndex,
	isCompleting,
	primaryLabel,
	pagerRef,
	handlePageSelected,
	handlePrimaryAction,
}: WelcomeScreenUIProps) => {
	const totalSlides = slides.length

	return (
		<Screen flex={1} paddingHorizontal="xl" gap="xxl">
			<Logo mode="full" alignSelf="center" width={120} />
			<Box flex={1} flexGrow={1} justifyContent="center">
				<PagerView
					ref={pagerRef}
					style={welcomeScreenStyles.pager}
					initialPage={0}
					onPageSelected={handlePageSelected}>
					{slides.map(slide => (
						<Box
							key={slide.key}
							flex={1}
							alignItems="center"
							justifyContent="center"
							paddingHorizontal="xl"
							gap="l">
							<Text variant="title" textAlign="center">
								{slide.title}
							</Text>
							<Text variant="body" textAlign="center">
								{slide.description}
							</Text>
						</Box>
					))}
				</PagerView>
			</Box>
			<Box gap="l">
				<Box
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					gap="s">
					{slides.map((slide, index) => {
						const isActive = index === currentIndex
						return (
							<Box
								key={slide.key}
								width={isActive ? 24 : 8}
								height={8}
								borderRadius="full"
								backgroundColor={isActive ? 'accent' : 'muted'}
							/>
						)
					})}
				</Box>
				<Text textAlign="center" color="subtleText">
					{currentIndex + 1} de {totalSlides}
				</Text>
				<Box gap="s">
					<Button
						label={primaryLabel}
						onPress={handlePrimaryAction}
						isLoading={isCompleting}
					/>
				</Box>
			</Box>
		</Screen>
	)
}
