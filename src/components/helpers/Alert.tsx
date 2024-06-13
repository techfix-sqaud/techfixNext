// components/Alert.tsx

import React from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertStyles = {
    success: 'bg-green-100 border border-green-400 text-green-700',
    error: 'bg-red-100 border border-red-400 text-red-700',
  };

  return (
    <div className={`mb-4 px-4 py-3 rounded relative ${alertStyles[type]}`} role="alert">
      <strong className="font-bold">{type === 'success' ? 'Great!' : 'Oops!'}</strong>
      <span className="block sm:inline ml-2">{message}</span>
    </div>
  );
};

export default Alert;
