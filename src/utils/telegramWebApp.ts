// Утилиты для работы с Telegram Web App API

// Проверка, запущено ли приложение в Telegram
export const isTelegramWebApp = (): boolean => {
  return window.Telegram !== undefined && window.Telegram.WebApp !== undefined;
};

// Инициализация Telegram Web App
export const initTelegramWebApp = (): void => {
  if (isTelegramWebApp()) {
    // Сообщаем Telegram, что приложение готово
    window.Telegram.WebApp.ready();

    // Расширяем приложение на весь экран
    window.Telegram.WebApp.expand();

    // Не применяем цветовую схему Telegram
    // applyTelegramTheme();
  }
};

// Применение цветовой схемы Telegram (отключено)
export const applyTelegramTheme = (): void => {
  // Функция отключена
  return;

  /* Старый код
  if (!isTelegramWebApp()) return;

  const root = document.documentElement;
  const theme = window.Telegram.WebApp.themeParams;

  root.style.setProperty('--tg-bg-color', theme.bg_color);
  root.style.setProperty('--tg-text-color', theme.text_color);
  root.style.setProperty('--tg-hint-color', theme.hint_color);
  root.style.setProperty('--tg-link-color', theme.link_color);
  root.style.setProperty('--tg-button-color', theme.button_color);
  root.style.setProperty('--tg-button-text-color', theme.button_text_color);

  // Устанавливаем класс темы для body
  document.body.className = window.Telegram.WebApp.colorScheme;
  */
};

// Получение данных пользователя Telegram
export const getTelegramUser = () => {
  if (isTelegramWebApp() && window.Telegram.WebApp.initDataUnsafe.user) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
};

// Показать главную кнопку Telegram
export const showMainButton = (text: string, callback: () => void): void => {
  if (!isTelegramWebApp()) return;

  const mainButton = window.Telegram.WebApp.MainButton;
  mainButton.setText(text);
  mainButton.onClick(callback);
  mainButton.show();
};

// Скрыть главную кнопку Telegram
export const hideMainButton = (): void => {
  if (!isTelegramWebApp()) return;
  window.Telegram.WebApp.MainButton.hide();
};

// Показать кнопку "Назад" в Telegram
export const showBackButton = (): void => {
  if (!isTelegramWebApp()) return;
  window.Telegram.WebApp.BackButton.show();
};

// Скрыть кнопку "Назад" в Telegram
export const hideBackButton = (): void => {
  if (!isTelegramWebApp()) return;
  window.Telegram.WebApp.BackButton.hide();
};