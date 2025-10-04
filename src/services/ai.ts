import { GoogleGenAI } from '@google/genai'

const gemini = new GoogleGenAI({
	apiKey: process.env.EXPO_PUBLIC_GEMINI_KEY,
})

const generateResponse = async (prompt: string): Promise<string> => {
	const response = await gemini.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: prompt,
	})

	if (!response.text) {
		throw new Error('Ocorreu um erro.')
	}

	return response.text
}

export const aiService = {
	generateResponse,
}
