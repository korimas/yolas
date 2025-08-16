'use client';

import Link from "next/link";
import { AgeGroup } from "@/types";

export default function Home() {
  const ageGroups = [
    {
      group: AgeGroup.PRESCHOOL,
      title: "学前班",
      subtitle: "3-5岁",
      description: "数字认知 · 10以内加减法 · 图形计数",
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
      <header className="text-center py-8 px-4">
        <h1 className="text-4xl font-light text-gray-800 mb-3 tracking-wide">
          YOLAS
        </h1>
        <p className="text-lg text-gray-600">小朋友数学练习系统</p>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 max-w-5xl mx-auto px-4 pb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-3">选择年龄段</h2>
          <p className="text-gray-600">选择适合的难度开始练习</p>
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

        {/* 底部操作区 */}
        <div className="flex justify-center items-center gap-6">
          <Link
            href="/stats"
            className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors text-sm"
          >
            统计数据
          </Link>
          
          <div className="text-xs text-gray-400">
            适合 3-12 岁儿童使用
          </div>
        </div>
      </main>
    </div>
  );
}
