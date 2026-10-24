'use client';

import React, { useState, useEffect } from 'react';
import { ImageFile, CropParams } from '@/types';
import { ImageProcessor } from '@/utils/imageProcessor';

interface CropComparisonProps {
  selectedImage: ImageFile | null;
  cropParams: CropParams;
}

/**
 * 裁剪前后对比组件
 */
export const CropComparison: React.FC<CropComparisonProps> = ({
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
      <div className="bg-white rounded-lg border border-line shadow-sm p-8 text-center">
        <div className="text-ink-muted">
          <p>请选择图片查看对比效果</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-line shadow-sm">
      {/* 标题 */}
      <div className="px-4 py-3 border-b border-line">
        <h3 className="font-medium text-ink">裁剪对比</h3>
      </div>

      {/* 对比内容 */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 原图 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-ink">原图</h4>
            <div className="aspect-square bg-canvas rounded-lg border border-line overflow-hidden">
              <img
                src={selectedImage.url}
                alt="原图"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xs text-ink-muted text-center">
              {selectedImage.width} × {selectedImage.height} px
            </div>
          </div>

          {/* 裁剪后 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-ink">裁剪预览</h4>
            <div className="aspect-square bg-canvas rounded-lg border border-line overflow-hidden relative">
              {isGenerating ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-ink-muted text-sm">生成预览中...</div>
                </div>
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="裁剪预览"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-ink-faint text-sm">调整裁剪参数</div>
                </div>
              )}
            </div>
            <div className="text-xs text-ink-muted text-center">
              {cropParams.width} × {cropParams.height} px
            </div>
          </div>
        </div>

        {/* 裁剪信息 */}
        <div className="mt-4 p-3 bg-canvas rounded-lg">
          <h5 className="text-sm font-medium text-ink mb-2">裁剪信息</h5>
          <div className="grid grid-cols-2 gap-4 text-xs text-ink-muted">
            <div>
              <span className="text-ink-muted">位置:</span> 
              <span className="ml-1">X: {cropParams.x}px, Y: {cropParams.y}px</span>
            </div>
            <div>
              <span className="text-ink-muted">尺寸:</span> 
              <span className="ml-1">{cropParams.width} × {cropParams.height}px</span>
            </div>
            <div>
              <span className="text-ink-muted">宽高比:</span> 
              <span className="ml-1">{(cropParams.width / cropParams.height).toFixed(2)}:1</span>
            </div>
            <div>
              <span className="text-ink-muted">裁剪比例:</span> 
              <span className="ml-1">
                {Math.round((cropParams.width * cropParams.height) / (selectedImage.width * selectedImage.height) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};