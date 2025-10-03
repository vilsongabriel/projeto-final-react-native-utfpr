import { useWelcomeScreen, WelcomeSlide } from './WelcomeScreen.hooks'
import { WelcomeScreenUI } from './WelcomeScreen.ui'

export const slides: WelcomeSlide[] = [
	{
		key: 'intro',
		title: 'Bem-vindo ao Lion',
		description:
			'Crie questionários em segundos e transforme qualquer tema em um desafio divertido.',
	},
	{
		key: 'customization',
		title: 'Personalize o desafio',
		description:
			'Digite o tema que quiser, escolha o nível das questões, defina quantas perguntas quer responder e estabeleça (ou não) um limite de tempo.',
	},
	{
		key: 'ai-power',
		title: 'Questões geradoas por IA',
		description:
			'A inteligência artificial prepara questões únicas para cada tema, garantindo variedade e aprendizado contínuo.',
	},
	{
		key: 'results',
		title: 'Aprenda com os resultados',
		description:
			'Acompanhe seu desempenho, reveja cada questionário salvo e refaça quando quiser para medir sua evolução.',
	},
]

export const WelcomeScreen = () => {
	const welcomeScreenState = useWelcomeScreen(slides)

	return <WelcomeScreenUI {...welcomeScreenState} />
}
