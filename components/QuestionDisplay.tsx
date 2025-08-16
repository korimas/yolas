'use client';

import React from 'react';
import { MathQuestion, QuestionType, OperationType } from '@/types';

interface QuestionDisplayProps {
  question: MathQuestion | null;
  fontSize?: string;
  isAnswered?: boolean;
  userAnswer?: string;
}



// 获取操作符号
function getOperationSymbol(operation: OperationType): string {
  switch (operation) {
    case OperationType.ADDITION:
      return '+';
    case OperationType.SUBTRACTION:
      return '-';
    case OperationType.MULTIPLICATION:
      return '×';
    case OperationType.DIVISION:
      return '÷';
    default:
      return '+';
  }
}

interface QuestionDisplayWithInputProps extends QuestionDisplayProps {
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayWithInputProps> = ({ 
  question, 
  fontSize = 'text-3xl',
  isAnswered = false,
  userAnswer = '',
  onAnswerChange,
  onSubmit,
  disabled = false
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 只允许数字和负号
    if (/^-?\d*$/.test(value)) {
      onAnswerChange(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled && userAnswer.trim() !== '') {
      onSubmit();
    }
  };

  if (!question) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-400 text-lg">
          正在加载题目...
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-3">
      {/* 题目类型标识 */}
      <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">
        {question.type === QuestionType.NUMERICAL && '数字计算'}
        {question.type === QuestionType.WORD_PROBLEM && '应用题'}
      </div>

      {/* 应用题文本 */}
      {question.type === QuestionType.WORD_PROBLEM && (
        <div className="text-lg text-gray-700 mb-3 leading-relaxed">
          {question.question}
        </div>
      )}

      {/* 算式和输入框 */}
      <div className="flex items-center justify-center space-x-3">
        <span className={`${fontSize} font-medium text-gray-800`}>
          {question.type === QuestionType.WORD_PROBLEM 
            ? `${question.operand1} ${getOperationSymbol(question.operation)} ${question.operand2} =`
            : question.question
          }
        </span>
        
        <input
          type="text"
          value={userAnswer}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          className={`
            ${fontSize}
            w-24
            text-center
            font-medium
            border-2
            border-gray-300
            rounded
            py-1
            px-2
            outline-none
            transition-colors
            ${disabled 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
              : 'bg-white text-gray-800 focus:border-gray-500'
            }
          `}
        />
        
        {/* 正确/错误标记 */}
        {isAnswered && (
          <span className={`${fontSize} font-bold`}>
            {parseInt(userAnswer) === question.correctAnswer ? (
              <span className="text-green-600">✓</span>
            ) : (
              <span className="text-red-600">✗</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
