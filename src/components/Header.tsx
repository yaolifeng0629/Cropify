'use client';

import React from 'react';
import { ImageFile } from '@/types';
import { Button } from '@/components/ui';

interface HeaderProps {
    images?: ImageFile[];
    onClearImages: () => void;
}

/**
 * 应用头部组件 - 现代化设计的应用标题栏
 */
export const Header: React.FC<HeaderProps> = ({ images, onClearImages }) => {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
                <div className="flex items-center justify-between">
                    {/* 左侧：Logo 和应用名称 */}
                    <div className="flex items-center space-x-2 lg:space-x-3">
                        {/* Logo */}
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>

                        {/* 应用名称和描述 */}
                        <div>
                            <h1 className="text-lg lg:text-xl font-bold text-gray-900">Cropify</h1>
                            <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">智能图片裁剪工具</p>
                        </div>
                    </div>

                    {/* 右侧：状态信息和操作 */}
                    <div className="flex items-center space-x-2 lg:space-x-4">
                        {images && images.length > 0 && (
                            <>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <span className="inline-flex items-center px-2 lg:px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {images.length} 张图片
                                    </span>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onClearImages}
                                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 text-xs lg:text-sm"
                                >
                                    <span className="hidden sm:inline">清空全部</span>
                                    <span className="sm:hidden">清空</span>
                                </Button>
                            </>
                        )}

                        {/* 设置按钮 */}
                        <button className="p-1.5 lg:p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
