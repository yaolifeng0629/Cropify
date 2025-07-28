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
      <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-medium text-gray-900">
            图片 ({images.length})
          </h3>
          <span className="text-xs text-gray-500">
            {formatFileSize(totalSize)}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          disabled={images.length === 0}
          className="text-xs h-6 px-2"
        >
          清空
        </Button>
      </div>

      {/* 图片列表 */}
      <div className="max-h-48 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {images.map((image) => {
            const isSelected = selectedImageId === image.id;
            return (
              <div
                key={image.id}
                className={`group flex items-center gap-2 p-2 cursor-pointer transition-colors hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                }`}
                onClick={() => onSelect?.(image.id)}
              >
                {/* 小缩略图 */}
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* 图片信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium text-gray-900 truncate" title={image.name}>
                      {image.name.length > 12 ? image.name.substring(0, 12) + '...' : image.name}
                    </h4>
                    {isSelected && (
                      <div className="flex-shrink-0 w-3 h-3 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-0.5">
                    <div className="text-xs text-gray-500 truncate">
                      {image.width}×{image.height} • {formatFileSize(image.size)}
                    </div>

                    {/* 删除按钮 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(image.id);
                      }}
                      className="flex-shrink-0 w-4 h-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      title="删除图片"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
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
