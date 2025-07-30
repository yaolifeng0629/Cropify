'use client';

import React from 'react';
import { Logo } from '@/components/ui';

/**
 * 应用底部组件 - 现代化官方网站风格
 */
export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white w-full flex justify-center">
            <div className="w-full max-w-[85%]">
                {/* 主要内容区域 */}
                <div className="w-full px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* 品牌信息 */}
                        <div className="lg:col-span-2">
                            <div className="mb-4">
                                <Logo
                                    size="md"
                                    variant="default"
                                    showText={true}
                                    className="flex-shrink-0"
                                />
                            </div>
                            <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
                                专业的在线图片批量裁剪工具，支持多种格式，本地处理保护隐私。
                                让您的图片处理工作变得简单高效。
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-emerald-400">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span>所有处理均在本地完成，确保数据安全</span>
                            </div>
                        </div>

                        {/* 功能特性 */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-white">功能特性</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#batch-processing" className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                                        批量处理
                                    </a>
                                </li>
                                <li>
                                    <a href="#smart-cropping" className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                                        智能裁剪
                                    </a>
                                </li>
                                <li>
                                    <a href="#format-support" className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></span>
                                        多格式支持
                                    </a>
                                </li>
                                <li>
                                    <a href="#quality-control" className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                                        质量控制
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* 支持与帮助 */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-white">支持与帮助</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/user-guide" className="text-slate-300 hover:text-white transition-colors duration-200">
                                        使用指南
                                    </a>
                                </li>
                                <li>
                                    <a href="/faq" className="text-slate-300 hover:text-white transition-colors duration-200">
                                        常见问题
                                    </a>
                                </li>
                                <li>
                                    <a href="/feedback" className="text-slate-300 hover:text-white transition-colors duration-200">
                                        意见反馈
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy" className="text-slate-300 hover:text-white transition-colors duration-200">
                                        隐私政策
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 版权信息 */}
                <div className="border-t border-slate-700 bg-slate-900/50">
                    <div className="w-full px-6 sm:px-8 lg:px-12 py-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <div className="text-slate-400 text-sm">
                                © {currentYear} Cropify. 保留所有权利。
                            </div>

                            <div className="flex items-center space-x-6">
                                {/* 社交媒体图标 */}
                                <a href="https://github.com/yaolifeng0629/Cropify" className="text-slate-400 hover:text-white transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                </a>

                                <a href="#email" className="text-slate-400 hover:text-white transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </a>

                                <div className="text-slate-500 text-xs">
                                    v1.0.0
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
