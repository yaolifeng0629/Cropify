'use client';

import React, { useEffect } from 'react';
import {
    useImageUpload,
    useAppState,
    useCropParams,
    useViewSettings,
    useOutputSettings,
    useBatchProcessor,
} from '@/hooks';
import {
    ImageImportManager,
    ImageInfoPanel,
    PreviewSystem,
    CropComparison,
    CropControlPanel,
    ViewSettings,
    AdvancedCropOptions,
    QualityControlPanel,
    BatchProcessor,
    ExportSystem,
} from '@/components/modules';
import { ExportUtils } from '@/utils';

/**
 * Cropify 主应用组件
 */
export const CropifyApp: React.FC = () => {
    const { images, isUploading, errors, addImages, removeImage, clearImages, clearErrors, dismissError } =
        useImageUpload();

    const { selectedImageId, selectedImage, batchSummary, processTasks, selectImage, updateProcessTasks } =
        useAppState(images);

    const { cropParams, setCropParams, updateCropParams, resetCropParams, applyCropAnchor, applyPresetSize } =
        useCropParams(selectedImage);

    const { zoom, showGrid, gridType, setZoom, setShowGrid, setGridType, resetView } = useViewSettings();

    const { outputSettings, setOutputSettings, updateOutputSettings, resetOutputSettings } = useOutputSettings();

    const {
        tasks: batchTasks,
        isProcessing,
        startBatch,
        pauseBatch,
        cancelBatch,
        retryFailed,
    } = useBatchProcessor(error => dismissError(error.id));

    // 当选中图片变化时，重置裁剪参数
    useEffect(() => {
        resetCropParams(selectedImage);
    }, [selectedImage, resetCropParams]);

    // 导出处理函数
    const handleSingleDownload = (task: any) => {
        if (task.processedBlob) {
            const image = images.find(img => img.id === task.imageId);
            const filename = ExportUtils.generateFileName(task, 0, outputSettings, image?.name);
            ExportUtils.downloadFile(task.processedBlob, filename);
        }
    };

    const handleBatchDownload = async (tasks: any[]) => {
        await ExportUtils.batchDownload(tasks, outputSettings);
    };

    const handleZipDownload = async (tasks: any[]) => {
        await ExportUtils.downloadAsZip(tasks, outputSettings);
    };

    return (
        <div className="min-h-screen ">
            {/* 顶部导航栏 */}
            {images.length > 0 && (
                <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">已导入 {images.length} 张图片</span>
                            <button
                                onClick={clearImages}
                                className="text-sm text-red-600 hover:text-red-800 transition-colors"
                            >
                                清空
                            </button>
                        </div>
                    </div>
                </header>
            )}

            {/* 主内容区域 */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {images.length > 0 ? (
                    <div className="grid grid-cols-12 gap-6">
                        {/* 左侧：预览和裁剪区域 */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            {/* 预览系统 */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <PreviewSystem
                                    selectedImage={selectedImage}
                                    cropParams={cropParams}
                                    onCropChange={setCropParams}
                                    zoom={zoom}
                                    showGrid={showGrid}
                                    gridType={gridType}
                                    onZoomChange={setZoom}
                                />
                            </div>

                            {/* 裁剪对比 */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <CropComparison selectedImage={selectedImage} cropParams={cropParams} />
                            </div>
                        </div>

                        {/* 右侧：控制面板和工具栏 */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            {/* 图片列表和导入管理 */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">图片管理</h2>
                                </div>
                                <div className="p-4">
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
                                        onSelectImage={selectImage}
                                    />
                                </div>
                            </div>

                            {/* 图片信息面板 */}
                            <ImageInfoPanel selectedImage={selectedImage} batchSummary={batchSummary} />

                            {/* 裁剪控制面板 */}
                            <CropControlPanel
                                selectedImage={selectedImage}
                                cropParams={cropParams}
                                onCropChange={setCropParams}
                                onApplyCropAnchor={applyCropAnchor}
                                onApplyPresetSize={applyPresetSize}
                                onReset={resetCropParams}
                            />

                            {/* 高级裁剪选项 */}
                            <AdvancedCropOptions cropParams={cropParams} onCropChange={setCropParams} />

                            {/* 视图设置 */}
                            <ViewSettings
                                zoom={zoom}
                                showGrid={showGrid}
                                gridType={gridType}
                                onZoomChange={setZoom}
                                onGridToggle={setShowGrid}
                                onGridTypeChange={setGridType}
                            />

                            {/* 质量控制 */}
                            <QualityControlPanel outputSettings={outputSettings} onSettingsChange={setOutputSettings} />

                            {/* 批处理和导出 */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">批量处理与导出</h2>
                                </div>
                                <div className="p-4 space-y-4">
                                    <BatchProcessor
                                        images={images}
                                        cropParams={cropParams}
                                        outputSettings={outputSettings}
                                        tasks={batchTasks}
                                        isProcessing={isProcessing}
                                        onStartBatch={() => startBatch(images, cropParams, outputSettings)}
                                        onPauseBatch={pauseBatch}
                                        onCancelBatch={cancelBatch}
                                        onRetryFailed={() => retryFailed(images, cropParams, outputSettings)}
                                    />

                                    <ExportSystem
                                        tasks={batchTasks}
                                        outputSettings={outputSettings}
                                        onSingleDownload={handleSingleDownload}
                                        onBatchDownload={handleBatchDownload}
                                        onZipDownload={handleZipDownload}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // 空状态：优雅的引导界面
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
                                    onSelectImage={selectImage}
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
                )}
            </main>
        </div>
    );
};
