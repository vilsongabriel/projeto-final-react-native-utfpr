import {
	ThemeProvider as ReStyleThemeProvider,
	createTheme,
} from '@shopify/restyle'
import { ReactNode } from 'react'

const palette = {
	sand: '#EEE3CE',
	cocoa: '#753D26',
	bark: '#3B2F28',
	sunset: '#F07D3A',
	black: '#000000',
	white: '#FFFFFF',
}

export const theme = createTheme({
	colors: {
		background: palette.sand,
		surface: palette.white,
		primary: palette.cocoa,
		primaryContrast: palette.sand,
		muted: palette.bark,
		text: palette.bark,
		subtleText: palette.cocoa,
		accent: palette.sunset,
		buttonText: palette.sand,
		buttonSecondaryText: palette.cocoa,
		buttonSecondaryBackground: palette.sand,
	},
	spacing: {
		none: 0,
		xs: 4,
		s: 8,
		m: 16,
		l: 24,
		xl: 32,
		xxl: 48,
	},
	breakpoints: {
		phone: 0,
		tablet: 768,
	},
	borderRadii: {
		s: 8,
		m: 16,
		l: 24,
		full: 999,
	},
	textVariants: {
		title: {
			fontFamily: 'DynaPuff_500Medium',
			fontSize: 32,
			lineHeight: 38,
			color: 'text',
		},
		subtitle: {
			fontFamily: 'DynaPuff_400Medium',
			fontSize: 20,
			lineHeight: 26,
			color: 'subtleText',
		},
		body: {
			fontFamily: 'Zain_400Regular',
			fontSize: 20,
			lineHeight: 22,
			color: 'text',
		},
		buttonLabel: {
			fontFamily: 'Zain_700Bold',
			fontSize: 22,
			lineHeight: 30,
			color: 'buttonText',
			textAlign: 'center',
		},
		logo: {
			fontFamily: 'DynaPuff_700Bold',
			fontSize: 28,
			lineHeight: 30,
			color: 'primary',
		},
		defaults: {
			fontFamily: 'Zain_400Regular',
			fontSize: 14,
			lineHeight: 20,
			color: 'text',
		},
	},
	buttonVariants: {
		primary: {
			backgroundColor: 'primary',
			borderRadius: 'm',
			paddingVertical: 'm',
			paddingHorizontal: 'xl',
		},
		secondary: {
			backgroundColor: 'buttonSecondaryBackground',
			borderRadius: 'm',
			paddingVertical: 'm',
			paddingHorizontal: 'xl',
		},
	},
})

export type Theme = typeof theme

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
	<ReStyleThemeProvider theme={theme}>{children}</ReStyleThemeProvider>
)
