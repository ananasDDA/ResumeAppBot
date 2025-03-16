import { useEffect, useState } from 'react'
import './App.css'
import { initTelegramWebApp, isTelegramWebApp, getTelegramUser, showBackButton, hideBackButton } from './utils/telegramWebApp'
import Card from './components/Card'
import Button from './components/Button'
declare module 'feather-icons-react';
import FeatherIcon from 'feather-icons-react'
import ThemeToggle from './components/ThemeToggle'
import ScreenshotsCarousel from './components/ScreenshotsCarousel'

// Типы для секций портфолио
type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  link?: string;
  fullDescription?: string; // Добавляем полное описание для страницы проекта
  screenshots?: (string | { src: string; caption?: string })[]; // Убираем device и landscape
};

// Добавляем тип для навигации
type AppView = 'main' | 'project-details';

type Skill = {
  name: string;
  level: number; // 1-5
};

type SkillCategory = {
  name: string;
  skills: Skill[];
};

function App() {
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'skills' | 'contact'>('about');
  const [userName, setUserName] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Добавляем состояния для навигации
  const [currentView, setCurrentView] = useState<AppView>('main');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Инициализация Telegram Web App
    if (isTelegramWebApp()) {
      initTelegramWebApp();
      const user = getTelegramUser();
      if (user) {
        setUserName(user.first_name);
      }

      // Добавляем обработчик кнопки "Назад" в Telegram
      window.Telegram.WebApp.onEvent('backButtonClicked', () => {
        setCurrentView('main');
        hideBackButton();
      });
    }

    // Проверка предпочтений темы
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.className = savedTheme === 'dark' ? 'dark-theme' : 'light-theme';
    } else {
      setIsDarkMode(prefersDark);
      document.documentElement.className = prefersDark ? 'dark-theme' : 'light-theme';
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(!isDarkMode);
    document.documentElement.className = newTheme ? 'light-theme' : 'dark-theme';
    localStorage.setItem('theme', newTheme ? 'light' : 'dark');
  };

  // Функция для открытия страницы проекта
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project-details');
    if (isTelegramWebApp()) {
      showBackButton();
    }
  };

  // Функция для возврата на главную страницу
  const goBack = () => {
    setCurrentView('main');
    if (isTelegramWebApp()) {
      hideBackButton();
    }
  };

  // Демо-данные для портфолио (замените на свои)
  const projects: Project[] = [
    {
      id: 1,
      title: 'Snowboard Booking WebApp + Bot',
      description: 'Система бронирования сноубордов через Telegram Bot',
      imageUrl: '/project1.png',
      technologies: ['Vite', 'React', 'TypeScript', 'Python'],
      link: 'https://example.com/project1',
      screenshots: [
        {
          src: '/screenshots/project1/start.jpg',
          caption: 'Стартовый экран бота'
        },
        {
          src: '/screenshots/project1/phone_number.jpg',
          caption: 'регистарация пользователя с помощью номера телефона'
        },
        {
          src: '/screenshots/project1/admin_keyboard.jpg',
          caption: 'Команды доступные администратору'
        },
        {
          src: '/screenshots/project1/user_keyboard.jpg',
          caption: 'Команды доступные пользователю'
        },
        {
          src: '/screenshots/project1/iphoneAPP.jpg',
          caption: 'Выбор модели сноуборда в веб-приложении'
        },
        {
          src: '/screenshots/project1/boardsettings.jpg',
          caption: 'Настройки сноуборда и выбор периуда аренды'
        },
        {
          src: '/screenshots/project1/calendar.jpg',
          caption: 'Выбор даты и времени аренды'
        },
        {
          src: '/screenshots/project1/successful_booking.jpg',
          caption: 'Подтверждение бронирования сноуборда с деталями и геолокацией'
        },
      ],
      fullDescription: `
        <div style="position: relative; margin-bottom: 30px; text-align: left;">
          <div style="position: relative; width: 100%; height: 300px; background-image: url('/screenshots/project1/ipadAPP.jpg'); background-size: cover; background-position: center; border-radius: 8px; opacity: 0.3;">
          </div>
          <div style="position: absolute; top: 50%; right: 30px; transform: translateY(-50%); width: 180px; height: 360px; background-color: #111; border-radius: 36px; padding: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 1px solid #333;">
            <div style="width: 100%; height: 100%; border-radius: 28px; overflow: hidden; position: relative;">
              <img src="/screenshots/project1/start.jpg" alt="Стартовый экран бота" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
        </div>

        <h3 style="text-align: left;">Концепция и назначение</h3>
        <p style="text-align: left;">Система представляет собой комплексное решение для аренды сноубордов, объединяющее в себе:</p>
        <ul style="text-align: left; padding-left: 20px;">
          <li>Telegram бот с удобным интерфейсом</li>
          <li>Веб-приложение для выбора сноуборда</li>
          <li>Интеграцию с Google Calendar для организации расписания</li>
          <li>Систему управления инвентарем для администраторов</li>
        </ul>

        <p style="text-align: left;">Проект разработан с целью автоматизировать и упростить процесс бронирования сноубордов, обеспечивая прозрачность как для клиентов, так и для администраторов.</p>

        <h3 style="text-align: left;">Преимущества решения</h3>
        <ul style="text-align: left; padding-left: 20px;">
          <li><strong>Удобство для пользователей</strong>: весь процесс бронирования проходит в привычном интерфейсе Telegram</li>
          <li><strong>Мгновенное подтверждение</strong>: система автоматически проверяет доступность сноубордов</li>
          <li><strong>Гибкость для администраторов</strong>: полный контроль над инвентарем и бронированиями</li>
          <li><strong>Автоматизация</strong>: интеграция с календарём для отслеживания занятости сноубордов</li>
          <li><strong>Масштабируемость</strong>: архитектура позволяет легко добавлять новые функции и модели сноубордов</li>
        </ul>

        <h3 style="text-align: left;">Функциональность для клиентов</h3>

        <h4 style="text-align: left; margin-top: 15px;">Бронирование сноуборда</h4>
        <ol style="text-align: left; padding-left: 20px;">
          <li><strong>Запуск бота</strong>: пользователь отправляет команду <code>/start</code></li>
          <li><strong>Предоставление контакта</strong>: пользователь делится номером телефона</li>
          <li><strong>Выбор сноуборда</strong>: открывается веб-приложение с каталогом сноубордов:
            <ul style="margin-top: 5px;">
              <li>Модели: Underdog, PIXIE, FAE, UNIT, AMF, BCFR, W_prototype</li>
              <li>Различные ростовки для каждой модели</li>
            </ul>
          </li>
          <li><strong>Выбор даты и длительности</strong>: интерактивный календарь с выбором дат</li>
          <li><strong>Подтверждение</strong>: система проверяет доступность и создает бронирование</li>
          <li><strong>Получение информации</strong>: пользователь получает подтверждение с:
            <ul style="margin-top: 5px;">
              <li>Деталями бронирования</li>
              <li>Ссылкой на событие в календаре</li>
              <li>Адресом и геолокацией для получения сноуборда</li>
            </ul>
          </li>
        </ol>

        <h4 style="text-align: left; margin-top: 15px;">Управление бронированиями</h4>
        <ol style="text-align: left; padding-left: 20px;">
          <li><strong>Просмотр активных бронирований</strong>: кнопка "Мои бронирования 📅"
            <ul style="margin-top: 5px;">
              <li>Список всех активных бронирований с деталями</li>
              <li>Интеграция с Google Calendar для актуальности данных</li>
            </ul>
          </li>
          <li><strong>Отмена бронирования</strong>:
            <ul style="margin-top: 5px;">
              <li>Под каждым бронированием кнопка "Отменить"</li>
              <li>Удаление события из календаря</li>
              <li>Подтверждение отмены</li>
            </ul>
          </li>
          <li><strong>Оставление отзывов</strong>: кнопка "Оставить отзыв 💭"
            <ul style="margin-top: 5px;">
              <li>Форма для отправки отзыва</li>
              <li>Сохранение в базе данных</li>
            </ul>
          </li>
        </ol>

        <h3 style="text-align: left;">Функциональность для администраторов</h3>

        <h4 style="text-align: left; margin-top: 15px;">Управление инвентарем</h4>
        <ol style="text-align: left; padding-left: 20px;">
          <li><strong>Доступ к инвентарю</strong>: кнопка "Управление инвентарем ⚙️"
            <ul style="margin-top: 5px;">
              <li>Доступна только пользователям из списка ADMIN_IDS</li>
              <li>Визуализация всех моделей с текущим количеством</li>
            </ul>
          </li>
          <li><strong>Изменение количества сноубордов</strong>:
            <ul style="margin-top: 5px;">
              <li>Интерактивные кнопки для каждой модели и размера</li>
              <li>Подтверждение изменений</li>
              <li>Автоматическое обновление JSON файла</li>
            </ul>
          </li>
        </ol>

        <h4 style="text-align: left; margin-top: 15px;">Аудит бронирований</h4>
        <ol style="text-align: left; padding-left: 20px;">
          <li><strong>Запуск аудита</strong>: кнопка "Аудит бронирований 🔍"
            <ul style="margin-top: 5px;">
              <li>Сканирование всех бронирований в календаре</li>
              <li>Сопоставление с текущим инвентарем</li>
            </ul>
          </li>
          <li><strong>Выявление проблем</strong>:
            <ul style="margin-top: 5px;">
              <li>Обнаружение дат с превышением количества бронирований</li>
              <li>Подробный отчет с указанием конкретных моделей и размеров</li>
              <li>Рекомендации по решению проблем</li>
            </ul>
          </li>
        </ol>

        <h4 style="text-align: left; margin-top: 15px;">Мониторинг и логирование</h4>
        <ol style="text-align: left; padding-left: 20px;">
          <li><strong>Логирование операций</strong>:
            <ul style="margin-top: 5px;">
              <li>Все действия с инвентарем фиксируются</li>
              <li>Запись в специальный лог-канал в Telegram</li>
              <li>Отслеживание кто, когда и какое действие выполнил</li>
            </ul>
          </li>
          <li><strong>Уведомления о новых бронированиях</strong>:
            <ul style="margin-top: 5px;">
              <li>Автоматическая отправка в лог-канал информации о новых бронированиях</li>
              <li>Детали пользователя, контакты, выбранный сноуборд и даты</li>
            </ul>
          </li>
        </ol>

        <h3 style="text-align: left;">Архитектура системы</h3>
        <p style="text-align: left;">Проект построен на взаимодействии трех основных компонентов:</p>
        <ul style="text-align: left; padding-left: 20px;">
          <li>Telegram клиент - интерфейс для пользователя</li>
          <li>Python бот - обработка команд и бизнес-логика</li>
          <li>React веб-приложение - интерфейс выбора сноуборда и дат</li>
        </ul>

        <div style="margin: 30px 0; text-align: center;">
          <h4 style="text-align: left; margin-bottom: 15px;">Схема потока данных</h4>
          <img src="/screenshots/project1/data_flow.jpg" alt="Схема потока данных" style="max-width: 100%; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"
        </div>
      `
    },
    {
      id: 2,
      title: 'Проект 2',
      description: 'Веб-инструмент для генерации ASCII-деревьев директорий из любой папки на вашем компьютере.',
      imageUrl: '/project2.png',
      technologies: ['Vue', 'JavaScript', 'Node.js'],
      link: 'https://example.com/project2',
      fullDescription: `
        ## Подробное описание проекта 2

        Этот веб-инструмент позволяет пользователям генерировать ASCII-представление структуры директорий,
        что особенно полезно для документации проектов и README файлов.

        ### Ключевые функции:

        - Загрузка структуры папок через drag-and-drop
        - Настраиваемые параметры отображения
        - Экспорт в различные форматы
        - Интеграция с GitHub

        ### Технический стек:

        - Vue.js для фронтенда
        - Node.js для серверной части
        - Express для API
        - WebSockets для обновления в реальном времени
      `
    },
    {
      id: 3,
      title: 'Проект 3',
      description: 'Участие в переводе документации React на русский язык, работа с опытными разработчиками.',
      imageUrl: '/project3.jpg',
      technologies: ['React', 'Documentation', 'Open Source'],
      link: 'https://example.com/project3',
      fullDescription: `
        ## Подробное описание проекта 3

        Я активно участвовал в переводе официальной документации React на русский язык,
        что помогло сделать эту технологию более доступной для русскоязычных разработчиков.

        ### Мой вклад:

        - Перевод разделов о хуках и контексте
        - Проверка и редактирование переводов других участников
        - Синхронизация с обновлениями оригинальной документации
        - Участие в обсуждениях терминологии

        ### Результаты:

        - Улучшение доступности React для русскоязычного сообщества
        - Развитие навыков технического перевода
        - Углубление понимания React и его экосистемы
        - Опыт работы в распределенной команде
      `
    }
  ];

  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 5 },
        { name: 'TypeScript', level: 4 },
        { name: 'CSS/SCSS', level: 4 }
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 3 },
        { name: 'Express', level: 3 },
        { name: 'MongoDB', level: 2 }
      ]
    },
    {
      name: 'Инструменты',
      skills: [
        { name: 'Git', level: 4 },
        { name: 'Docker', level: 3 },
        { name: 'Figma', level: 4 }
      ]
    }
  ];

  // Рендер секции "Обо мне"
  const renderAbout = () => (
    <div className="section">
      <div className="header">
        <h1>Привет, меня зовут Даня, и я <span className="highlight">Fullstack developer</span></h1>
        <p className="subtitle">Специалист по разработке Telegram-решений</p>
      </div>

      <Card className="about-card">
        <div className="about-content">
          <p>
            Я специализируюсь на создании комплексных решений для Telegram экосистемы. Мой опыт включает разработку ботов любой сложности,
            создание интерактивных Telegram WebApp и настройку серверной инфраструктуры.
          </p>
          <p>
            Мои услуги включают:
          </p>
          <ul className="services-list">
            <li>Разработка Telegram ботов любой сложности</li>
            <li>Создание логики для Telegram ботов</li>
            <li>Разработка WebApp для Telegram</li>
            <li>Разворачивание и настройка Telegram Bot API сервера для снятия ограничений</li>
            <li>Деплой ботов и приложений с последующей поддержкой</li>
            <li>Настройка reverse proxy и SSL сертификатов</li>
          </ul>
          <p>
            Я стремлюсь создавать надежные, масштабируемые и удобные решения, которые помогают бизнесу эффективно взаимодействовать с аудиторией через Telegram.
          </p>

          <div className="info-links">
            <a href="https://github.com/ananasDDA" className="info-link">
              <FeatherIcon icon="github" size={20} />
              <span>GitHub</span>
            </a>
            {/* <a href="https://linkedin.com/in/your-profile" className="info-link">
              <FeatherIcon icon="linkedin" size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:your.email@example.com" className="info-link">
              <FeatherIcon icon="mail" size={20} />
              <span>Email</span>
            </a> */}
            <a href="https://t.me/ananasDDA" className="info-link">
              <FeatherIcon icon="send" size={20} />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );

  // Компонент для отображения деталей проекта
  const renderProjectDetails = () => {
    if (!selectedProject) return null;

    return (
      <div className="project-details-container">
        <div className="project-details-header">
          <button className="back-button" onClick={goBack}>
            <FeatherIcon icon="arrow-left" size={20} />
            <span>Назад</span>
          </button>
          <h2>{selectedProject.title}</h2>
        </div>

        {selectedProject.imageUrl && (
          <div className="project-details-image-container">
            <img
              src={selectedProject.imageUrl}
              alt={selectedProject.title}
              className="project-details-image"
            />
          </div>
        )}

        <Card className="project-details-card">
          <div className="project-technologies">
            {selectedProject.technologies.map(tech => (
              <span key={tech} className="technology-tag">{tech}</span>
            ))}
          </div>

          <div className="project-details-content">
            <div
              className="project-full-description"
              dangerouslySetInnerHTML={{ __html: selectedProject.fullDescription || '' }}
            />

            {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
              <ScreenshotsCarousel screenshots={selectedProject.screenshots} />
            )}
          </div>

          {selectedProject.link && (
            <div className="project-details-actions">
              <Button type="primary" onClick={() => window.open(selectedProject.link, '_blank')}>
                <FeatherIcon icon="external-link" size={16} />
                <span>Открыть проект</span>
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  };

  // Рендер секции "Проекты" с возможностью перехода на страницу проекта
  const renderProjects = () => (
    <div className="section">
      <h2>Мои проекты</h2>
      <p className="section-description">Некоторые из моих недавних работ</p>

      <div className="projects-grid">
        {projects.map(project => (
          <Card
            key={project.id}
            className="project-card"
            onClick={() => openProjectDetails(project)}
          >
            {project.imageUrl && (
              <div className="project-image-container">
                <img src={project.imageUrl} alt={project.title} className="project-image" />
                <div className="project-image-overlay"></div>
              </div>
            )}
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map(tech => (
                  <span key={tech} className="technology-tag">{tech}</span>
                ))}
              </div>
              <Button
                type="secondary"
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // Останавливаем всплытие события
                  openProjectDetails(project); // Явно вызываем функцию открытия проекта
                }}
              >
                <span>Подробнее</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // Рендер секции "Навыки"
  const renderSkills = () => (
    <div className="section">
      <h2>Мои навыки</h2>
      <p className="section-description">Технологии и инструменты, с которыми я работаю</p>

      <div className="skills-container">
        {skillCategories.map(category => (
          <Card key={category.name} className="skills-card">
            <h3>{category.name}</h3>
            <div className="skills-list">
              {category.skills.map(skill => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-level">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`skill-level-dot ${i < skill.level ? 'active' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // Рендер секции "Контакты"
  // const renderContact = () => {
  //   return (
  //     <Card className="contact-card">
  //       <div className="contact-content">
  //         <h2>Контакты</h2>
  //         <p className="contact-intro">
  //           Я fullstack разработчик, специализирующийся на создании современных веб-приложений и мобильных решений.
  //           Если у вас есть интересный проект или предложение о сотрудничестве, буду рад обсудить детали.
  //         </p>

  //         <div className="contact-links">
  //           <a href="https://github.com/your-username" className="contact-link">
  //             <FeatherIcon icon="github" size={20} />
  //             <span>GitHub</span>
  //           </a>
  //           <a href="https://t.me/your-username" className="contact-link">
  //             <FeatherIcon icon="send" size={20} />
  //             <span>Telegram</span>
  //           </a>
  //         </div>

  //         <p className="thank-you">Спасибо за визит ッ</p>
  //       </div>
  //     </Card>
  //   );
  // };

  return (
    <div className="app-container">
      {isTelegramWebApp() && <div className="telegram-badge">Running in Telegram</div>}
      <div className="gradient-background">
        {/* Градиентный фон в стиле Geist UI */}
        <div className="gradient-circle red"></div>
        <div className="gradient-circle blue"></div>
        <div className="gradient-circle yellow"></div>
      </div>

      {currentView === 'main' ? (
        <>
          <header className="app-header">
            <div className="header-content">
              <h1 className="app-title">Моё портфолио</h1>
              {userName && <p className="welcome-text">Привет, {userName}!</p>}
              <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
            </div>
          </header>

          <main className="app-content">
            {activeTab === 'about' && renderAbout()}
            {activeTab === 'projects' && renderProjects()}
            {activeTab === 'skills' && renderSkills()}
            {/* {activeTab === 'contact' && renderContact()} */}
          </main>

          <nav className="app-navigation">
            <button
              className={`nav-button ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <FeatherIcon icon="user" size={20} />
              <span>Обо мне</span>
            </button>
            <button
              className={`nav-button ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <FeatherIcon icon="briefcase" size={20} />
              <span>Проекты</span>
            </button>
            <button
              className={`nav-button ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <FeatherIcon icon="code" size={20} />
              <span>Навыки</span>
            </button>
            {/* <button
              className={`nav-button ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              <FeatherIcon icon="mail" size={20} />
              <span>Контакты</span>
            </button> */}
          </nav>
        </>
      ) : (
        <main className="app-content">
          {renderProjectDetails()}
        </main>
      )}
    </div>
  )
}

export default App
