import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  shadow?: boolean;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({
  children,
  shadow = true,
  className = '',
  onClick,
}) => {
  return (
    <div className={`geist-card ${shadow ? 'with-shadow' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;