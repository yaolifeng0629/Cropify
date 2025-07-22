'use client';

import React from 'react';
import { ImageFile } from '@/types';
import { formatFileSize } from '@/utils';
import { Button } from '@/components/ui';

interface ImageListProps {
  images: ImageFile[];
  selectedImageId?: string | null;
  onRemove: (id: string) => void;
  onClear: () => void;
  onSelect?: (id: string) => void;
}

/**
 * 图片列表组件
 */
export const ImageList: React.FC<ImageListProps> = ({
  images,
  selectedImageId,
  onRemove,
  onClear,
  onSelect,
}) => {
  if (images.length === 0) {
    return null;
  }

  const totalSize = images.reduce((sum, img) => sum + img.size, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* 头部信息 */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium text-gray-900">
            已选择图片 ({images.length})
          </h3>
          <span className="text-sm text-gray-500">
            总大小: {formatFileSize(totalSize)}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClear}
          disabled={images.length === 0}
        >
          清空全部
        </Button>
      </div>

      {/* 图片列表 */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => {
            const isSelected = selectedImageId === image.id;
            return (
            <div 
              key={image.id} 
              className={`relative group cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onSelect?.(image.id)}
            >
              {/* 图片预览卡片 */}
              <div className={`bg-gray-50 rounded-lg border overflow-hidden ${
                isSelected ? 'border-blue-300' : 'border-gray-200'
              }`}>
                {/* 图片预览 */}
                <div className="aspect-square relative bg-white">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                  
                  {/* 删除按钮 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 防止触发选择事件
                      onRemove(image.id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="删除图片"
                  >
                    ×
                  </button>

                  {/* 选中状态指示器 */}
                  {isSelected && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                      ✓
                    </div>
                  )}
                </div>
                
                {/* 图片信息 */}
                <div className="p-3 space-y-1">
                  <h4 className="font-medium text-sm text-gray-900 truncate" title={image.name}>
                    {image.name}
                  </h4>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{image.width} × {image.height}</span>
                    <span>{formatFileSize(image.size)}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {image.type.split('/')[1]?.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};