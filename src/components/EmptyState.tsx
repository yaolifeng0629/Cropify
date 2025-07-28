'use client';

import React from 'react';
import { ImageImportManager } from '@/components/modules';
import { ImageFile, AppError } from '@/types';

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
 * 空状态组件 - 当没有图片时显示的引导界面
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
        <div className="max-w-5xl mx-auto">
            {/* 主要上传区域 */}
            <div className="mb-12">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
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
            </div>

            {/* 功能介绍卡片 */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-6 h-6 text-blue-600"
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">智能批量导入</h3>
                    <p className="text-sm text-gray-600">支持拖拽上传多种格式图片，自动识别并批量处理</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16h1m4 0h1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">精准裁剪控制</h3>
                    <p className="text-sm text-gray-600">实时预览、智能网格对齐、多种裁剪模式</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-6 h-6 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">高效批量导出</h3>
                    <p className="text-sm text-gray-600">支持多种格式输出、质量控制、批量下载</p>
                </div>
            </div>

            {/* 开始使用指引 */}
            <div className="text-center bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">开始使用 Cropify</h2>
                <p className="text-gray-600 mb-6">点击上方区域或拖拽图片开始批量裁剪</p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                        />
                    </svg>
                    <span className="font-medium">上传图片</span>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                    所有处理均在本地完成，确保您的图片数据完全私密安全
                </p>
            </div>
        </div>
    );
};
