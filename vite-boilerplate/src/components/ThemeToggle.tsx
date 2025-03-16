import React from 'react';
import FeatherIcon from 'feather-icons-react';
import './ThemeToggle.css';

type ThemeToggleProps = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <FeatherIcon icon={isDark ? 'sun' : 'moon'} size={16} />
    </button>
  );
};

export default ThemeToggle;