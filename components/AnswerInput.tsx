'use client';

import React, { useRef, useEffect } from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  fontSize?: string;
  buttonSize?: string;
  showResult?: boolean;
  isCorrect?: boolean;
  correctAnswer?: number;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  fontSize = 'text-3xl',
  buttonSize = 'text-xl px-6 py-3',
  showResult = false,
  isCorrect = false,
  correctAnswer
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动聚焦输入框
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 只允许数字和负号
    if (/^-?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled && value.trim() !== '') {
      onSubmit();
    }
  };

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
      <div className="max-w-xs mx-auto">
        <div className="grid grid-cols-3 gap-1 mb-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberPadClick(num.toString())}
              disabled={disabled}
              className="py-2 px-3 bg-white border border-gray-300 rounded text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            className="py-2 px-3 bg-gray-100 border border-gray-300 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            清除
          </button>
          
          {/* 0 */}
          <button
            onClick={() => handleNumberPadClick('0')}
            disabled={disabled}
            className="py-2 px-3 bg-white border border-gray-300 rounded text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            0
          </button>
          
          {/* 删除按钮 */}
          <button
            onClick={() => handleNumberPadClick('backspace')}
            disabled={disabled}
            className="py-2 px-3 bg-gray-100 border border-gray-300 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
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
            py-2
            px-6
            bg-gray-800
            text-white
            rounded
            transition-colors
            ${disabled || value.trim() === ''
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-700'
            }
          `}
        >
          {showResult ? '下一题' : '提交'}
        </button>
      </div>
    </div>
  );
};

export default AnswerInput;
