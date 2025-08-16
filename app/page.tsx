'use client';

import Link from "next/link";
import { AgeGroup } from "@/types";

export default function Home() {
  // 学科分类
  const subjects = [
    {
      id: "math",
      title: "数学练习",
      description: "口算练习、应用题解答",
      icon: "🧮",
      available: true,
      route: "/subjects/math"
    },
    {
      id: "chinese",
      title: "语文练习",
      description: "拼音、识字、阅读理解",
      icon: "📚",
      available: false,
      route: "/subjects/chinese"
    },
    {
      id: "english",
      title: "英语练习", 
      description: "单词、语法、听力练习",
      icon: "🔤",
      available: false,
      route: "/subjects/english"
    },
    {
      id: "science",
      title: "科学启蒙",
      description: "自然现象、科学常识",
      icon: "🔬",
      available: false,
      route: "/subjects/science"
    }
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* 头部 */}
      <header className="text-center py-8 px-4">
        <h1 className="text-4xl font-light text-gray-800 mb-3 tracking-wide">
          YOLAS
        </h1>
        <p className="text-lg text-gray-600">小朋友成长教育系统</p>
        <p className="text-sm text-gray-500 mt-2">适合 3-12 岁儿童使用</p>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 max-w-5xl mx-auto px-4 pb-8 overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-3">选择学科</h2>
          <p className="text-sm sm:text-base text-gray-600">选择想要练习的学科开始学习</p>
        </div>

        {/* 学科卡片 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
          {subjects.map((subject, index) => (
            <div key={subject.id} className="relative">
              {subject.available ? (
                <Link 
                  href={subject.route}
                  className="block group"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-3 sm:p-6 hover:border-gray-400 transition-colors duration-200 h-32 sm:h-40 flex flex-col justify-between">
                    <div className="text-center">
                      <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">{subject.icon}</div>
                      <h3 className="text-sm sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">{subject.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed hidden sm:block">
                        {subject.description}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-700">
                        开始学习 →
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-gray-100 border-2 border-gray-200 rounded-lg p-3 sm:p-6 h-32 sm:h-40 flex flex-col justify-between opacity-60">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl mb-2 sm:mb-3 grayscale">{subject.icon}</div>
                    <h3 className="text-sm sm:text-lg font-medium text-gray-600 mb-1 sm:mb-2">{subject.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed hidden sm:block">
                      {subject.description}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-gray-400">
                      即将推出
                    </div>
                  </div>
                  
                  {/* 即将推出标签 */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-200 text-yellow-800 text-xs px-1 sm:px-2 py-1 rounded-full">
                    敬请期待
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 底部操作区 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
          <Link
            href="/stats"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors text-sm"
          >
            学习统计
          </Link>
          
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors text-sm"
          >
            关于我们
          </Link>
        </div>
      </main>
    </div>
  );
}
