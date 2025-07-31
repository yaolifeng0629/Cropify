'use client';

import React, { useEffect, useState } from 'react';
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
} from '@/components/modules';
import { Header } from './Header';
import { EmptyState } from './EmptyState';
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelRightClose } from 'lucide-react';

/**
 * Cropify 主应用组件
 */
export const CropifyApp: React.FC = () => {
    const { images, isUploading, errors, addImages, removeImage, clearImages, clearErrors, dismissError } =
        useImageUpload();

    const { selectedImageId, selectedImage, batchSummary, selectImage } =
        useAppState(images);

    const { cropParams, setCropParams, resetCropParams, applyCropAnchor, applyPresetSize } =
        useCropParams(selectedImage);

    const { zoom, showGrid, gridType, setZoom, setShowGrid, setGridType } = useViewSettings();

    const { outputSettings, setOutputSettings } = useOutputSettings();

    const {
        tasks: batchTasks,
        isProcessing,
        startBatch,
        pauseBatch,
        cancelBatch,
        retryFailed,
    } = useBatchProcessor(error => dismissError(error.id));

    // 左右侧面板收起状态
    const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
    const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);

    // 当选中图片变化时，重置裁剪参数
    useEffect(() => {
        resetCropParams(selectedImage);
    }, [selectedImage, resetCropParams]);

    // 判断是否为编辑模式
    const isEditMode = images && images.length > 0;

    return (
        <div className={isEditMode ? "h-screen flex flex-col overflow-hidden pb-6" : "min-h-screen flex flex-col pb-6"}>
            <Header
                images={images}
                onClearImages={clearImages}
                isEditMode={isEditMode}
                cropParams={cropParams}
                outputSettings={outputSettings}
                tasks={batchTasks}
                isProcessing={isProcessing}
                onStartBatch={() => startBatch(images, cropParams, outputSettings)}
                onPauseBatch={pauseBatch}
                onCancelBatch={cancelBatch}
                onRetryFailed={() => retryFailed(images, cropParams, outputSettings)}
            />
            {isEditMode ? (
                <div className="flex-1 flex h-0 overflow-hidden">
                    {/* 左侧面板 */}
                    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
                        leftPanelCollapsed ? 'w-0' : 'w-86'
                    } overflow-hidden flex-shrink-0`}>
                        <div className="flex flex-col h-full">
                            {/* 左侧面板头部 */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white z-10 flex-shrink-0">
                                <h2 className="text-lg font-medium text-gray-900">图片管理</h2>
                                <button
                                    onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                    title="收起左侧面板"
                                >
                                    <PanelLeftClose className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>

                            {/* 左侧面板内容 */}
                            <div className="flex-1 flex flex-col p-4 min-h-0">
                                {/* 图片导入管理 */}
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

                                {/* 图片详细信息 */}
                                {/* <ImageInfoPanel selectedImage={selectedImage} batchSummary={batchSummary} /> */}
                            </div>
                        </div>
                    </div>

                    {/* 左侧面板收起时的展开按钮 */}
                    {leftPanelCollapsed && (
                        <div className="flex-shrink-0 w-8 bg-gray-50 border-r border-gray-200 flex items-center justify-center">
                            <button
                                onClick={() => setLeftPanelCollapsed(false)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                title="展开左侧面板"
                            >
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    )}

                    {/* 中间主内容区域 */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 flex flex-col p-4 lg:p-6 gap-4 overflow-hidden">
                            {/* 预览系统 */}
                            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-0">
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
                            <div className="flex-shrink-0 h-64">
                                <CropDemo selectedImage={selectedImage} cropParams={cropParams} />
                            </div>
                        </div>
                    </div>

                    {/* 右侧面板收起时的展开按钮 */}
                    {rightPanelCollapsed && (
                        <div className="flex-shrink-0 w-8 bg-gray-50 border-l border-gray-200 flex items-center justify-center">
                            <button
                                onClick={() => setRightPanelCollapsed(false)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                title="展开右侧面板"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    )}

                    {/* 右侧面板 */}
                    <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${
                        rightPanelCollapsed ? 'w-0' : 'w-96'
                    } overflow-hidden flex-shrink-0`}>
                        <div className="flex flex-col h-full">
                            {/* 右侧面板头部 */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white z-10 flex-shrink-0">
                                <h2 className="text-lg font-medium text-gray-900">工具面板</h2>
                                <button
                                    onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                    title="收起右侧面板"
                                >
                                    <PanelRightClose className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>

                            {/* 右侧面板内容 */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-6">
                                    {/* 裁剪控制面板 */}
                                    <CropControlPanel
                                        selectedImage={selectedImage}
                                        cropParams={cropParams}
                                        onCropChange={setCropParams}
                                        onApplyCropAnchor={applyCropAnchor}
                                        onApplyPresetSize={applyPresetSize}
                                        onReset={resetCropParams}
                                    />

                                    {/* 分割线 */}
                                    <div className="border-t border-gray-200"></div>

                                    {/* 高级裁剪选项 */}
                                    <AdvancedCropOptions cropParams={cropParams} onCropChange={setCropParams} />

                                    {/* 分割线 */}
                                    <div className="border-t border-gray-200"></div>

                                    {/* 视图设置 */}
                                    <ViewSettings
                                        zoom={zoom}
                                        showGrid={showGrid}
                                        gridType={gridType}
                                        onZoomChange={setZoom}
                                        onGridToggle={setShowGrid}
                                        onGridTypeChange={setGridType}
                                    />

                                    {/* 分割线 */}
                                    <div className="border-t border-gray-200"></div>

                                    {/* 质量控制 */}
                                    <QualityControlPanel outputSettings={outputSettings} onSettingsChange={setOutputSettings} />

                                    {/* 分割线 */}
                                    <div className="border-t border-gray-200"></div>

                                    {/* 批处理和导出 */}
                                    <BatchProcessor
                                        images={images}
                                        cropParams={cropParams}
                                        outputSettings={outputSettings}
                                        tasks={batchTasks}
                                        isProcessing={isProcessing}
                                        onStartBatch={() => startBatch(images, cropParams, outputSettings)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
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
            )}
        </div>
    );
};
