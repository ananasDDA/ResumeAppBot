from telegram import Update, ParseMode
from telegram.ext import CallbackContext
from config import RESUME, PORTFOLIO_URL
from keyboards import get_main_keyboard, get_portfolio_keyboard, get_contact_keyboard

def start_command(update: Update, context: CallbackContext) -> None:
    """Обработчик команды /start"""
    user = update.effective_user
    message = (
        f"Привет, {user.first_name}! 👋\n\n"
        f"Я {RESUME['name']}, {RESUME['position']}.\n"
        f"{RESUME['specialization']}\n\n"
        "Вы можете также посмотреть моё портфолио, нажав на кнопку ниже."
    )

    # Отправляем приветственное сообщение с клавиатурой
    update.message.reply_text(
        message,
        reply_markup=get_main_keyboard()
    )

    # Отправляем сообщение с кнопкой для открытия портфолио
    update.message.reply_text(
        "Моё интерактивное портфолио:",
        reply_markup=get_portfolio_keyboard(PORTFOLIO_URL)
    )

def services_command(update: Update, context: CallbackContext) -> None:
    """Обработчик кнопки 'Услуги'"""
    services_text = "Мои услуги:\n\n" + "\n".join([f"• {service}" for service in RESUME['services']])
    update.message.reply_text(services_text, reply_markup=get_main_keyboard())

def experience_command(update: Update, context: CallbackContext) -> None:
    """Обработчик кнопки 'Опыт работы'"""
    experience_text = "Мой опыт работы:\n\n"

    for job in RESUME['experience']:
        experience_text += f"🔹 <b>{job['position']}</b> в {job['company']}\n"
        experience_text += f"   <i>{job['period']}</i>\n"
        experience_text += f"   {job['description']}\n\n"

    update.message.reply_text(experience_text, parse_mode=ParseMode.HTML, reply_markup=get_main_keyboard())

def resume_command(update: Update, context: CallbackContext) -> None:
    """Обработчик кнопки 'Резюме'"""
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

    update.message.reply_text(
        resume_text,
        parse_mode=ParseMode.HTML,
        reply_markup=get_main_keyboard()
    )

    # Отправляем контактные кнопки
    update.message.reply_text(
        "Мои контакты:",
        reply_markup=get_contact_keyboard()
    )

def portfolio_command(update: Update, context: CallbackContext) -> None:
    """Обработчик кнопки 'Портфолио'"""
    update.message.reply_text(
        "Моё интерактивное портфолио доступно по кнопке ниже:",
        reply_markup=get_portfolio_keyboard(PORTFOLIO_URL)
    )

def text_message_handler(update: Update, context: CallbackContext) -> None:
    """Обработчик текстовых сообщений"""
    text = update.message.text

    if text == "Услуги":
        services_command(update, context)
    elif text == "Опыт работы":
        experience_command(update, context)
    elif text == "Резюме":
        resume_command(update, context)
    elif text == "Портфолио":
        portfolio_command(update, context)
    else:
        update.message.reply_text(
            "Выберите одну из доступных опций на клавиатуре:",
            reply_markup=get_main_keyboard()
        )