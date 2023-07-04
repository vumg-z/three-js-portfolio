import React from 'react';

interface CardProps {
  subtitle: string;
  title: string;
  footer: string;
  subtitleStyle?: string;
  titleStyle?: string;
  footerStyle?: string;
}

const Card: React.FC<CardProps> = ({ 
  subtitle, 
  title, 
  footer, 
  subtitleStyle = '', 
  titleStyle = '', 
  footerStyle = '' 
}) => {
  return (
    <div className="bg-black text-white border border-gray-300 rounded-lg p-5 m-5">
      <div className="flex justify-between">
        <p className={`mb-4 ml-2 ${subtitleStyle}`}>{subtitle}</p>
        <h2 className={`font-bold mb-4 text-lg ${titleStyle} font-title`}>{title}</h2>
        {/* Add 'font-title' class to apply font */}
      </div>
      <div className={`text-right mt-4 ${footerStyle}`}>
        {footer}
      </div>
    </div>
  );
};

export default Card;