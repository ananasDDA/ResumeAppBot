import React from 'react';
import './Button.css';

export interface ButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      className={`geist-button ${type} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;