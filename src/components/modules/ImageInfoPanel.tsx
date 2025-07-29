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
            <div className="text-sm text-gray-500">总数量</div>
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
            <div className="text-sm text-gray-500">失败</div>
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
          <div className="space-y-6">
            {/* 图片预览 */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 text-base">预览图</h4>
              <div className="w-full max-w-xs mx-auto aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                />
              </div>
            </div>

            {/* 图片属性信息 */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 text-base border-b border-gray-100 pb-2">基础信息</h4>

              <div className="space-y-4">
                {/* 文件名称 - 单独一行显示 */}
                <div className="space-y-1">
                  <span className="text-sm text-gray-500 font-medium">文件名称:</span>
                  <div className="bg-gray-50 rounded-md px-3 py-2 border">
                    <span className="text-sm font-medium text-gray-900 break-all" title={selectedImage.name}>
                      {selectedImage.name}
                    </span>
                  </div>
                </div>

                {/* 其他信息使用网格布局 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-md px-3 py-2 border">
                    <div className="text-xs text-gray-500 mb-1">图片尺寸</div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedImage.width} × {selectedImage.height} px
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md px-3 py-2 border">
                    <div className="text-xs text-gray-500 mb-1">文件大小</div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatFileSize(selectedImage.size)}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md px-3 py-2 border">
                    <div className="text-xs text-gray-500 mb-1">图片格式</div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedImage.type.split('/')[1]?.toUpperCase()}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md px-3 py-2 border">
                    <div className="text-xs text-gray-500 mb-1">宽高比</div>
                    <div className="text-sm font-medium text-gray-900">
                      {(selectedImage.width / selectedImage.height).toFixed(2)} : 1
                    </div>
                  </div>

                  {selectedImage.dpi && (
                    <div className="bg-gray-50 rounded-md px-3 py-2 border">
                      <div className="text-xs text-gray-500 mb-1">分辨率</div>
                      <div className="text-sm font-medium text-gray-900">
                        {selectedImage.dpi} DPI
                      </div>
                    </div>
                  )}

                  {selectedImage.colorMode && (
                    <div className="bg-gray-50 rounded-md px-3 py-2 border">
                      <div className="text-xs text-gray-500 mb-1">色彩模式</div>
                      <div className="text-sm font-medium text-gray-900">
                        {selectedImage.colorMode}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-md px-3 py-2 border">
                    <div className="text-xs text-gray-500 mb-1">最后修改</div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(selectedImage.lastModified).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card title="图片详细信息" className="bg-white">
          <div className="text-center py-12 text-gray-500">
            <div className="mx-auto w-20 h-20 text-gray-300 mb-6">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-base font-medium text-gray-600">暂无选中图片</p>
              <p className="text-sm text-gray-400">请从左侧列表中选择一张图片查看详细信息</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
