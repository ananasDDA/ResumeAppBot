import React, { useState } from 'react';
import PhoneMockup from './PhoneMockup';

interface Screenshot {
  src: string;
  caption?: string;
}

interface ScreenshotsCarouselProps {
  screenshots: (string | Screenshot)[];
}

const ScreenshotsCarousel: React.FC<ScreenshotsCarouselProps> = ({ screenshots }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  // Нормализуем данные скриншотов
  const normalizedScreenshots = screenshots.map(screenshot =>
    typeof screenshot === 'string' ? { src: screenshot } : screenshot
  );

  const currentScreenshot = normalizedScreenshots[activeIndex];

  return (
    <div className="screenshots-carousel">
      <h3 className="screenshots-title">Скриншоты приложения</h3>

      <PhoneMockup
        screenshotSrc={currentScreenshot.src}
        alt={currentScreenshot.caption || 'Скриншот приложения'}
      />

      {currentScreenshot.caption && (
        <p className="screenshot-caption">{currentScreenshot.caption}</p>
      )}

      <div className="screenshots-navigation">
        {normalizedScreenshots.map((_, index) => (
          <div
            key={index}
            className={`screenshot-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScreenshotsCarousel;