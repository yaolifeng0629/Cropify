'use client';

import React, { useEffect } from 'react';
import { ImageFile, AppError } from '@/types';
import { FileDropZone } from './FileDropZone';
import { ImageList } from './ImageList';
import { ErrorDisplay } from './ErrorDisplay';
import { APP_CONFIG } from '@/constants';

interface ImageImportManagerProps {
  images: ImageFile[];
  isUploading: boolean;
  errors: AppError[];
  selectedImageId?: string | null;
  addImages: (files: File[]) => Promise<void>;
  removeImage: (id: string) => void;
  clearImages: () => void;
  clearErrors: () => void;
  dismissError: (id: string) => void;
  onSelectImage?: (id: string) => void;
}

/**
 * 图片导入管理主组件
 */
export const ImageImportManager: React.FC<ImageImportManagerProps> = ({
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

  // 处理全局粘贴事件
  useEffect(() => {
    const handleGlobalPaste = async (e: ClipboardEvent) => {
      // 只在没有聚焦输入框时处理
      const activeElement = document.activeElement;
      if (activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        (activeElement as HTMLElement).contentEditable === 'true'
      )) {
        return;
      }

      const items = Array.from(e.clipboardData?.items || []);
      const files: File[] = [];

      for (const item of items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        e.preventDefault();
        await addImages(files);
      }
    };

    document.addEventListener('paste', handleGlobalPaste);
    return () => {
      document.removeEventListener('paste', handleGlobalPaste);
    };
  }, [addImages]);

  // 处理错误关闭 - 移除这个函数，直接使用 dismissError

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* 文件上传区域 */}
      <div className="relative flex-shrink-0">
        <FileDropZone
          onFilesSelected={addImages}
          maxFiles={APP_CONFIG.MAX_BATCH_SIZE}
          disabled={isUploading}
        />

        {/* 上传中状态指示 */}
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-3 text-info">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="font-medium">正在处理图片...</span>
            </div>
          </div>
        )}
      </div>

      {/* 错误信息显示 */}
      {errors.length > 0 && (
        <div className="flex-shrink-0">
          <ErrorDisplay
            errors={errors}
            onClear={clearErrors}
            onDismiss={dismissError}
          />
        </div>
      )}

      {/* 图片列表 */}
      <div className="flex-1 min-h-0">
        <ImageList
          images={images}
          selectedImageId={selectedImageId}
          onRemove={removeImage}
          onClear={clearImages}
          onSelect={onSelectImage}
        />
      </div>

      {/* 使用提示 */}
      {images.length === 0 && !isUploading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-ink-muted">
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-medium text-ink">开始使用 Cropify</h3>
              <p className="text-sm">
                选择或拖拽图片文件到上方区域开始批量裁剪
              </p>
              <div className="text-xs space-y-1 text-ink-faint">
                <p>最多可同时处理 {APP_CONFIG.MAX_BATCH_SIZE} 张图片</p>
                <p>可使用 Ctrl+V 直接粘贴剪贴板中的图片</p>
                <p>所有处理都在本地完成，保护您的隐私</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
