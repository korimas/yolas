'use client';

import Link from "next/link";
import { AgeGroup } from "@/types";

export default function MathSubjectPage() {
  const ageGroups = [
    {
      group: AgeGroup.PRESCHOOL,
      title: "学前班",
      subtitle: "3-5岁",
      description: "数字认知 · 10以内加减法",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      borderColor: "border-gray-200"
    },
    {
      group: AgeGroup.ELEMENTARY_LOW,
      title: "小学低年级", 
      subtitle: "6-8岁",
      description: "100以内加减法 · 乘法口诀 · 简单应用题",
      bgColor: "bg-gray-100",
      textColor: "text-gray-800", 
      borderColor: "border-gray-300"
    },
    {
      group: AgeGroup.ELEMENTARY_HIGH,
      title: "小学高年级",
      subtitle: "9-12岁", 
      description: "多位数运算 · 分数运算 · 文字应用题",
      bgColor: "bg-gray-200",
      textColor: "text-gray-800",
      borderColor: "border-gray-400"
    }
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* 头部 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            ← 返回首页
          </Link>
          <h1 className="text-lg font-medium text-gray-800">数学练习</h1>
          <div></div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🧮</div>
          <h2 className="text-2xl font-medium text-gray-800 mb-3">数学练习</h2>
          <p className="text-gray-600">选择适合的年龄段开始口算练习</p>
        </div>

        {/* 年龄组卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {ageGroups.map((ageGroup, index) => (
            <Link 
              key={ageGroup.group}
              href={`/math/${ageGroup.group}`}
              className="block group"
            >
              <div className={`
                ${ageGroup.bgColor}
                ${ageGroup.textColor}
                border-2 ${ageGroup.borderColor}
                rounded-lg
                p-6
                hover:border-gray-500
                transition-colors
                duration-200
                h-48
                flex
                flex-col
                justify-between
              `}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium">{ageGroup.title}</h3>
                    <span className="text-sm text-gray-500">{ageGroup.subtitle}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {ageGroup.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <div className="text-2xl font-light">0{index + 1}</div>
                  <div className="text-sm text-gray-500 group-hover:text-gray-700">
                    开始练习 →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 练习特色 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">练习特色</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-medium text-gray-800">快速答题</h4>
              <p className="text-sm text-gray-600">简洁界面，专注练习</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-medium text-gray-800">智能统计</h4>
              <p className="text-sm text-gray-600">实时跟踪学习进度</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-medium text-gray-800">自适应难度</h4>
              <p className="text-sm text-gray-600">根据表现调整题目</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
