import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick 
}) => {
  const baseStyles = "px-6 py-2 rounded-md font-medium transition-colors duration-200 text-center";
  
  const variantStyles = {
    primary: "bg-[#2F6844] text-white hover:bg-[#235336]",
    secondary: "bg-[#E9F1EA] text-[#2F6844] hover:bg-[#d8e6da]",
    outline: "bg-white text-[#2F6844] border border-[#2F6844] hover:bg-[#f5f5f5]"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;