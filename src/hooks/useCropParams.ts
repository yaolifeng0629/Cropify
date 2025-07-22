'use client';

import { useState, useCallback } from 'react';
import { CropParams, ImageFile, CropAnchor } from '@/types';
import { PRESET_SIZES } from '@/constants';

interface UseCropParamsReturn {
  cropParams: CropParams;
  setCropParams: (params: CropParams) => void;
  updateCropParams: (updates: Partial<CropParams>) => void;
  resetCropParams: (image?: ImageFile | null) => void;
  applyCropAnchor: (anchor: CropAnchor, image: ImageFile) => void;
  applyPresetSize: (presetName: string, image: ImageFile) => void;
}

/**
 * 裁剪参数管理 Hook
 */
export function useCropParams(selectedImage?: ImageFile | null): UseCropParamsReturn {
  const [cropParams, setCropParams] = useState<CropParams>(() => {
    // 默认裁剪参数
    const defaultSize = 200;
    return {
      width: defaultSize,
      height: defaultSize,
      x: 0,
      y: 0,
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
      borderRadius: 0,
      maintainAspectRatio: false,
    };
  });

  // 更新部分裁剪参数
  const updateCropParams = useCallback((updates: Partial<CropParams>) => {
    setCropParams(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // 重置裁剪参数
  const resetCropParams = useCallback((image?: ImageFile | null) => {
    if (!image) {
      setCropParams({
        width: 200,
        height: 200,
        x: 0,
        y: 0,
        rotation: 0,
        flipHorizontal: false,
        flipVertical: false,
        borderRadius: 0,
        maintainAspectRatio: false,
      });
      return;
    }

    // 根据图片尺寸设置默认裁剪区域（居中，占原图的80%）
    const cropSize = Math.min(image.width, image.height) * 0.8;
    const x = (image.width - cropSize) / 2;
    const y = (image.height - cropSize) / 2;

    setCropParams({
      width: cropSize,
      height: cropSize,
      x,
      y,
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
      borderRadius: 0,
      maintainAspectRatio: false,
    });
  }, []);

  // 应用裁剪基准点
  const applyCropAnchor = useCallback((anchor: CropAnchor, image: ImageFile) => {
    setCropParams(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (anchor) {
        case CropAnchor.TOP_LEFT:
          newX = 0;
          newY = 0;
          break;
        case CropAnchor.TOP_CENTER:
          newX = (image.width - prev.width) / 2;
          newY = 0;
          break;
        case CropAnchor.TOP_RIGHT:
          newX = image.width - prev.width;
          newY = 0;
          break;
        case CropAnchor.MIDDLE_LEFT:
          newX = 0;
          newY = (image.height - prev.height) / 2;
          break;
        case CropAnchor.MIDDLE_CENTER:
          newX = (image.width - prev.width) / 2;
          newY = (image.height - prev.height) / 2;
          break;
        case CropAnchor.MIDDLE_RIGHT:
          newX = image.width - prev.width;
          newY = (image.height - prev.height) / 2;
          break;
        case CropAnchor.BOTTOM_LEFT:
          newX = 0;
          newY = image.height - prev.height;
          break;
        case CropAnchor.BOTTOM_CENTER:
          newX = (image.width - prev.width) / 2;
          newY = image.height - prev.height;
          break;
        case CropAnchor.BOTTOM_RIGHT:
          newX = image.width - prev.width;
          newY = image.height - prev.height;
          break;
      }

      // 确保裁剪区域在图片范围内
      newX = Math.max(0, Math.min(newX, image.width - prev.width));
      newY = Math.max(0, Math.min(newY, image.height - prev.height));

      return {
        ...prev,
        x: newX,
        y: newY,
      };
    });
  }, []);

  // 应用预设尺寸
  const applyPresetSize = useCallback((presetName: string, image: ImageFile) => {
    const preset = PRESET_SIZES.find(p => p.name === presetName);
    if (!preset) return;

    let newWidth = preset.width;
    let newHeight = preset.height;

    // 如果是毫米单位，转换为像素（假设72 DPI）
    if (preset.unit === 'mm') {
      const dpi = 72; // 默认DPI
      newWidth = Math.round((preset.width * dpi) / 25.4);
      newHeight = Math.round((preset.height * dpi) / 25.4);
    }

    // 确保尺寸不超过原图尺寸
    newWidth = Math.min(newWidth, image.width);
    newHeight = Math.min(newHeight, image.height);

    // 居中裁剪
    const newX = Math.max(0, (image.width - newWidth) / 2);
    const newY = Math.max(0, (image.height - newHeight) / 2);

    setCropParams(prev => ({
      ...prev,
      width: newWidth,
      height: newHeight,
      x: newX,
      y: newY,
    }));
  }, []);

  return {
    cropParams,
    setCropParams,
    updateCropParams,
    resetCropParams,
    applyCropAnchor,
    applyPresetSize,
  };
}