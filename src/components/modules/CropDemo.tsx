'use client';

import React, { useState, useEffect } from 'react';
import { ImageFile, CropParams } from '@/types';
import { ImageProcessor } from '@/utils/imageProcessor';

interface CropDemoProps {
  selectedImage: ImageFile | null;
  cropParams: CropParams;
}

/**
 * 裁剪演示组件 - 显示裁剪后的结果预览
 */
export const CropDemo: React.FC<CropDemoProps> = ({
  selectedImage,
  cropParams,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // 生成裁剪预览
  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl('');
      return;
    }

    const generatePreview = async () => {
      setIsGenerating(true);
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          try {
            const processor = new ImageProcessor();
            const preview = processor.generatePreview(img, cropParams);
            setPreviewUrl(preview);
          } catch (error) {
            console.error('生成预览失败:', error);
          }
          setIsGenerating(false);
        };

        img.onerror = () => {
          setIsGenerating(false);
        };

        img.src = selectedImage.url;
      } catch (error) {
        console.error('预览生成错误:', error);
        setIsGenerating(false);
      }
    };

    // 防抖处理，避免频繁生成预览
    const timeoutId = setTimeout(generatePreview, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedImage, cropParams]);

  if (!selectedImage) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
        <div className="text-gray-500">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="font-medium text-gray-900 mb-1">裁剪预览</p>
          <p className="text-sm">选择图片查看裁剪效果</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* 标题 */}
      <div className="px-3 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">裁剪预览</h3>
      </div>

      {/* 预览内容 */}
      <div className="p-3">
        {/* 裁剪结果展示 */}
        <div className="mb-3">
          <div className="aspect-video bg-gray-50 rounded-lg border border-gray-200 overflow-hidden relative max-w-sm mx-auto h-32">
            {isGenerating ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  <span className="text-sm">生成预览中...</span>
                </div>
              </div>
            ) : previewUrl ? (
              <img
                src={previewUrl}
                alt="裁剪预览"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">调整裁剪参数</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 裁剪信息 */}
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-gray-50 rounded p-2 text-center">
            <div className="text-gray-500 mb-1">尺寸</div>
            <div className="font-medium text-gray-900">
              {Math.round(cropParams.height)}×{Math.round(cropParams.width)}
            </div>
          </div>

          <div className="bg-gray-50 rounded p-2 text-center">
            <div className="text-gray-500 mb-1">比例</div>
            <div className="font-medium text-gray-900">
              {(cropParams.width / cropParams.height).toFixed(1)}:1
            </div>
          </div>

          <div className="bg-gray-50 rounded p-2 text-center">
            <div className="text-gray-500 mb-1">位置</div>
            <div className="font-medium text-gray-900">
              {Math.round(cropParams.x)},{Math.round(cropParams.y)}
            </div>
          </div>

          <div className="bg-gray-50 rounded p-2 text-center">
            <div className="text-gray-500 mb-1">占比</div>
            <div className="font-medium text-gray-900">
              {Math.round((cropParams.width * cropParams.height) / (selectedImage.width * selectedImage.height) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
