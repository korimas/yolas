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
      level: "基础",
      icon: "🌱"
    },
    {
      group: AgeGroup.ELEMENTARY_LOW,
      title: "小学低年级", 
      subtitle: "6-8岁",
      description: "100以内加减法 · 乘法口诀 · 简单应用题",
      level: "进阶",
      icon: "📚"
    },
    {
      group: AgeGroup.ELEMENTARY_HIGH,
      title: "小学高年级",
      subtitle: "9-12岁", 
      description: "多位数运算 · 分数运算 · 文字应用题",
      level: "高级",
      icon: "🎯"
    }
  ];

  const features = [
    {
      icon: "⚡",
      title: "快速答题",
      description: "简洁界面，专注练习"
    },
    {
      icon: "📊",
      title: "智能统计",
      description: "实时跟踪学习进度"
    },
    {
      icon: "🎯",
      title: "自适应难度",
      description: "根据表现调整题目"
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* 专业导航栏 */}
      <nav className="py-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
        <div className="container container-xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="button button-ghost"
            >
              ← 返回首页
            </Link>
            <h1 className="text-h2">数学练习</h1>
            <div className="w-20"></div> {/* 占位符保持居中 */}
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="py-24">
        <div className="container container-xl">
          {/* 页面介绍区域 */}
          <div className="text-center mb-24">
            <div 
              className="w-24 h-24 mx-auto mb-8 flex items-center justify-center text-4xl"
              style={{ 
                background: 'var(--primary-subtle)',
                borderRadius: 'var(--radius-2xl)',
                color: 'var(--primary)'
              }}
            >
              🧮
            </div>
            <h2 className="text-display mb-8">数学练习</h2>
            <p className="text-body-lg max-w-3xl mx-auto">
              根据孩子的年龄和认知发展水平，我们精心设计了三个不同难度的练习阶段。
              每个阶段都有针对性的练习内容，确保孩子能够循序渐进地提升数学能力。
            </p>
          </div>

          {/* 年龄组选择卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {ageGroups.map((ageGroup, index) => (
              <Link
                key={ageGroup.group}
                href={`/math/${ageGroup.group}`}
                className="block group"
              >
                <div className="card-elevated h-96 p-8 flex flex-col justify-between group-hover:scale-[1.02] transition-all duration-300">
                  <div className="text-center">
                    <div 
                      className="w-24 h-24 flex items-center justify-center mb-8 mx-auto text-3xl group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        background: 'var(--primary-subtle)',
                        borderRadius: 'var(--radius-2xl)',
                        color: 'var(--primary)'
                      }}
                    >
                      {ageGroup.icon}
                    </div>
                    <h3 className="text-h2 mb-4">
                      {ageGroup.title}
                    </h3>
                    <p className="text-body mb-6">
                      {ageGroup.subtitle}
                    </p>
                    <p className="text-body-sm leading-relaxed">
                      {ageGroup.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <div 
                      className="px-4 py-2 text-xs font-semibold tracking-wider"
                      style={{ 
                        background: 'var(--primary-subtle)',
                        color: 'var(--primary)',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {ageGroup.level}
                    </div>
                    <div 
                      className="text-5xl opacity-20"
                      style={{ 
                        fontWeight: 'var(--font-extralight)',
                        color: 'var(--text-quaternary)'
                      }}
                    >
                      0{index + 1}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 渐变分隔线 */}
          <div className="divider-gradient"></div>

          {/* 练习特色介绍 */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h3 className="text-h1 mb-6">练习特色</h3>
              <p className="text-body-lg max-w-2xl mx-auto">
                我们的数学练习系统采用先进的教学理念，为孩子提供个性化的学习体验
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-20 h-20 flex items-center justify-center mb-8 mx-auto text-3xl"
                    style={{ 
                      background: 'var(--primary-subtle)',
                      borderRadius: 'var(--radius-2xl)',
                      color: 'var(--primary)'
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-h3 mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-body-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 底部导航 */}
          <div className="text-center">
            <Link
              href="/"
              className="button button-primary button-lg"
            >
              返回主页
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}