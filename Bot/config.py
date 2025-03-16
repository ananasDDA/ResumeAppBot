import os
from dotenv import load_dotenv

# Загружаем переменные окружения из .env файла
load_dotenv()

# Получаем токен бота из переменных окружения
BOT_TOKEN = os.getenv('BOT_TOKEN')

# URL портфолио
PORTFOLIO_URL = os.getenv('PORTFOLIO_URL')

# URL веб-приложения портфолио
PORTFOLIO_WEB_APP_URL = os.getenv('PORTFOLIO_WEB_APP_URL')

# Данные для резюме
RESUME = {
    "name": "Даня",
    "position": "Fullstack Developer",
    "specialization": "Специалист по разработке Telegram-решений",
    "experience": [
        {
            "position": "Fullstack Developer",
            "company": "Freelance",
            "period": "2021 - настоящее время",
            "description": "Разработка Telegram ботов и веб-приложений для различных клиентов."
        },
        {
            "position": "QA-инженер",
            "company": "ООО \"Avroid\"",
            "period": "12.03.2024 – настоящее время",
            "description": "Разработка и интеграция Telegram-решений для автоматизации рабочих процессов. Проведение тестирования API с использованием Postman и разработка документации. Создание и поддержка коллекции автотестов в Postman. Автоматизация тестирования на уровне API с использованием Python и библиотеки requests. Развертывание тестовых сред с использованием Docker и Aurora SDK."
        },
        {
            "position": "QA-инженер",
            "company": "ООО \"Новые Облачные Технологии\"(\"МойОфис\")",
            "period": "10.01.2023 – 11.03.2024",
            "description": "Стал самым молодым сотрудником компании. Участие в разработке тестовой документации (тест-кейсы, чек-листы, отчеты о дефектах). Создание и поддержка автоматизированных тестов для web-приложений с использованием Python и Selenium WebDriver. Проведение тестирования API с использованием Postman и разработка документации для API. Создание документации для тестирования безопасности и проведение тестирования на уровне API. Развертывание тестовых сред с использованием Docker и Kubernetes."
        },
        {
            "position": "Стажер",
            "company": "ООО \"Новые Облачные Технологии\"(\"МойОфис\")",
            "period": "1.08.2022 – 1.09.2023",
            "description": "Освоение методологий тестирования и лучших практик обеспечения качества ПО. Участие в тестировании производительности офисных приложений. Получил лучший результат на тестовом задании среди всех кандидатов."
        }
    ],
    "skills": [
        "Python", "JavaScript/TypeScript", "React", "Node.js",
        "Telegram Bot API", "Docker", "Git", "SQL"
    ],
    "services": [
        "Разработка Telegram ботов любой сложности",
        "Создание логики для Telegram ботов",
        "Разработка WebApp для Telegram",
        "Разворачивание и настройка Telegram Bot API сервера",
        "Деплой ботов и приложений с последующей поддержкой",
        "Настройка reverse proxy и SSL сертификатов"
    ],
    "contacts": {
        "telegram": "@ananasDDA",
        "github": "https://github.com/ananasDDA"
    }
}