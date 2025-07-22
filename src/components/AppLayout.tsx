'use client';

import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * 应用主布局组件 - 亮色主题
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Cropify
            <span className="ml-2 text-sm font-normal text-gray-500">
              专业级批量图片裁剪工具
            </span>
          </h1>
        </div>
      </header>
      
      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
      
      {/* 底部信息 */}
      <footer className="bg-gray-50 border-t border-gray-200 px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>本地处理，数据不上传服务器，保护您的隐私安全</p>
        </div>
      </footer>
    </div>
  );
};