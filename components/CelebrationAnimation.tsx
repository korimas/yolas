'use client';

import React, { useEffect, useState } from 'react';

const CelebrationAnimation: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-gray-900/20"></div>
      
      {/* 中央提示 */}
      <div className="bg-white border border-gray-300 rounded p-6 shadow-lg animate-pulse">
        <div className="text-center">
          <div className="text-2xl font-medium text-gray-800 mb-2">正确！</div>
          <div className="text-sm text-gray-600">继续下一题</div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationAnimation;
