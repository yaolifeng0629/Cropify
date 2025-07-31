'use client';

import React from 'react';
import { ImageFile, CropParams, OutputSettings } from '@/types';
import { Button, Logo } from '@/components/ui';

interface HeaderProps {
    images?: ImageFile[];
    onClearImages: () => void;
    isEditMode?: boolean;
    // 批处理相关props
    cropParams?: CropParams;
    outputSettings?: OutputSettings;
    isProcessing?: boolean;
    onStartBatch?: () => void;
}

/**
 * 应用头部组件 - 现代化官方网站风格的导航栏
 */
export const Header: React.FC<HeaderProps> = ({
    images,
    onClearImages,
    isEditMode = false,
    cropParams,
    outputSettings,
    isProcessing,
    onStartBatch
}) => {
    if (isEditMode) {
        // 编辑模式下的简化头部
        return (
            <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-sm flex-shrink-0">
                <div className="px-6 py-3">
                    <div className="flex items-center justify-between">
                        {/* 左侧：Logo 和应用名称 */}
                        <Logo
                            size="sm"
                            variant="white"
                            showText={true}
                            className="flex-shrink-0"
                        />

                        {/* 右侧：状态信息和操作 */}
                        <div className="flex items-center space-x-4">
                            {images && images.length > 0 && (
                                <>
                                    {/* 图片计数器 */}
                                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                                        <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-white text-sm font-medium">
                                            {images.length} 张图片
                                        </span>
                                    </div>

                                    {/* 清空按钮 */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={onClearImages}
                                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span className="hidden sm:inline">清空全部</span>
                                        <span className="sm:hidden">清空</span>
                                    </Button>

                                     {/* 开始处理按钮 */}
                                     {onStartBatch && !isProcessing && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={onStartBatch}
                                            className="bg-green-600/90 border-green-500/50 text-white hover:bg-green-700/90 hover:border-green-400/60 backdrop-blur-sm transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8z" />
                                            </svg>
                                            <span className="hidden sm:inline">开始批处理</span>
                                            <span className="sm:hidden">处理</span>
                                        </Button>
                                    )}

                                    {/* 处理中状态 */}
                                    {isProcessing && (
                                        <div className="flex items-center bg-blue-600/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                                            <div className="w-4 h-4 mr-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            </div>
                                            <span className="text-white text-sm font-medium">
                                                处理中...
                                            </span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    // 默认模式下的完整头部（用于空状态页面）
    return (
        <header className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 shadow-lg w-full flex justify-center">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
            <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-repeat bg-[length:20px_20px]"
                     style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 0h20v20H0z'/%3E%3C/g%3E%3C/svg%3E")`
                     }}>
                </div>
            </div>

            <div className="relative w-full max-w-[85%] px-6 sm:px-8 lg:px-12 py-4">
                <div className="flex items-center justify-between">
                    {/* 左侧：Logo 和应用名称 */}
                    <Logo
                        size="md"
                        variant="white"
                        showText={true}
                        className="flex-shrink-0"
                    />

                    {/* 右侧：导航菜单、状态信息和操作 */}
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        {/* 导航菜单 (隐藏在移动端) */}
                        <nav className="hidden lg:flex items-center space-x-6">
                            <a href="/features" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                                功能特性
                            </a>
                            <a href="/user-guide" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                                使用指南
                            </a>
                            <a href="/about" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                                关于我们
                            </a>
                        </nav>

                        {/* 状态信息和操作 */}
                        <div className="flex items-center space-x-3 lg:space-x-4">
                        {images && images.length > 0 && (
                            <>
                                {/* 图片计数器 */}
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                                        <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-white text-sm font-medium">
                                            {images.length} 张图片
                                        </span>
                                    </div>
                                </div>

                                {/* 清空按钮 */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onClearImages}
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200"
                                >
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span className="hidden sm:inline">清空全部</span>
                                    <span className="sm:hidden">清空</span>
                                </Button>


                                {/* 开始处理按钮 */}
                                {onStartBatch && !isProcessing && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={onStartBatch}
                                        className="bg-green-600/90 border-green-500/50 text-white hover:bg-green-700/90 hover:border-green-400/60 backdrop-blur-sm transition-all duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8z" />
                                        </svg>
                                        <span className="hidden sm:inline">开始批处理</span>
                                        <span className="sm:hidden">处理</span>
                                    </Button>
                                )}

                                {/* 处理中状态 */}
                                {isProcessing && (
                                    <div className="flex items-center bg-blue-600/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                                        <div className="w-4 h-4 mr-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        </div>
                                        <span className="text-white text-sm font-medium">
                                            处理中...
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
