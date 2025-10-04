import { aiService } from '@/services/ai'
import { buildQuizPrompt, QuizPromptInput } from './prompt'

export type QuizQuestion = {
	statement: string
	options: string[]
	answerIndex: number
	explanation: string
}

export type QuizPayload = {
	title: string
	questions: QuizQuestion[]
}

export class QuizGenerationError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'QuizGenerationError'
	}
}

const isStringArray = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every(item => typeof item === 'string')

const sanitizeQuestion = (question: unknown): QuizQuestion => {
	if (!question || typeof question !== 'object') {
		throw new QuizGenerationError(
			'Formato de questão inválido recebido do modelo.',
		)
	}

	const { statement, options, answerIndex, explanation } = question as Record<
		string,
		unknown
	>

	if (typeof statement !== 'string' || !statement.trim()) {
		throw new QuizGenerationError('Questão sem enunciado válido.')
	}

	if (!isStringArray(options) || options.length === 0) {
		throw new QuizGenerationError('Questão sem alternativas válidas.')
	}

	if (
		typeof answerIndex !== 'number' ||
		answerIndex < 0 ||
		answerIndex >= options.length
	) {
		throw new QuizGenerationError('Questão com resposta correta inválida.')
	}

	if (typeof explanation !== 'string' || !explanation.trim()) {
		throw new QuizGenerationError(
			'Questão sem explicação para a resposta correta.',
		)
	}

	return {
		statement: statement.trim(),
		options: options.map(option => option.trim()),
		answerIndex,
		explanation: explanation.trim(),
	}
}

const parseQuizPayload = (raw: string): QuizPayload => {
	let data: unknown

	try {
		data = JSON.parse(raw)
	} catch {
		throw new QuizGenerationError(
			'Não foi possível interpretar a resposta do modelo como JSON.',
		)
	}

	if (!data || typeof data !== 'object') {
		throw new QuizGenerationError(
			'Resposta do modelo não segue o formato esperado.',
		)
	}

	const { title, questions, error } = data as Record<string, unknown>

	if (error && typeof error === 'object') {
		const message = (error as Record<string, unknown>).message
		throw new QuizGenerationError(
			typeof message === 'string' && message.trim()
				? message.trim()
				: 'O modelo indicou que não conseguiu gerar o quiz solicitado.',
		)
	}

	if (typeof title !== 'string' || !title.trim()) {
		throw new QuizGenerationError('Quiz sem título válido.')
	}

	if (!Array.isArray(questions) || questions.length === 0) {
		throw new QuizGenerationError('Quiz sem questões válidas.')
	}

	return {
		title: title.trim(),
		questions: questions.map(sanitizeQuestion),
	}
}

export const quizService = {
	async generate(input: QuizPromptInput): Promise<QuizPayload> {
		const prompt = buildQuizPrompt(input)
		const response = await aiService.generateResponse(prompt)
		return parseQuizPayload(response)
	},
}

export type { QuizPromptInput } from './prompt'
