import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: {
      container: 'w-16 h-16',
      spinner: 'w-20 h-20 border-2',
      text: 'text-3xl w-16 h-16'
    },
    md: {
      container: 'w-20 h-20',
      spinner: 'w-24 h-24 border-4',
      text: 'text-4xl w-20 h-20'
    },
    lg: {
      container: 'w-24 h-24',
      spinner: 'w-28 h-28 border-4',
      text: 'text-5xl w-24 h-24'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`relative ${classes.container} ${className}`}>
      <div className={`absolute inset-0 ${classes.spinner} rounded-full border-primary/20 border-t-primary animate-spin -top-2 -left-2`}></div>
      <span className={`${classes.text} font-bold text-primary opacity-50 select-none flex items-center justify-center`}>
        FL
      </span>
    </div>
  );
};

export default LoadingSpinner;