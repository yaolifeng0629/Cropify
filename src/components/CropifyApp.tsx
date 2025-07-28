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
    CropDemo,
    CropControlPanel,
    ViewSettings,
    AdvancedCropOptions,
    QualityControlPanel,
    BatchProcessor,
    ExportSystem,
} from '@/components/modules';
import { ExportUtils } from '@/utils';
import { ProcessTask } from '@/types';
import { Header } from './Header';
import { EmptyState } from './EmptyState';

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
    const handleSingleDownload = (task: ProcessTask) => {
        if (task.processedBlob) {
            const image = images.find(img => img.id === task.imageId);
            const filename = ExportUtils.generateFileName(task, 0, outputSettings, image?.name);
            ExportUtils.downloadFile(task.processedBlob, filename);
        }
    };

    const handleBatchDownload = async (tasks: ProcessTask[]) => {
        await ExportUtils.batchDownload(tasks, outputSettings);
    };

    const handleZipDownload = async (tasks: ProcessTask[]) => {
        await ExportUtils.downloadAsZip(tasks, outputSettings);
    };

    return (
        <div className={images && images.length > 0 ? "h-screen flex flex-col overflow-hidden" : "min-h-screen flex flex-col"}>
            <Header images={images} onClearImages={clearImages} />
            {images && images.length > 0 ? (
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 p-4 lg:p-6 overflow-hidden">
                    {/* 左侧：预览和裁剪区域 */}
                    <div className="lg:col-span-4 flex flex-col space-y-4 lg:space-y-6 overflow-hidden">
                        {/* 预览系统 - 限制高度 */}
                        <div className="h-96 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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

                        {/* 裁剪演示 */}
                        <div className="flex-shrink-0">
                            <CropDemo selectedImage={selectedImage} cropParams={cropParams} />
                        </div>
                    </div>

                    {/* 右侧：控制面板和工具栏 */}
                    <div className="lg:col-span-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto space-y-3 lg:space-y-4">
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
                        {/* <ViewSettings
                            zoom={zoom}
                            showGrid={showGrid}
                            gridType={gridType}
                            onZoomChange={setZoom}
                            onGridToggle={setShowGrid}
                            onGridTypeChange={setGridType}
                        /> */}

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
            </div>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    <div className="min-h-full flex items-center justify-center p-4 lg:p-6">
                        <EmptyState
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
            )}
        </div>
    );
};
