import { Box, Button, Text } from '@/components'

type ThemeHeaderProps = {
	theme: string
	onEditTheme: () => void
}

export const ThemeHeader = ({ theme, onEditTheme }: ThemeHeaderProps) => {
	return (
		<Box
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			borderBottomColor={'primary'}
			borderBottomWidth={1}
			paddingBottom="s">
			<Box flexGrow={1} pr="m">
				<Text variant="subtitle" color="subtleText" fontSize={12}>
					Tema selecionado
				</Text>
				<Text
					variant="subtitle"
					textTransform="uppercase"
					numberOfLines={1}
					ellipsizeMode="tail"
					fontWeight="bold"
					fontSize={24}>
					{theme || 'Sem tema definido'}
				</Text>
			</Box>
			<Button
				variant="secondary"
				label="Alterar"
				onPress={onEditTheme}
				paddingVertical="s"
				paddingHorizontal="m"
			/>
		</Box>
	)
}
