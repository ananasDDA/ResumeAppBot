/// <reference types="vite/client" />

// Добавляем типы для Telegram WebApp
interface Window {
  Telegram: {
    WebApp: {
      ready(): void;
      expand(): void;
      close(): void;
      initData: string;
      initDataUnsafe: {
        user?: {
          id: number;
          first_name: string;
          last_name?: string;
          username?: string;
          language_code?: string;
        };
        start_param?: string;
      };
      colorScheme: 'light' | 'dark';
      themeParams: {
        bg_color: string;
        text_color: string;
        hint_color: string;
        link_color: string;
        button_color: string;
        button_text_color: string;
      };
      onEvent(eventType: string, eventHandler: Function): void;
      offEvent(eventType: string, eventHandler: Function): void;
      sendData(data: string): void;
      openLink(url: string): void;
      showPopup(params: object, callback: Function): void;
      showAlert(message: string, callback: Function): void;
      showConfirm(message: string, callback: Function): void;
      MainButton: {
        text: string;
        color: string;
        textColor: string;
        isVisible: boolean;
        isActive: boolean;
        isProgressVisible: boolean;
        setText(text: string): void;
        onClick(callback: Function): void;
        offClick(callback: Function): void;
        show(): void;
        hide(): void;
        enable(): void;
        disable(): void;
        showProgress(leaveActive: boolean): void;
        hideProgress(): void;
      };
      BackButton: {
        isVisible: boolean;
        onClick(callback: Function): void;
        offClick(callback: Function): void;
        show(): void;
        hide(): void;
      };
      HapticFeedback: {
        impactOccurred(style: string): void;
        notificationOccurred(type: string): void;
        selectionChanged(): void;
      };
    };
  };
}
