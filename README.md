# ResumeAppBot - Интерактивное портфолио в Telegram Mini Apps

<p align="center">
  <img width="200" src="./src/assets/logo.png">
</p>


<!-- ## 📱 Демонстрация -->

<!-- <p align="center">
  <img width="300" src="./screenshots/demo.gif" alt="Demo Animation">
</p> -->


👉 **[Открыть в Telegram](https://t.me/the_best_resume_bot)** - Посмотрите приложение в действии

## ✨ Основные возможности

- **Адаптивный интерфейс** с автоматической настройкой под тему Telegram
- **Интерактивные карточки проектов** с подробным описанием
- **Галерея скриншотов** с поддержкой подписей и мобильного превью
- **Секции навыков** с группировкой по категориям
- **Интеграция с Telegram Web App API** для плавного пользовательского опыта
- **Автоматический деплой** через GitHub Actions

## 🛠️ Технологии

- **Frontend**: React, TypeScript, Vite
- **Стилизация**: CSS с переменными для поддержки тем
- **Иконки**: React-icons, Feather-icons
- **Telegram**: Telegram Mini Apps API (@twa-dev/sdk)
- **Деплой**: GitHub Actions, GitHub Pages

## 🚀 Установка и запуск

### Предварительные требования
- Node.js 18 или выше
- npm или yarn
- Python 3.10 или выше

### Локальная разработка

```
# Установка зависимостей
npm install

# Запуск в режиме разработки с HTTPS
npm run dev
```

Приложение будет доступно по адресу `https://localhost:5173/`

### Сборка проекта

```
npm run build
```

Собранные файлы будут помещены в директорию `docs/` для деплоя на GitHub Pages.

## 📁 Структура проекта

```
ResumeAppBot/
├── public/               # Статические файлы
│   ├── screenshots/      # Скриншоты проектов
│   └── 404.html          # Страница для обработки 404 ошибок
├── src/
│   ├── assets/           # Изображения и статические ресурсы
│   ├── components/       # React компоненты
│   │   ├── Button.tsx    # Компонент кнопок
│   │   ├── Card.tsx      # Карточка проекта
│   │   ├── ThemeToggle.tsx # Переключатель темы
│   │   └── ...
│   ├── utils/            # Утилиты и хелперы
│   │   └── telegramWebApp.ts # Интеграция с Telegram Web App API
│   ├── App.tsx           # Основной компонент приложения
│   ├── main.tsx          # Точка входа React приложения
│   └── ...
├── .github/workflows/    # GitHub Actions конфигурация
├── vite.config.ts        # Конфигурация Vite
└── package.json          # Зависимости проекта
```

## 📦 Деплой

Проект настроен на автоматический деплой на GitHub Pages при пуше в ветку `main`:

1. GitHub Action запускает сборку проекта
2. Результат сборки из директории `docs/` деплоится на GitHub Pages
3. Приложение становится доступно по адресу `https://yourusername.github.io/ResumeAppBot/`

## ⚙️ Интеграция с Telegram Bot

Для связывания с Telegram Bot:

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Настройте меню и команды бота
3. Добавьте WebApp URL через BotFather, указав URL вашего GitHub Pages

## 🙏 Благодарности

Проект создан на основе [vite-boilerplate](https://github.com/twa-dev/vite-boilerplate) от команды Telegram Mini Apps.

Дополнительные ресурсы:
- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)