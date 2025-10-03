import { useAppTheme } from '@/hooks/useAppTheme'
import { Theme } from '@/theme'
import { useMemo } from 'react'
import { Text, TextProps } from './Text'

type ColorValue = keyof Theme['colors'] | string

type HighlightableTextProps = TextProps & {
	text: string
	delimiter?: string
	highlightColor?: ColorValue
}

type TextSegment = {
	content: string
	highlighted: boolean
}

const parseSegments = (text: string, delimiter: string): TextSegment[] => {
	if (!delimiter) {
		return [{ content: text, highlighted: false }]
	}

	const parts = text.split(delimiter)

	if (parts.length === 1) {
		return [{ content: text, highlighted: false }]
	}

	return parts.map((part, index) => ({
		content: part,
		highlighted: index % 2 === 1,
	}))
}

const resolveColor = (value: ColorValue, theme: Theme): string => {
	if (value in theme.colors) {
		return theme.colors[value as keyof Theme['colors']]
	}

	return value
}

export const HighlightableText = ({
	text,
	delimiter = '**',
	highlightColor = 'accent',
	style,
	...textProps
}: HighlightableTextProps) => {
	const theme = useAppTheme()
	const segments = useMemo(
		() => parseSegments(text, delimiter),
		[text, delimiter],
	)
	const highlightStyle = useMemo(
		() => ({ color: resolveColor(highlightColor, theme) }),
		[highlightColor, theme],
	)

	return (
		<Text {...textProps} style={style}>
			{segments.map((segment, index) => {
				if (!segment.highlighted) {
					return segment.content
				}

				return (
					<Text
						key={`highlight-${index}`}
						{...textProps}
						style={[style, highlightStyle]}>
						{segment.content}
					</Text>
				)
			})}
		</Text>
	)
}
