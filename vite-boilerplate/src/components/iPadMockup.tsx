import React from 'react';
import './iPadMockup.css';

interface iPadMockupProps {
  screenshotSrc: string;
  alt?: string;
  landscape?: boolean;
}

const iPadMockup: React.FC<iPadMockupProps> = ({
  screenshotSrc,
  alt = 'Скриншот приложения на iPad',
  landscape = true
}) => {
  console.log('iPad Mockup rendering with:', { screenshotSrc, landscape }); // Отладка

  return (
    <div className={`ipad-mockup ${landscape ? 'landscape' : 'portrait'}`}>
      <div className="ipad-body">
        <div className="ipad-screen-background"></div>
        <div className="ipad-stroke-outside"></div>
        <div className="ipad-screen">
          <div className="ipad-screen-mask">
            <img
              src={screenshotSrc}
              alt={alt}
              className="ipad-screenshot"
              onError={(e) => {
                console.error('Failed to load image:', screenshotSrc);
                e.currentTarget.style.backgroundColor = '#333';
                e.currentTarget.style.padding = '20px';
                e.currentTarget.style.display = 'flex';
                e.currentTarget.style.justifyContent = 'center';
                e.currentTarget.style.alignItems = 'center';
              }}
            />
          </div>
        </div>
        <div className="ipad-camera">
          <div className="ipad-camera-lens"></div>
        </div>
        <div className="ipad-buttons">
          <div className="ipad-button ipad-button-power"></div>
          <div className="ipad-button ipad-button-volume-up"></div>
          <div className="ipad-button ipad-button-volume-down"></div>
        </div>
      </div>
    </div>
  );
};

export default iPadMockup;