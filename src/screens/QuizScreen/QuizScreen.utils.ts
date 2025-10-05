import type { QuizPromptInput } from '@/services/quiz'

export const DIFFICULTY_LABELS: Record<string, string> = {
	beginner: 'Iniciante',
	intermediate: 'Intermediário',
	advanced: 'Avançado',
	expert: 'Expert',
}

export const MAX_RETRY_ATTEMPTS = 3
export const RETRY_BASE_DELAY = 1200

export const extractSingleParam = (value: string | string[] | undefined) => {
	if (Array.isArray(value)) {
		return value[0]
	}
	return value
}

export const parseNumberParam = (
	value: string | string[] | undefined,
	fallback: number,
): number => {
	const raw = extractSingleParam(value)
	const parsed = Number(raw)
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export const parseDifficulty = (value: string | string[] | undefined) => {
	const raw = extractSingleParam(value) ?? 'beginner'
	return DIFFICULTY_LABELS[raw] ? raw : 'beginner'
}

export const formatTime = (seconds: number) => {
	if (seconds <= 0) {
		return '00:00'
	}
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60
	return `${String(minutes).padStart(2, '0')}:${String(
		remainingSeconds,
	).padStart(2, '0')}`
}

export const delay = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms))

export const buildPromptInput = (
	theme: string,
	difficulty: string,
	questionAmount: number,
): QuizPromptInput => ({
	subject: theme,
	difficulty,
	numberOfQuestions: questionAmount,
	optionsPerQuestion: 4,
	language: 'pt-BR',
})

export const extractErrorMessage = (error: unknown) => {
	if (!error) {
		return 'Não foi possível gerar o quiz. Tente novamente.'
	}
	if (error instanceof Error && error.message) {
		return error.message
	}
	if (typeof error === 'string') {
		return error
	}
	return 'Não foi possível gerar o quiz. Tente novamente.'
}
