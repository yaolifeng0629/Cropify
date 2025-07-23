'use client';

import React, { useEffect } from 'react';
import { 
  useImageUpload, 
  useAppState, 
  useCropParams, 
  useViewSettings, 
  useOutputSettings,
  useBatchProcessor 
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
  ExportSystem
} from '@/components/modules';
import { ExportUtils } from '@/utils';

/**
 * Cropify 主应用组件
 */
export const CropifyApp: React.FC = () => {
  const {
    images,
    isUploading,
    errors,
    addImages,
    removeImage,
    clearImages,
    clearErrors,
    dismissError,
  } = useImageUpload();

  const {
    selectedImageId,
    selectedImage,
    batchSummary,
    processTasks,
    selectImage,
    updateProcessTasks,
  } = useAppState(images);

  const {
    cropParams,
    setCropParams,
    updateCropParams,
    resetCropParams,
    applyCropAnchor,
    applyPresetSize,
  } = useCropParams(selectedImage);

  const {
    zoom,
    showGrid,
    gridType,
    setZoom,
    setShowGrid,
    setGridType,
    resetView,
  } = useViewSettings();

  const {
    outputSettings,
    setOutputSettings,
    updateOutputSettings,
    resetOutputSettings,
  } = useOutputSettings();

  const {
    tasks: batchTasks,
    isProcessing,
    startBatch,
    pauseBatch,
    cancelBatch,
    retryFailed,
  } = useBatchProcessor((error) => dismissError(error.id));

  // 当选中图片变化时，重置裁剪参数
  useEffect(() => {
    resetCropParams(selectedImage);
  }, [selectedImage, resetCropParams]);

  // 导出处理函数
  const handleSingleDownload = (task: any) => {
    if (task.processedBlob) {
      const image = images.find(img => img.id === task.imageId);
      const filename = ExportUtils.generateFileName(
        task, 
        0, 
        outputSettings, 
        image?.name
      );
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
    <div className="space-y-8">
      {/* 页面标题和说明 - 仅在空状态时显示 */}
      {images.length === 0 && (
        <div className="text-center mb-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Cropify
            </h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              专业级批量图片裁剪工具
            </h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            支持多种格式图片的批量导入、精准裁剪和高效导出。所有处理均在本地完成，确保您的数据隐私安全。
          </p>
        </div>
      )}

      {/* 主功能区域 */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* 左侧：图片列表和批处理控制（占3列） */}
          <div className="xl:col-span-3 space-y-6">
            <div className="sticky top-6 space-y-6">
              {/* 图片列表 */}
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

              {/* 批处理控制 */}
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

              {/* 导出系统 */}
              <ExportSystem
                tasks={batchTasks}
                outputSettings={outputSettings}
                onSingleDownload={handleSingleDownload}
                onBatchDownload={handleBatchDownload}
                onZipDownload={handleZipDownload}
              />
            </div>
          </div>

          {/* 中间：预览系统（占5列） */}
          <div className="xl:col-span-5 space-y-6">
            {/* 实时预览 */}
            <PreviewSystem
              selectedImage={selectedImage}
              cropParams={cropParams}
              onCropChange={setCropParams}
              zoom={zoom}
              showGrid={showGrid}
              gridType={gridType}
              onZoomChange={setZoom}
            />

            {/* 裁剪对比 */}
            <CropComparison
              selectedImage={selectedImage}
              cropParams={cropParams}
            />
          </div>

          {/* 右侧：控制面板（占4列） */}
          <div className="xl:col-span-4 space-y-6">
            <div className="sticky top-6 space-y-6">
              {/* 图片信息面板 */}
              <ImageInfoPanel
                selectedImage={selectedImage}
                batchSummary={batchSummary}
              />

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
              <AdvancedCropOptions
                cropParams={cropParams}
                onCropChange={setCropParams}
              />

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
              <QualityControlPanel
                outputSettings={outputSettings}
                onSettingsChange={setOutputSettings}
              />
            </div>
          </div>
        </div>
      ) : (
        // 空状态：优雅的引导界面
        <div className="max-w-5xl mx-auto">
          {/* 主要上传区域 */}
          <div className="mb-12">
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

          {/* 功能介绍卡片 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">智能批量导入</h3>
              <p className="text-sm text-gray-600">支持拖拽上传多种格式图片，自动识别并批量处理</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16h1m4 0h1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">精准裁剪控制</h3>
              <p className="text-sm text-gray-600">实时预览、智能网格对齐、多种裁剪模式</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">高效批量导出</h3>
              <p className="text-sm text-gray-600">支持多种格式输出、质量控制、批量下载</p>
            </div>
          </div>

          {/* 开始使用指引 */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span className="font-medium">点击上方区域或拖拽图片开始裁剪</span>
            </div>
            <p className="mt-4 text-sm text-gray-500 max-w-md mx-auto">
              所有处理均在本地完成，确保您的图片数据完全私密安全
            </p>
          </div>
        </div>
      )}
    </div>
  );
};