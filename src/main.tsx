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

// Add global error handler for debugging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Create a visible error message on the page
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.right = '0';
  errorDiv.style.padding = '20px';
  errorDiv.style.background = 'red';
  errorDiv.style.color = 'white';
  errorDiv.style.zIndex = '9999';
  errorDiv.textContent = `Error: ${event.error?.message || 'Unknown error'}`;
  document.body.appendChild(errorDiv);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
