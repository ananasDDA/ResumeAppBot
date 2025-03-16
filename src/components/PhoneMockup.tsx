import React from 'react';
import './PhoneMockup.css';

interface PhoneMockupProps {
  screenshotSrc: string;
  alt?: string;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ screenshotSrc, alt = 'Скриншот приложения' }) => {
  return (
    <div className="phone-mockup">
      <div className="phone-body">
        <div className="phone-screen-background"></div>
        <div className="phone-stroke-outside"></div>
        <div className="phone-screen">
          <div className="phone-screen-mask">
            <img src={screenshotSrc} alt={alt} className="phone-screenshot" />
          </div>
        </div>
      </div>
      <div className="phone-notch">
        <div className="phone-top-speaker"></div>
        <div className="phone-front-camera">
          <div className="phone-camera-lens"></div>
        </div>
      </div>
      <div className="phone-buttons">
        <div className="phone-button phone-button-power"></div>
        <div className="phone-button phone-button-volume-up"></div>
        <div className="phone-button phone-button-volume-down"></div>
        <div className="phone-button phone-button-silence"></div>
      </div>
    </div>
  );
};

export default PhoneMockup;