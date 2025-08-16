'use client';

import React, { useRef, useEffect } from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动聚焦输入框
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);


  const handleNumberPadClick = (num: string) => {
    if (disabled) return;
    
    if (num === 'clear') {
      onChange('');
    } else if (num === 'backspace') {
      onChange(value.slice(0, -1));
    } else {
      onChange(value + num);
    }
  };

  return (
    <div>
      {/* 数字键盘 */}
      <div className="max-w-sm mx-auto">
        <div className="grid grid-cols-3 gap-1 mb-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberPadClick(num.toString())}
              disabled={disabled}
              className="py-3 sm:py-2 px-3 bg-white border border-gray-300 rounded text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg sm:text-base min-h-[48px] sm:min-h-[auto]"
            >
              {num}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-1">
          {/* 清除按钮 */}
          <button
            onClick={() => handleNumberPadClick('clear')}
            disabled={disabled}
            className="py-3 sm:py-2 px-3 bg-gray-100 border border-gray-300 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm min-h-[48px] sm:min-h-[auto]"
          >
            清除
          </button>
          
          {/* 0 */}
          <button
            onClick={() => handleNumberPadClick('0')}
            disabled={disabled}
            className="py-3 sm:py-2 px-3 bg-white border border-gray-300 rounded text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg sm:text-base min-h-[48px] sm:min-h-[auto]"
          >
            0
          </button>
          
          {/* 删除按钮 */}
          <button
            onClick={() => handleNumberPadClick('backspace')}
            disabled={disabled}
            className="py-3 sm:py-2 px-3 bg-gray-100 border border-gray-300 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm min-h-[48px] sm:min-h-[auto]"
          >
            删除
          </button>
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-center mt-2">
        <button
          onClick={onSubmit}
          disabled={disabled || value.trim() === ''}
          className={`
            py-3 sm:py-2
            px-8 sm:px-6
            border border-gray-300
            text-gray-700
            rounded
            transition-colors
            text-base sm:text-sm
            min-h-[48px] sm:min-h-[auto]
          `}
        >
          提交
        </button>
      </div>
    </div>
  );
};

export default AnswerInput;
