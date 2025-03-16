import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Добавляем скрипт Telegram Web App API
const telegramScript = document.createElement('script');
telegramScript.src = 'https://telegram.org/js/telegram-web-app.js';
telegramScript.async = true;
document.head.appendChild(telegramScript);

// Добавляем шрифт Inter
const interFont = document.createElement('link');
interFont.rel = 'stylesheet';
interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
document.head.appendChild(interFont);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
