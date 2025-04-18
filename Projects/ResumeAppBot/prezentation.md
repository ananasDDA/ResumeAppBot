# ResumeAppBot - Интерактивное портфолио в Telegram Mini Apps

<!-- <p align="center">
  <img width="200" src="./src/assets/logo.png">
</p>
 -->

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

## 🤖 Telegram Bot

Проект включает полноценного Telegram бота, который служит интерфейсом для доступа к портфолио и обеспечивает дополнительные функции:

- **Команда /start** - Приветствие и основное меню с доступом к портфолио
- **Интерактивные кнопки** - Навигация по разделам портфолио
- **Интеграция с Mini App** - Запуск веб-приложения портфолио внутри Telegram

### Система уведомлений для администратора

Бот включает систему уведомлений для администратора, которая обеспечивает:

- Уведомление о запуске бота
```
🤖 Бот запущен!

⏰ Время запуска: 2025-03-16 23:59:57
💻 Система: Linux 5.4.0-196-generic
🖥️ Хост: host
🔄 Версия Python: 3.11.11

Бот готов к работе и ожидает сообщений от пользователей.
```

- Уведомления о новых пользователях, взаимодействующих с ботом
```
🔔 Новый пользователь запустил бота!

👤 Имя: name
🆔 ID: 1234567890
📝 Username: @username
⏰ Время: 2025-03-17 02:46:43
```

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

### Настройка бота

Для конфигурации бота используется файл .env с основными параметрами:

```
BOT_TOKEN=your_telegram_bot_token
PORTFOLIO_URL=https://yourusername.github.io/ResumeAppBot/
PORTFOLIO_WEB_APP_URL=https://yourusername.github.io/ResumeAppBot/
ADMIN_ID=your_telegram_id
```
Для запуска бота:

```
# Установка зависимостей
pip install -r requirements.txt

# Запуск бота
python Bot/main.py
```

### Локальная разработка

```
# Установка зависимостей
npm install

# Запуск в режиме разработки с HTTPS
npm run dev --host
```

Приложение будет доступно по адресу `https://localhost:5173/`

### Сборка проекта

```
npm run build
```

Собранные файлы будут помещены в директорию `docs/` для деплоя на GitHub Pages.

## 📁 Структура проекта (Frontend)

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
- [Python Telegram Bot](https://github.com/python-telegram-bot/python-telegram-bot)
- [Telegram Bot API](https://core.telegram.org/bots/api)