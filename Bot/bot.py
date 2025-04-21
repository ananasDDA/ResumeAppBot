import logging
import telebot
import os
import platform
import datetime
from config import BOT_TOKEN, RESUME, PORTFOLIO_URL, PORTFOLIO_WEB_APP_URL, ADMIN_ID

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

bot = telebot.TeleBot(BOT_TOKEN)

RESUME_PDF_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'resume_LaTeX', 'resume.pdf')

def get_main_keyboard():
    """Основная клавиатура бота"""
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    markup.row("Услуги", "Опыт работы")
    markup.row("Резюме", "Портфолио")
    return markup

def get_portfolio_keyboard():
    """Клавиатура с кнопкой для перехода в портфолио"""
    markup = telebot.types.InlineKeyboardMarkup()
    markup.add(telebot.types.InlineKeyboardButton(
        text="Открыть веб-приложение",
        url=PORTFOLIO_WEB_APP_URL
    ))
    return markup

def get_contact_keyboard():
    """Клавиатура с контактами"""
    markup = telebot.types.InlineKeyboardMarkup()
    markup.add(telebot.types.InlineKeyboardButton(
        text="Telegram",
        url="https://t.me/ananasDDA"
    ))
    markup.add(telebot.types.InlineKeyboardButton(
        text="GitHub",
        url="https://github.com/ananasDDA"
    ))
    return markup

@bot.message_handler(commands=['start'])
def start_command(message):
    """Обработчик команды /start"""
    user_name = message.from_user.first_name
    user_id = message.from_user.id
    username = message.from_user.username or "Нет username"

    if ADMIN_ID:
        try:
            current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            admin_message = (
                f"🔔 <b>Новый пользователь запустил бота!</b>\n\n"
                f"👤 <b>Имя:</b> {user_name}\n"
                f"🆔 <b>ID:</b> {user_id}\n"
                f"📝 <b>Username:</b> @{username}\n"
                f"⏰ <b>Время:</b> {current_time}"
            )

            bot.send_message(
                int(ADMIN_ID),
                admin_message,
                parse_mode="HTML"
            )
            logger.info(f"Уведомление о новом пользователе отправлено администратору (пользователь: {user_name}, ID: {user_id})")
        except Exception as e:
            logger.error(f"Не удалось отправить уведомление администратору о новом пользователе: {e}")

    greeting = (
        f"Привет, {user_name}! 👋\n\n"
        f"Я {RESUME['name']}, {RESUME['position']}.\n"
        f"{RESUME['specialization']}\n\n"
        "Выберите раздел, чтобы узнать больше:"
    )

    bot.send_message(
        message.chat.id,
        greeting,
        reply_markup=get_main_keyboard(),
        parse_mode="HTML"
    )

@bot.message_handler(content_types=['text'])
def text_message_handler(message):
    """Обработчик текстовых сообщений"""
    text = message.text

    if text == "Услуги":
        services_text = "Мои услуги:\n\n" + "\n".join([f"• {service}" for service in RESUME['services']])
        bot.send_message(message.chat.id, services_text, reply_markup=get_main_keyboard())

    elif text == "Опыт работы":
        experience_text = "Мой опыт работы:\n\n"

        for job in RESUME['experience']:
            experience_text += f"<b>📌 {job['position']}</b> в <b>{job['company']}</b>\n"
            experience_text += f"<i>⏱️ {job['period']}</i>\n\n"

            description_points = job['description'].split('. ')
            for point in description_points:
                if point.strip():  # Проверяем, что пункт не пустой
                    experience_text += f"• {point.strip()}.\n"

            experience_text += "\n"

        bot.send_message(
            message.chat.id,
            experience_text,
            parse_mode="HTML",
            reply_markup=get_main_keyboard()
        )

    elif text == "Резюме":
        bot.send_message(
            message.chat.id,
            "Отправляю вам моё резюме в формате PDF...",
            reply_markup=get_main_keyboard()
        )

        if os.path.exists(RESUME_PDF_PATH):
            with open(RESUME_PDF_PATH, 'rb') as resume_file:
                bot.send_document(
                    message.chat.id,
                    resume_file,
                    caption=f"Резюме {RESUME['name']} - {RESUME['position']}"
                )

            bot.send_message(
                message.chat.id,
                "Мои контакты:",
                reply_markup=get_contact_keyboard()
            )
        else:
            logger.error(f"PDF-файл резюме не найден по пути: {RESUME_PDF_PATH}")

            skills_text = ", ".join(RESUME['skills'])

            resume_text = (
                f"<b>{RESUME['name']} - {RESUME['position']}</b>\n"
                f"{RESUME['specialization']}\n\n"
                f"<b>Навыки:</b>\n{skills_text}\n\n"
                f"<b>Опыт работы:</b>\n"
            )

            for job in RESUME['experience']:
                resume_text += f"• <b>{job['position']}</b> в {job['company']} ({job['period']})\n"

            resume_text += "\nСвяжитесь со мной для обсуждения проектов:"

            bot.send_message(
                message.chat.id,
                resume_text,
                parse_mode="HTML",
                reply_markup=get_main_keyboard()
            )

            bot.send_message(
                message.chat.id,
                "Мои контакты:",
                reply_markup=get_contact_keyboard()
            )

    elif text == "Портфолио":
        portfolio_message = (
            "Моё интерактивное портфолио доступно по ссылке:\n"
            f"<a href='{PORTFOLIO_URL}'>Открыть портфолио</a>\n\n"
            "Или вы можете открыть веб-приложение, нажав на кнопку ниже:"
        )

        bot.send_message(
            message.chat.id,
            portfolio_message,
            parse_mode="HTML",
            disable_web_page_preview=False,
            reply_markup=get_portfolio_keyboard()
        )

    else:
        bot.send_message(
            message.chat.id,
            "Выберите одну из доступных опций на клавиатуре:",
            reply_markup=get_main_keyboard()
        )

# Запуск бота
if __name__ == '__main__':
    try:
        logger.info("Запуск бота...")

        if ADMIN_ID:
            try:
                system_info = platform.uname()
                current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                startup_message = (
                    f"🤖 <b>Бот запущен!</b>\n\n"
                    f"⏰ <b>Время запуска:</b> {current_time}\n"
                    f"💻 <b>Система:</b> {system_info.system} {system_info.release}\n"
                    f"🖥️ <b>Хост:</b> {system_info.node}\n"
                    f"🔄 <b>Версия Python:</b> {platform.python_version()}\n\n"
                    f"Бот готов к работе и ожидает сообщений от пользователей."
                )

                bot.send_message(
                    int(ADMIN_ID),
                    startup_message,
                    parse_mode="HTML"
                )
                logger.info(f"Уведомление о запуске отправлено администратору (ID: {ADMIN_ID})")
            except Exception as e:
                logger.error(f"Не удалось отправить уведомление администратору: {e}")

        bot.polling(none_stop=True)
    except Exception as e:
        logger.error(f"Критическая ошибка: {e}")