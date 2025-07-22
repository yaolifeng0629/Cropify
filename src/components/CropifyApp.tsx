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
      {/* 页面标题和说明 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          批量图片裁剪工具
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          支持多种格式图片的批量导入、精准裁剪和批量导出。所有处理均在本地完成，保护您的数据隐私。
        </p>
      </div>

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
        // 空状态：图片导入区域
        <div className="max-w-4xl mx-auto">
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

          {/* 功能完成展示 */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-green-900 mb-4">
              🎉 Cropify 功能已全面完成！
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-green-800 text-sm">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>图片批量导入</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>图片信息面板</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>实时预览系统</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>智能裁剪工具</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>高级裁剪选项</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>图像质量控制</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>批处理工作流</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>批量导出功能</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">开始使用</h4>
              <p className="text-sm text-green-700">
                上传图片文件到上方区域，即可开始专业级的批量图片裁剪体验！
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};