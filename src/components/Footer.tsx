'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui';

/**
 * 应用底部 —— DESIGN.md：纯黑 #000 页脚，铺满窗口宽度
 * 品牌信息 + 分组链接 + 社交入口 + 版权与法律链接
 */
export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-footer text-white">
            <div className="mx-auto w-full max-w-[1200px] px-[10px] xl:px-[5px]">
                {/* 主要内容区域 */}
                <div className="py-14 lg:py-20">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                        {/* 品牌信息 */}
                        <div className="lg:col-span-2">
                            <Link href="/" aria-label="Cropify 首页" className="inline-block">
                                <Logo size="md" variant="white" />
                            </Link>
                            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
                                专业的在线图片批量裁剪工具，支持多种格式，本地处理保护隐私。
                                让您的图片处理工作变得简单高效。
                            </p>
                            {/* 状态绿仅用于状态表达 */}
                            <div className="mt-6 flex items-center gap-2 text-sm text-white/70">
                                <span className="size-2 rounded-full bg-status"></span>
                                <span>所有处理均在本地完成，确保数据安全</span>
                            </div>
                        </div>

                        {/* 功能特性 */}
                        <div>
                            <h4 className="font-display text-sm font-medium text-white">产品</h4>
                            <ul className="mt-4 space-y-3 text-sm">
                                <li><Link href="/features" className="text-white/60 transition-colors hover:text-white">功能特性</Link></li>
                                <li><Link href="/user-guide" className="text-white/60 transition-colors hover:text-white">使用指南</Link></li>
                                <li><Link href="/about" className="text-white/60 transition-colors hover:text-white">关于我们</Link></li>
                                <li><Link href="/feedback" className="text-white/60 transition-colors hover:text-white">意见反馈</Link></li>
                            </ul>
                        </div>

                        {/* 支持与法律 */}
                        <div>
                            <h4 className="font-display text-sm font-medium text-white">支持</h4>
                            <ul className="mt-4 space-y-3 text-sm">
                                <li><Link href="/faq" className="text-white/60 transition-colors hover:text-white">常见问题</Link></li>
                                <li><Link href="/privacy" className="text-white/60 transition-colors hover:text-white">隐私政策</Link></li>
                                <li>
                                    <a
                                        href="https://github.com/yaolifeng0629/Cropify"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/60 transition-colors hover:text-white"
                                    >
                                        开源仓库
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 版权信息 */}
                <div className="border-t border-white/10">
                    <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
                        <div className="text-sm text-white/40">
                            由开源维护{' '}
                            <a
                                href="https://yaolifeng.com/sponsor.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 transition-colors hover:text-white hover:underline"
                            >
                                yaolifeng
                            </a>
                            {' '} | © {currentYear} Cropify. 保留所有权利。
                        </div>

                        <div className="flex items-center gap-5">
                            <a
                                href="https://github.com/yaolifeng0629/Cropify"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub 仓库"
                                className="text-white/40 transition-colors hover:text-white"
                            >
                                <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                            </a>

                            <a
                                href="https://yaolifeng.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="作者网站"
                                className="text-white/40 transition-colors hover:text-white"
                            >
                                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>

                            <a href="https://yaolifeng.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 transition-colors hover:text-white/60">
                                v1.0.0
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
