import { keys as storageKeys } from '@/constants/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

type StorageKey = (typeof storageKeys)[keyof typeof storageKeys]

const serialize = (value: unknown): string => {
	if (typeof value === 'string') {
		return value
	}

	return JSON.stringify(value)
}

const deserialize = <T>(value: string | null): T | null => {
	if (value === null) {
		return null
	}

	try {
		return JSON.parse(value) as T
	} catch (error) {
		console.warn('Failed to parse stored value, returning raw string', error)
		return value as unknown as T
	}
}

export const storage = {
	async setItem(key: StorageKey, value: unknown): Promise<void> {
		await AsyncStorage.setItem(key, serialize(value))
	},
	async getItem<T>(key: StorageKey): Promise<T | null> {
		const rawValue = await AsyncStorage.getItem(key)
		return deserialize<T>(rawValue)
	},
	async setString(key: StorageKey, value: string): Promise<void> {
		await AsyncStorage.setItem(key, value)
	},
	async getString(key: StorageKey): Promise<string | null> {
		return AsyncStorage.getItem(key)
	},
	async removeItem(key: StorageKey): Promise<void> {
		await AsyncStorage.removeItem(key)
	},
	async clear(): Promise<void> {
		await AsyncStorage.clear()
	},
}
