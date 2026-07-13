import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  ...props 
}) => {
  
  const baseStyles = 'inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition-colors duration-200 outline-none border focus:ring-2 focus:ring-offset-2 focus:ring-primary';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantStyles = {
    primary: 'bg-primary border-primary text-secondary hover:bg-primary-hover hover:border-primary-hover',
    secondary: 'bg-secondary border-secondary text-white hover:bg-secondary-hover hover:border-secondary-hover dark:bg-white dark:text-secondary dark:hover:bg-gray-100',
    outline: 'bg-transparent border-primary text-primary hover:bg-primary hover:text-secondary',
    darkOutline: 'bg-transparent border-secondary text-secondary hover:bg-secondary hover:text-white dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
  };

  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}
      `}
      {...props}
    >
      {loading && loadingSpinner}
      {children}
    </motion.button>
  );
};

export default Button;
