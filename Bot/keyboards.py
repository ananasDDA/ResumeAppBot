from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup

def get_main_keyboard():
    """Основная клавиатура бота"""
    keyboard = [
        ["Услуги", "Опыт работы"],
        ["Резюме", "Портфолио"]
    ]
    return ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

def get_portfolio_keyboard(url):
    """Клавиатура с кнопкой для перехода в портфолио"""
    keyboard = [
        [InlineKeyboardButton("Открыть портфолио", web_app={"url": url})]
    ]
    return InlineKeyboardMarkup(keyboard)

def get_contact_keyboard():
    """Клавиатура с контактами"""
    keyboard = [
        [InlineKeyboardButton("Telegram", url="https://t.me/ananasDDA")],
        [InlineKeyboardButton("GitHub", url="https://github.com/ananasDDA")]
    ]
    return InlineKeyboardMarkup(keyboard)