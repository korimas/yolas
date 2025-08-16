'use client';

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* 头部 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            ← 返回首页
          </Link>
          <h1 className="text-lg font-medium text-gray-800">关于我们</h1>
          <div></div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 overflow-y-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-3">YOLAS</h1>
          <p className="text-lg text-gray-600">儿童成长教育系统</p>
        </div>

        <div className="space-y-8">
          {/* 产品介绍 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">产品介绍</h2>
            <p className="text-gray-600 leading-relaxed">
              YOLAS 是一个专为 3-12 岁儿童设计的在线教育系统。我们致力于为小朋友提供有趣、有效的学习体验，
              通过游戏化的方式让孩子们在快乐中学习成长。系统采用现代化的扁平设计，
              特别优化了对水墨屏等电子设备的支持，确保在各种设备上都能获得良好的使用体验。
            </p>
          </div>

          {/* 功能特色 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">功能特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">🎯 年龄分级</h3>
                  <p className="text-sm text-gray-600">根据不同年龄段制定专属学习内容</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">📊 智能统计</h3>
                  <p className="text-sm text-gray-600">实时跟踪学习进度和成果</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">⚡ 简洁界面</h3>
                  <p className="text-sm text-gray-600">专注学习，减少干扰</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">🔄 自适应难度</h3>
                  <p className="text-sm text-gray-600">根据表现动态调整题目难度</p>
                </div>
              </div>
            </div>
          </div>

          {/* 学科规划 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">学科规划</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">🧮</span>
                <div>
                  <span className="font-medium text-gray-800">数学练习</span>
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">已上线</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📚</span>
                <div>
                  <span className="font-medium text-gray-800">语文练习</span>
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">开发中</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🔤</span>
                <div>
                  <span className="font-medium text-gray-800">英语练习</span>
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">开发中</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🔬</span>
                <div>
                  <span className="font-medium text-gray-800">科学启蒙</span>
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">规划中</span>
                </div>
              </div>
            </div>
          </div>

          {/* 技术栈 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">技术实现</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl mb-2">⚛️</div>
                <div className="font-medium text-gray-800">React</div>
                <div className="text-xs text-gray-600">前端框架</div>
              </div>
              <div>
                <div className="text-2xl mb-2">🎨</div>
                <div className="font-medium text-gray-800">Next.js</div>
                <div className="text-xs text-gray-600">全栈框架</div>
              </div>
              <div>
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-medium text-gray-800">TypeScript</div>
                <div className="text-xs text-gray-600">类型安全</div>
              </div>
              <div>
                <div className="text-2xl mb-2">💨</div>
                <div className="font-medium text-gray-800">Tailwind</div>
                <div className="text-xs text-gray-600">样式框架</div>
              </div>
            </div>
          </div>

          {/* 版本信息 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">版本信息</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">当前版本</span>
                <span className="font-medium">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">更新日期</span>
                <span className="font-medium">2024年12月</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">适用年龄</span>
                <span className="font-medium">3-12岁</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
