# Sobre

Este aplicativo foi desenvolvido como trabalho final da disciplina de React Native do professor **Vinicius Oliveira** para a **Pós-Graduação em Programação para Dispositivos Móveis** da **UTFPR**.

Aplicativo de quiz interativo com perguntas geradas por IA. Escolha um tema, configure a dificuldade, quantidade de questões e tempo limite para testar seus conhecimentos!

Lion é um app React Native desenvolvido com Expo que permite criar quizzes personalizados sobre qualquer tema usando a API do Google Gemini. O app oferece:

- **Quizzes personalizados** - Escolha qualquer tema para gerar perguntas
- **Configuração flexível** - Defina dificuldade (Fácil, Médio, Difícil), quantidade de questões (5, 10, 15) e tempo limite
- **Feedback visual** - Animações suaves indicam respostas corretas e incorretas
- **Explicações detalhadas** - Veja a explicação de cada resposta após responder
- **Resumo final** - Confira sua pontuação e desempenho ao final do quiz

## Como Rodar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure a API Key do Gemini

Crie um arquivo `.env.local` na raiz do projeto com sua chave da API:

```env
EXPO_PUBLIC_GEMINI_KEY=sua_chave_api_aqui
```

> **Como obter a API Key:**
>
> 1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
> 2. Faça login com sua conta Google
> 3. Clique em "Get API Key" ou "Create API Key"
> 4. Copie a chave gerada e cole no arquivo `.env.local`

### 3. Inicie o app

```bash
npm start
```

Depois escolha onde rodar:

- Pressione `a` para abrir no **Android Emulator**
- Pressione `i` para abrir no **iOS Simulator**
- Escaneie o QR Code com o app **Expo Go** no seu celular

## 🛠 Tecnologias

- **React Native** - Framework mobile
- **Expo** - Tooling e desenvolvimento
- **TypeScript** - Tipagem estática
- **Expo Router** - Navegação baseada em arquivos
- **React Native Reanimated** - Animações performáticas
- **Google Gemini API** - Geração de quizzes com IA

## 📝 Estrutura do Projeto

```
src/
├── app/              # Rotas do app (Expo Router)
├── components/       # Componentes reutilizáveis
├── screens/          # Telas principais
│   ├── WelcomeScreen/
│   ├── MainScreen/
│   ├── NewQuizScreen/
│   └── QuizScreen/
├── services/         # Integração com APIs
├── hooks/            # Custom hooks
└── theme/            # Tema e estilos
```
