'use client';

import { useState, useCallback, useRef } from 'react';
import { ImageFile, AppError } from '@/types';
import { getImageMetadata, isValidImageFile } from '@/utils';
import { APP_CONFIG, ERROR_MESSAGES } from '@/constants';

interface UseImageUploadReturn {
  images: ImageFile[];
  isUploading: boolean;
  errors: AppError[];
  addImages: (files: File[]) => Promise<void>;
  removeImage: (id: string) => void;
  clearImages: () => void;
  clearErrors: () => void;
  dismissError: (id: string) => void;
}

/**
 * 图片上传管理 Hook
 */
export function useImageUpload(): UseImageUploadReturn {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<AppError[]>([]);
  
  const uploadedCount = useRef(0);

  // 添加错误
  const addError = useCallback((type: AppError['type'], message: string, details?: string) => {
    const error: AppError = {
      id: Date.now().toString(),
      type,
      message,
      details,
      timestamp: Date.now(),
    };
    setErrors(prev => [...prev, error]);
  }, []);

  // 验证文件
  const validateFile = useCallback((file: File): boolean => {
    // 检查文件格式
    if (!isValidImageFile(file, APP_CONFIG.SUPPORTED_INPUT_FORMATS)) {
      addError('upload', ERROR_MESSAGES.UNSUPPORTED_FORMAT, `文件：${file.name}`);
      return false;
    }

    // 检查文件大小
    const maxSizeBytes = APP_CONFIG.MAX_FILE_SIZE * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      addError('upload', ERROR_MESSAGES.FILE_TOO_LARGE(APP_CONFIG.MAX_FILE_SIZE), `文件：${file.name}`);
      return false;
    }

    return true;
  }, [addError]);

  // 添加图片
  const addImages = useCallback(async (files: File[]) => {
    setIsUploading(true);
    
    try {
      // 检查批量限制
      const totalCount = images.length + files.length;
      if (totalCount > APP_CONFIG.MAX_BATCH_SIZE) {
        addError('upload', ERROR_MESSAGES.BATCH_SIZE_EXCEEDED(APP_CONFIG.MAX_BATCH_SIZE));
        return;
      }

      // 过滤并验证文件
      const validFiles = files.filter(validateFile);
      if (validFiles.length === 0) return;

      // 处理每个文件
      const newImages: ImageFile[] = [];
      
      for (const file of validFiles) {
        try {
          const imageFile = await getImageMetadata(file);
          newImages.push(imageFile);
        } catch (error) {
          addError('upload', ERROR_MESSAGES.UPLOAD_FAILED, `文件：${file.name}`);
        }
      }

      // 添加到状态
      setImages(prev => [...prev, ...newImages]);
      uploadedCount.current += newImages.length;
      
    } catch (error) {
      addError('system', '批量导入失败');
    } finally {
      setIsUploading(false);
    }
  }, [images.length, validateFile, addError]);

  // 删除图片
  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove?.url) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  // 清空图片
  const clearImages = useCallback(() => {
    // 释放所有 URL
    images.forEach(image => {
      if (image.url) {
        URL.revokeObjectURL(image.url);
      }
    });
    setImages([]);
    uploadedCount.current = 0;
  }, [images]);

  // 清空错误
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  // 关闭单个错误
  const dismissError = useCallback((id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  }, []);

  return {
    images,
    isUploading,
    errors,
    addImages,
    removeImage,
    clearImages,
    clearErrors,
    dismissError,
  };
}