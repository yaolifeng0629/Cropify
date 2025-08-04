'use client';

import React, { useState } from 'react';
import { ImageFile, CropParams, OutputSettings, ProcessTask, ProcessStatus } from '@/types';
import { Button, Logo } from '@/components/ui';
import { ExportModal } from '@/components/modules';

interface HeaderProps {
    images?: ImageFile[];
    onClearImages: () => void;
    isEditMode?: boolean;
    // 批处理相关props
    cropParams?: CropParams;
    outputSettings?: OutputSettings;
    tasks?: ProcessTask[];
    isProcessing?: boolean;
    onStartBatch?: () => void;
    onPauseBatch?: () => void;
    onCancelBatch?: () => void;
    onRetryFailed?: () => void;
    // 导出相关props
    onSingleDownload?: (task: ProcessTask) => void;
    onBatchDownload?: (tasks: ProcessTask[]) => void;
    onZipDownload?: (tasks: ProcessTask[]) => void;
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
    tasks = [],
    isProcessing,
    onStartBatch,
    onPauseBatch,
    onCancelBatch,
    onRetryFailed,
    onSingleDownload,
    onBatchDownload,
    onZipDownload
}) => {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    // 计算统计信息
    const stats = {
        total: images?.length || 0,
        completed: tasks.filter(t => t.status === ProcessStatus.COMPLETED).length,
        failed: tasks.filter(t => t.status === ProcessStatus.FAILED).length,
        processing: tasks.filter(t => t.status === ProcessStatus.PROCESSING).length,
        pending: tasks.filter(t => t.status === ProcessStatus.PENDING).length,
        cancelled: tasks.filter(t => t.status === ProcessStatus.CANCELLED).length,
    };

    const hasErrors = stats.failed > 0;
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

                        <div className="text-white text-sm">
                            为爱发电 ❤️{' '}
                            <a
                                href="https://yaolifeng.com/sponsor.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white underline hover:text-blue-300 hover:underline transition-colors"
                            >
                                yaolifeng
                            </a>
                        </div>

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

                                     {/* 批处理控制按钮 */}
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

                                    {/* 处理中控制按钮 */}
                                    {isProcessing && (
                                        <>
                                            {onPauseBatch && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={onPauseBatch}
                                                    className="bg-yellow-600/90 border-yellow-500/50 text-white hover:bg-yellow-700/90 hover:border-yellow-400/60 backdrop-blur-sm transition-all duration-200"
                                                >
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                                                    </svg>
                                                    <span className="hidden sm:inline">暂停</span>
                                                </Button>
                                            )}

                                            <div className="flex items-center bg-blue-600/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                                                <div className="w-4 h-4 mr-2">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                </div>
                                                <span className="text-white text-sm font-medium">
                                                    处理中...
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {/* 停止/重置按钮 */}
                                    {/* {onCancelBatch && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={onCancelBatch}
                                            disabled={stats.total === 0}
                                            className="bg-red-600/90 border-red-500/50 text-white hover:bg-red-700/90 hover:border-red-400/60 backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            <span className="hidden sm:inline">{isProcessing ? '停止' : '重置'}</span>
                                            <span className="sm:hidden">{isProcessing ? '停止' : '重置'}</span>
                                        </Button>
                                    )} */}

                                    {/* 重试失败项目按钮 */}
                                    {hasErrors && onRetryFailed && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={onRetryFailed}
                                            className="bg-orange-600/90 border-orange-500/50 text-white hover:bg-orange-700/90 hover:border-orange-400/60 backdrop-blur-sm transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            <span className="hidden sm:inline">重试失败 ({stats.failed})</span>
                                            <span className="sm:hidden">重试</span>
                                        </Button>
                                    )}

                                    {/* 导出按钮 */}
                                    {stats.completed > 0 && onSingleDownload && onBatchDownload && onZipDownload && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsExportModalOpen(true)}
                                            className="bg-purple-600/90 border-purple-500/50 text-white hover:bg-purple-700/90 hover:border-purple-400/60 backdrop-blur-sm transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="hidden sm:inline">导出 ({stats.completed})</span>
                                            <span className="sm:hidden">导出</span>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* 导出模态框 */}
                {onSingleDownload && onBatchDownload && onZipDownload && outputSettings && (
                    <ExportModal
                        isOpen={isExportModalOpen}
                        onClose={() => setIsExportModalOpen(false)}
                        tasks={tasks}
                        outputSettings={outputSettings}
                        onSingleDownload={onSingleDownload}
                        onBatchDownload={onBatchDownload}
                        onZipDownload={onZipDownload}
                    />
                )}
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


                                {/* 批处理控制按钮 */}
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

                                {/* 处理中控制按钮 */}
                                {isProcessing && (
                                    <>
                                        {onPauseBatch && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={onPauseBatch}
                                                className="bg-yellow-600/90 border-yellow-500/50 text-white hover:bg-yellow-700/90 hover:border-yellow-400/60 backdrop-blur-sm transition-all duration-200"
                                            >
                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                                                </svg>
                                                <span className="hidden sm:inline">暂停</span>
                                            </Button>
                                        )}

                                        <div className="flex items-center bg-blue-600/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                                            <div className="w-4 h-4 mr-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            </div>
                                            <span className="text-white text-sm font-medium">
                                                处理中...
                                            </span>
                                        </div>
                                    </>
                                )}

                                {/* 停止/重置按钮 */}
                                {/* {onCancelBatch && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={onCancelBatch}
                                        disabled={stats.total === 0}
                                        className="bg-red-600/90 border-red-500/50 text-white hover:bg-red-700/90 hover:border-red-400/60 backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="hidden sm:inline">{isProcessing ? '停止' : '重置'}</span>
                                        <span className="sm:hidden">{isProcessing ? '停止' : '重置'}</span>
                                    </Button>
                                )} */}

                                {/* 重试失败项目按钮 */}
                                {hasErrors && onRetryFailed && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={onRetryFailed}
                                        className="bg-orange-600/90 border-orange-500/50 text-white hover:bg-orange-700/90 hover:border-orange-400/60 backdrop-blur-sm transition-all duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span className="hidden sm:inline">重试失败 ({stats.failed})</span>
                                        <span className="sm:hidden">重试</span>
                                    </Button>
                                )}

                                {/* 导出按钮 */}
                                {stats.completed > 0 && onSingleDownload && onBatchDownload && onZipDownload && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsExportModalOpen(true)}
                                        className="bg-purple-600/90 border-purple-500/50 text-white hover:bg-purple-700/90 hover:border-purple-400/60 backdrop-blur-sm transition-all duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="hidden sm:inline">导出 ({stats.completed})</span>
                                        <span className="sm:hidden">导出</span>
                                    </Button>
                                )}
                            </>
                        )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 导出模态框 */}
            {onSingleDownload && onBatchDownload && onZipDownload && outputSettings && (
                <ExportModal
                    isOpen={isExportModalOpen}
                    onClose={() => setIsExportModalOpen(false)}
                    tasks={tasks}
                    outputSettings={outputSettings}
                    onSingleDownload={onSingleDownload}
                    onBatchDownload={onBatchDownload}
                    onZipDownload={onZipDownload}
                />
            )}
        </header>
    );
};
