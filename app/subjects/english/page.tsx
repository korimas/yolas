'use client';

import Link from "next/link";

export default function EnglishSubjectPage() {
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
          <h1 className="text-lg font-medium text-gray-800">英语练习</h1>
          <div></div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl mb-6 grayscale">🔤</div>
          <h2 className="text-2xl font-medium text-gray-800 mb-4">英语练习</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            英语练习模块正在紧张开发中，将包含单词学习、语法练习、听力训练等丰富内容。
          </p>
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              🚧 敬请期待，即将推出！
            </p>
          </div>
          <Link
            href="/"
            className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </main>
    </div>
  );
}
