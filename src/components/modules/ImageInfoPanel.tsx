'use client';

import React from 'react';
import { ImageFile, BatchSummary } from '@/types';
import { formatFileSize } from '@/utils';
import { Card } from '@/components/ui';

interface ImageInfoPanelProps {
  selectedImage?: ImageFile | null;
  batchSummary: BatchSummary;
}

/**
 * 图片信息面板组件 - 显示原图基础信息和批处理概览
 */
export const ImageInfoPanel: React.FC<ImageInfoPanelProps> = ({
  selectedImage,
  batchSummary,
}) => {
  return (
    <div className="space-y-6">
      {/* 批处理概览 */}
      <Card title="批处理概览" className="bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {batchSummary.totalCount}
            </div>
            <div className="text-sm text-gray-500">总图片数量</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {batchSummary.completedCount}
            </div>
            <div className="text-sm text-gray-500">已处理</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {batchSummary.pendingCount + batchSummary.processingCount}
            </div>
            <div className="text-sm text-gray-500">待处理</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {batchSummary.failedCount}
            </div>
            <div className="text-sm text-gray-500">处理失败</div>
          </div>
        </div>
        
        {/* 总文件大小和预估时间 */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-600">
              总文件大小: <span className="font-medium">{formatFileSize(batchSummary.totalSize)}</span>
            </div>
            {batchSummary.estimatedTime && batchSummary.estimatedTime > 0 && (
              <div className="text-gray-600">
                预估完成时间: <span className="font-medium">{Math.ceil(batchSummary.estimatedTime / 60)} 分钟</span>
              </div>
            )}
          </div>
        </div>

        {/* 进度条 */}
        {batchSummary.totalCount > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>整体进度</span>
              <span>{Math.round((batchSummary.completedCount / batchSummary.totalCount) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(batchSummary.completedCount / batchSummary.totalCount) * 100}%`
                }}
              ></div>
            </div>
          </div>
        )}
      </Card>

      {/* 当前选中图片信息 */}
      {selectedImage ? (
        <Card title="图片详细信息" className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 图片预览 */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">预览图</h4>
              <div className="aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* 图片属性信息 */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">基础信息</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">文件名称:</span>
                  <span className="text-sm font-medium text-gray-900 truncate ml-2" title={selectedImage.name}>
                    {selectedImage.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">图片尺寸:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedImage.width} × {selectedImage.height} px
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">文件大小:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatFileSize(selectedImage.size)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">图片格式:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedImage.type.split('/')[1]?.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">宽高比:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {(selectedImage.width / selectedImage.height).toFixed(2)} : 1
                  </span>
                </div>

                {selectedImage.dpi && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">分辨率:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedImage.dpi} DPI
                    </span>
                  </div>
                )}

                {selectedImage.colorMode && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">色彩模式:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedImage.colorMode}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">最后修改:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(selectedImage.lastModified).toLocaleDateString('zh-CN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card title="图片详细信息" className="bg-white">
          <div className="text-center py-8 text-gray-500">
            <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm">请选择图片查看详细信息</p>
          </div>
        </Card>
      )}
    </div>
  );
};