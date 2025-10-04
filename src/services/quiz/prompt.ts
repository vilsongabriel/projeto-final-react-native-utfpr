export type QuizPromptInput = {
	subject: string
	difficulty: string
	numberOfQuestions: number
	optionsPerQuestion: number
	language?: 'pt-BR' | 'en-US'
	ageRange?: string
	priorKnowledge?: string
}

const defaultInstructions = `Você é um assistente pedagógico especializado em criar quizzes curtos para revisão imediata.
Gere questões de múltipla escolha com foco em aprendizado ativo.
Evite respostas vagas, sempre forneça uma explicação sucinta para a alternativa correta.`

const formatInstructions = `Entregue a resposta exclusivamente em JSON válido seguindo esta estrutura:
{
  "title": string,
  "questions": [
    {
      "statement": string,
      "options": string[],
      "answerIndex": number,
      "explanation": string
    }
  ]
}`

const describeAudience = (ageRange?: string, priorKnowledge?: string) => {
	if (!ageRange && !priorKnowledge) {
		return ''
	}

	const parts = [
		ageRange ? `Faixa etária principal: ${ageRange}.` : '',
		priorKnowledge ? `Conhecimento prévio esperado: ${priorKnowledge}.` : '',
	]

	return `Informações sobre o público: ${parts.filter(Boolean).join(' ')}`.trim()
}

export const buildQuizPrompt = ({
	subject,
	difficulty,
	numberOfQuestions,
	optionsPerQuestion,
	language = 'pt-BR',
	ageRange,
	priorKnowledge,
}: QuizPromptInput) => {
	return [
		defaultInstructions,
		`Idioma alvo: ${language}.`,
		`Tema central: ${subject}.`,
		`Nível de dificuldade desejado: ${difficulty}.`,
		describeAudience(ageRange, priorKnowledge),
		`Quantidade de questões: ${numberOfQuestions}.`,
		`Alternativas por questão: ${optionsPerQuestion}.`,
		formatInstructions,
		'Caso não seja possível seguir as instruções, responda em JSON com { "error": { "message": string } }.',
	]
		.filter(Boolean)
		.join('\n\n')
}
