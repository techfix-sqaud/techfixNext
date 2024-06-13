// components/ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  percentage: number | undefined;
  status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, status }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-8">
      <div
        className={`bg-green-500 h-8 rounded-full flex items-center justify-center text-white`}
        style={{ width: `${percentage}%` }}
      >
        <span className="text-sm font-medium">{status}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
