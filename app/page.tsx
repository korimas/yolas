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
      icon: "Calculator",
      available: true,
      route: "/subjects/math"
    },
    {
      id: "chinese",
      title: "语文练习",
      description: "拼音、识字、阅读理解",
      icon: "Book",
      available: false,
      route: "/subjects/chinese"
    },
    {
      id: "english",
      title: "英语练习", 
      description: "单词、语法、听力练习",
      icon: "Globe",
      available: false,
      route: "/subjects/english"
    },
    {
      id: "science",
      title: "科学启蒙",
      description: "自然现象、科学常识",
      icon: "Microscope",
      available: false,
      route: "/subjects/science"
    }
  ];

  // 极简线性图标组件
  const IconComponents = {
    Calculator: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v-2.25M12 2.25v15.75M9 5.25h6" />
      </svg>
    ),
    Book: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    Globe: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    Microscope: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.169.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 15.3M19.8 15.3c.132.248.253.502.37.762m-19.14 0c.117-.26.238-.514.37-.762M4.23 16.062a9.04 9.04 0 00-.993 4.929c-.015.108-.015.216 0 .324a8.997 8.997 0 009.6-10.615c.002-.052.148-3.413-.395-4.656" />
      </svg>
    )
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* 专业大气的头部区域 */}
      <header className="py-24 text-center">
        <div className="container container-xl">
          <h1 className="text-display mb-8">
            YOLAS
          </h1>
          <h2 className="text-h2 mb-6">
          儿童成长教育系统
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            为 3-12 岁儿童精心设计的智能学习平台，专注培养孩子的数学思维和学习兴趣
          </p>
        </div>
      </header>

      {/* 优雅的渐变分隔线 */}
      <div className="divider-gradient"></div>

      {/* 主要内容区域 */}
      <main className="py-24">
        <div className="container container-xl">
          {/* 学科选择介绍 */}
          <div className="text-center mb-24">
            <h2 className="text-h1 mb-6">选择学习科目</h2>
            <p className="text-body-lg max-w-3xl mx-auto">
              根据孩子的年龄和能力水平，选择最适合的学科开始学习之旅。
              我们的课程体系经过专业设计，确保循序渐进的学习体验。
            </p>
          </div>

          {/* 专业学科卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {subjects.map((subject, index) => {
              const IconComponent = IconComponents[subject.icon as keyof typeof IconComponents];
              
              return (
                <div key={subject.id} className="group">
                  {subject.available ? (
                    <Link href={subject.route} className="block">
                      <div className="card-elevated h-80 p-8 flex flex-col justify-between group-hover:scale-[1.02] transition-all duration-300">
                        <div className="flex flex-col items-center text-center">
                          <div 
                            className="w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300"
                            style={{ 
                              background: 'var(--primary-subtle)',
                              borderRadius: 'var(--radius-2xl)',
                              color: 'var(--primary)'
                            }}
                          >
                            <IconComponent />
                          </div>
                          <h3 className="text-h3 mb-4">
                            {subject.title}
                          </h3>
                          <p className="text-body-sm leading-relaxed">
                            {subject.description}
                          </p>
                        </div>
                        
                        <div className="mt-8 flex items-center justify-between">
                          <span className="text-overline">
                            立即开始
                          </span>
                          <div 
                            className="w-8 h-8 flex items-center justify-center"
                            style={{ 
                              background: 'var(--primary)',
                              borderRadius: 'var(--radius-full)',
                              color: 'var(--surface)'
                            }}
                          >
                            →
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="card h-80 p-8 flex flex-col justify-between relative opacity-60">
                      <div className="flex flex-col items-center text-center">
                        <div 
                          className="w-20 h-20 flex items-center justify-center mb-8"
                          style={{ 
                            background: 'var(--border-light)',
                            borderRadius: 'var(--radius-2xl)',
                            color: 'var(--text-quaternary)'
                          }}
                        >
                          <IconComponent />
                        </div>
                        <h3 className="text-h3 mb-4" style={{ color: 'var(--text-tertiary)' }}>
                          {subject.title}
                        </h3>
                        <p className="text-body-sm leading-relaxed" style={{ color: 'var(--text-quaternary)' }}>
                          {subject.description}
                        </p>
                      </div>
                      
                      <div className="mt-8 text-center">
                        <span className="text-overline" style={{ color: 'var(--text-quaternary)' }}>
                          即将推出
                        </span>
                      </div>
                      
                      {/* 状态指示器 */}
                      <div 
                        className="absolute top-6 right-6 w-3 h-3"
                        style={{ 
                          background: 'var(--warning)',
                          borderRadius: 'var(--radius-full)'
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 底部导航区域 */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/stats"
                className="button button-default button-lg"
              >
                📊 学习统计
              </Link>
              
              <Link
                href="/about"
                className="button button-ghost button-lg"
              >
                关于我们
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
