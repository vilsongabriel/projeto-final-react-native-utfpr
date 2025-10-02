import { Icon } from '@/components'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
	const theme = useAppTheme()

	return (
		<Tabs
			initialRouteName="new"
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: theme.colors.muted,
				tabBarStyle: { backgroundColor: theme.colors.background },
			}}>
			<Tabs.Screen
				name="new"
				options={{
					title: 'Novo',
					tabBarIcon: ({ color, size }) => (
						<Icon name="add-circle-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: 'Histórico',
					tabBarIcon: ({ color, size }) => (
						<Icon name="time-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen name="welcome" options={{ href: null }} />
			<Tabs.Screen name="main" options={{ href: null }} />
			<Tabs.Screen name="new-quiz" options={{ href: null }} />
			<Tabs.Screen name="quiz" options={{ href: null }} />
			<Tabs.Screen name="quiz-result" options={{ href: null }} />
		</Tabs>
	)
}
