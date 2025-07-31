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
 * 空状态组件 - 现代化官方网站风格的引导界面
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
            <div className="flex-1 w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center py-8">
                <div className="w-full max-w-[85%] space-y-16">
                {/* Hero Section */}
                <div className="relative overflow-hidden w-full">
                    {/* 背景装饰 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-100/20 to-transparent"></div>

                    <div className="relative w-full px-6 sm:px-8 lg:px-12 pt-16 pb-24">
                        <div className="text-center">
                            {/* 主标题 */}
                            <div className="mb-6">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                    智能图片裁剪
                                    <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                                        一键批量处理
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                                    专业的在线图片裁剪工具，支持批量处理、智能对齐、多格式导出
                                    <br />
                                    让您的图片处理工作变得简单高效
                                </p>
                            </div>

                            {/* 主要操作区域 */}
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-2">
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
                                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span>支持批量上传</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <span>本地处理更安全</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        <span>多格式导出</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 功能特性区域 */}
                <div className="relative bg-white py-16 w-full rounded-3xl shadow-lg">
                    <div className="w-full px-6 sm:px-8 lg:px-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择 Cropify</h2>
                            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                                强大的功能，简单的操作，让图片处理变得前所未有的轻松
                            </p>
                        </div>

                        {/* 功能卡片网格 */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {/* 智能批量导入 */}
                            <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl"></div>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <svg
                                            className="w-8 h-8 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">智能批量导入</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        支持拖拽上传、粘贴导入，一次处理多张图片，支持 JPG、PNG、WebP 等主流格式
                                    </p>
                                </div>
                            </div>

                            {/* 精准裁剪控制 */}
                            <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl"></div>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <svg
                                            className="w-8 h-8 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">精准裁剪控制</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        实时预览、智能网格对齐、多种裁剪模式，像素级精确控制，满足专业需求
                                    </p>
                                </div>
                            </div>

                            {/* 高效批量导出 */}
                            <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-2xl"></div>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <svg
                                            className="w-8 h-8 text-purple-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">高效批量导出</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        支持多种输出格式，自定义质量设置，一键打包下载，提升工作效率
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 开始使用区域 */}
                        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
                            <div className="max-w-5xl mx-auto">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">准备好开始了吗？</h3>
                                <p className="text-lg text-gray-600 mb-8">
                                    上传您的第一张图片，体验专业级的图片裁剪工具
                                </p>

                                {/* 操作步骤 */}
                                <div className="grid md:grid-cols-3 gap-6 mb-10">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                                            1
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">上传图片</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                                            2
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">调整裁剪</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                                            3
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">批量导出</p>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    onClick={() => {
                                        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                                        fileInput?.click();
                                    }}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                        />
                                    </svg>
                                    立即开始使用
                                </Button>

                                <p className="mt-4 text-sm text-gray-500">
                                    <span className="inline-flex items-center gap-1">
                                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
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
