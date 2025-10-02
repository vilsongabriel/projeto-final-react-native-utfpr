import { useAppTheme } from '@/hooks/useAppTheme'
import Ionicons from '@expo/vector-icons/Ionicons'
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
						<Ionicons name="add-circle-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: 'Histórico',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="time-outline" size={size} color={color} />
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
