# Voice AI Chat (Groq & React)

Минималистичный чат-интерфейс с поддержкой голосового ввода и ответами от ИИ в реальном времени.

### Frontend

- **React 18** (Vite) & **TypeScript**.
- **Web Speech API**: реализация голосового ввода (Speech-to-Text).
- **CSS3**: кастомный UI, адаптивная верстка, анимации (Typing Indicator).
- **Vercel**: хостинг фронтенд-части.

### Backend

- **Node.js** & **Express** (TypeScript).
- **Groq SDK**: взаимодействие с высокопроизводительными моделями (Llama 3).
- **Security**:
  - `helmet`: защита HTTP-заголовков.
  - `express-rate-limit`: защита от спама и перерасхода токенов.
- **Render.com**: деплой серверной части.

## Ссылки

- **Live Demo:** https://chat-test-khaki-chi.vercel.app

## Основные фичи

- 🎙 **Voice Input:** Распознавание речи прямо в браузере.
- ⚡ **Groq Speed:** Моментальные ответы от LLM (Llama 3).
- 📱 **Responsive:** Удобная работа на мобильных устройствах.
- 🛡️ **Reliability:** Обработка ошибок со стороны API и блокировка интерфейса при загрузке.
