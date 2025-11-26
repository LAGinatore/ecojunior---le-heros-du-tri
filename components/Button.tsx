import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-bold rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px] transition-all duration-150 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-green-500 hover:bg-green-400 text-white shadow-green-700",
    secondary: "bg-sky-400 hover:bg-sky-300 text-white shadow-sky-600",
    accent: "bg-yellow-400 hover:bg-yellow-300 text-yellow-900 shadow-yellow-600",
    danger: "bg-red-400 hover:bg-red-300 text-white shadow-red-600",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
