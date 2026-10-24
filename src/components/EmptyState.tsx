'use client';

import React from 'react';
import { ImageImportManager } from '@/components/modules';
import { ImageFile, AppError } from '@/types';
import { Button } from '@/components/ui';
import { Footer } from './Footer';

interface EmptyStateProps {
    images: ImageFile[];
    isUploading: boolean;
    errors: AppError[];
    selectedImageId: string | null;
    addImages: (files: File[]) => Promise<void>;
    removeImage: (id: string) => void;
    clearImages: () => void;
    clearErrors: () => void;
    dismissError: (id: string) => void;
    onSelectImage: (id: string) => void;
}

/**
 * 空状态组件 - DESIGN.md「The Calm Workbench」落地页
 * 导入决策优先，色彩仅表达动作 / 信息 / 注意
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
    images,
    isUploading,
    errors,
    selectedImageId,
    addImages,
    removeImage,
    clearImages,
    clearErrors,
    dismissError,
    onSelectImage,
}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 w-full bg-canvas flex justify-center py-16">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
                {/* Hero Section */}
                <div className="relative overflow-hidden w-full">
                    <div className="relative w-full px-2 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-16 sm:pb-20">
                        <div className="text-center">
                            {/* 主标题 */}
                            <div className="mb-6">
                                <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
                                    智能图片裁剪
                                    <span className="ml-2 sm:ml-4 text-brand mt-2">
                                        一键批量处理
                                    </span>
                                </h1>
                                <p className="text-xl text-ink-muted max-w-4xl mx-auto leading-relaxed">
                                    专业的在线图片裁剪工具，支持批量处理、智能对齐、多格式导出
                                    <br />
                                    让您的图片处理工作变得简单高效
                                </p>
                            </div>

                            {/* 主要操作区域 */}
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white rounded-lg border border-line overflow-hidden p-2 sm:p-3">
                                    <ImageImportManager
                                        images={images}
                                        isUploading={isUploading}
                                        errors={errors}
                                        selectedImageId={selectedImageId}
                                        addImages={addImages}
                                        removeImage={removeImage}
                                        clearImages={clearImages}
                                        clearErrors={clearErrors}
                                        dismissError={dismissError}
                                        onSelectImage={onSelectImage}
                                    />
                                </div>

                                {/* 快捷提示 */}
                                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-ink-muted">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-brand rounded-full"></div>
                                        <span>支持批量上传</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-brand rounded-full"></div>
                                        <span>本地处理更安全</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-brand rounded-full"></div>
                                        <span>多格式导出</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 功能特性区域 */}
                <div className="relative bg-white py-12 sm:py-16 w-full border-y border-line">
                    <div className="w-full px-6 sm:px-8 lg:px-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-ink mb-4">为什么选择 Cropify</h2>
                            <p className="text-lg text-ink-muted max-w-4xl mx-auto">
                                强大的功能，简单的操作，让图片处理变得前所未有的轻松
                            </p>
                        </div>

                        {/* 功能卡片网格 */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {/* 智能批量导入 */}
                            <div className="group bg-white rounded-lg p-8 border border-line hover:border-brand-bright transition-colors duration-200">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 bg-brand-tint rounded-lg flex items-center justify-center mb-6">
                                        <svg
                                            className="w-7 h-7 text-brand"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-ink mb-3">智能批量导入</h3>
                                    <p className="text-ink-muted leading-relaxed">
                                        支持拖拽上传、粘贴导入，一次处理多张图片，支持 JPG、PNG、WebP 等主流格式
                                    </p>
                                </div>
                            </div>

                            {/* 精准裁剪控制 */}
                            <div className="group bg-white rounded-lg p-8 border border-line hover:border-brand-bright transition-colors duration-200">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 bg-brand-tint rounded-lg flex items-center justify-center mb-6">
                                        <svg
                                            className="w-7 h-7 text-brand"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-ink mb-3">精准裁剪控制</h3>
                                    <p className="text-ink-muted leading-relaxed">
                                        实时预览、智能网格对齐、多种裁剪模式，像素级精确控制，满足专业需求
                                    </p>
                                </div>
                            </div>

                            {/* 高效批量导出 */}
                            <div className="group bg-white rounded-lg p-8 border border-line hover:border-brand-bright transition-colors duration-200">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 bg-brand-tint rounded-lg flex items-center justify-center mb-6">
                                        <svg
                                            className="w-7 h-7 text-brand"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-ink mb-3">高效批量导出</h3>
                                    <p className="text-ink-muted leading-relaxed">
                                        支持多种输出格式，自定义质量设置，一键打包下载，提升工作效率
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 开始使用区域 */}
                        <div className="text-center bg-surface-tint rounded-lg p-8 sm:p-12 border border-line-strong">
                            <div className="max-w-5xl mx-auto">
                                <h3 className="text-2xl font-bold text-ink mb-4">准备好开始了吗？</h3>
                                <p className="text-lg text-ink-muted mb-8">
                                    上传您的第一张图片，体验专业级的图片裁剪工具
                                </p>

                                {/* 操作步骤：教学序列使用动作 / 信息 / 铜色注意 */}
                                <div className="grid md:grid-cols-3 gap-6 mb-10">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                                            1
                                        </div>
                                        <p className="text-sm font-medium text-ink">上传图片</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-info rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                                            2
                                        </div>
                                        <p className="text-sm font-medium text-ink">调整裁剪</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-copper rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                                            3
                                        </div>
                                        <p className="text-sm font-medium text-ink">批量导出</p>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="bg-brand hover:bg-brand-hover text-white px-8 py-3 text-lg font-medium rounded-lg transition-colors duration-200"
                                    onClick={() => {
                                        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                                        fileInput?.click();
                                    }}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                        />
                                    </svg>
                                    立即开始使用
                                </Button>

                                <p className="mt-4 text-sm text-ink-muted">
                                    <span className="inline-flex items-center gap-1">
                                        <svg className="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        所有处理均在本地完成，确保您的图片数据完全私密安全
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
