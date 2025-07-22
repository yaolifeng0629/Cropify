'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui';

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * 文件拖拽上传区域组件
 */
export const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesSelected,
  accept = 'image/*',
  maxFiles = 50,
  disabled = false,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理拖拽进入
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.types.includes('Files')) {
      setIsDragging(true);
    }
  };

  // 处理拖拽离开
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setDragCounter(prev => prev - 1);
    if (dragCounter <= 1) {
      setIsDragging(false);
    }
  };

  // 处理拖拽悬停
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 处理拖拽释放
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setIsDragging(false);
    setDragCounter(0);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const limitedFiles = files.slice(0, maxFiles);
      onFilesSelected(limitedFiles);
    }
  };

  // 处理文件选择
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const limitedFiles = files.slice(0, maxFiles);
      onFilesSelected(limitedFiles);
    }
    
    // 清空input值，允许选择相同文件
    e.target.value = '';
  };

  // 打开文件选择对话框
  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 处理粘贴事件
  const handlePaste = async (e: React.ClipboardEvent) => {
    if (disabled) return;
    
    const items = Array.from(e.clipboardData.items);
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
      const limitedFiles = files.slice(0, maxFiles);
      onFilesSelected(limitedFiles);
    }
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 
        ${isDragging 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileDialog}
      onPaste={handlePaste}
      tabIndex={0}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
      
      {children || (
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              {isDragging ? '释放以添加图片' : '添加图片文件'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              拖拽图片文件到此处，或点击选择文件
            </p>
            <p className="text-xs text-gray-400">
              支持 JPG、PNG、WebP、BMP、TIFF、GIF 格式
              <br />
              单个文件最大 10MB，最多 {maxFiles} 张
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Button variant="outline" size="sm">
              选择文件
            </Button>
            <span className="text-xs text-gray-400">
              或使用 Ctrl+V 粘贴剪贴板图片
            </span>
          </div>
        </div>
      )}
      
      {/* 拖拽覆盖层 */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded-lg flex items-center justify-center">
          <div className="text-blue-600 font-medium">
            释放文件以开始上传
          </div>
        </div>
      )}
    </div>
  );
};