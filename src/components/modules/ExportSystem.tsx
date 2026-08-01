'use client';

import React, { useState } from 'react';
import { Archive, Download } from 'lucide-react';
import { ProcessTask, ProcessStatus, OutputSettings } from '@/types';
import { Button, Card } from '@/components/ui';
import { formatFileSize, generateId } from '@/utils';

interface ExportSystemProps {
  tasks: ProcessTask[];
  outputSettings: OutputSettings;
  onSingleDownload: (task: ProcessTask) => void;
  onBatchDownload: (tasks: ProcessTask[]) => void;
  onZipDownload: (tasks: ProcessTask[]) => void;
}

/**
 * 导出系统组件 - 单张下载、ZIP 批量打包
 */
export const ExportSystem: React.FC<ExportSystemProps> = ({
  tasks,
  outputSettings,
  onSingleDownload,
  onBatchDownload,
  onZipDownload,
}) => {
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);

  // 获取已完成的任务
  const completedTasks = tasks.filter(task => 
    task.status === ProcessStatus.COMPLETED && task.processedBlob
  );

  const totalSize = completedTasks.reduce((sum, task) => 
    sum + (task.processedBlob?.size || 0), 0
  );

  // 生成文件名
  const generateFileName = (task: ProcessTask, index: number): string => {
    if (outputSettings.maintainOriginalName) {
      const originalName = task.imageId; // 这里需要从 images 中获取原始名称
      const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
      return `${nameWithoutExt}.${outputSettings.format}`;
    }

    const prefix = outputSettings.filenamePrefix || '';
    const suffix = outputSettings.filenameSuffix || '';
    const number = String(index + 1).padStart(3, '0');
    
    return `${prefix}image_${number}${suffix}.${outputSettings.format}`;
  };

  // 处理ZIP下载
  const handleZipDownload = async () => {
    if (completedTasks.length === 0) return;

    setIsGeneratingZip(true);
    try {
      await onZipDownload(completedTasks);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  if (completedTasks.length === 0) {
    return (
      <Card title="导出选项" className="bg-white">
        <div className="text-center py-8 text-gray-500">
          <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <p>完成图片处理后可在此导出</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="导出选项" className="bg-white">
      <div className="space-y-6">
        {/* 导出统计 */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">导出统计</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
              <div className="text-xs text-green-600">已完成</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{formatFileSize(totalSize)}</div>
              <div className="text-xs text-blue-600">总大小</div>
            </div>
          </div>
        </div>

        {/* 批量导出选项 */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">批量导出</h4>
          <div className="space-y-3">
            {/* ZIP 打包下载 */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleZipDownload}
              disabled={isGeneratingZip}
              loading={isGeneratingZip}
              className="w-full"
            >
              <Archive className="w-4 h-4 mr-2" aria-hidden="true" />
              {isGeneratingZip ? '正在打包...' : `ZIP 打包下载 (${completedTasks.length} 张)`}
            </Button>

            {/* 逐个下载 */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBatchDownload(completedTasks)}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              逐个下载全部
            </Button>
          </div>
        </div>

        {/* 输出设置预览 */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">输出设置</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>文件格式:</span>
              <span className="font-medium">{outputSettings.format.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>质量:</span>
              <span className="font-medium">
                {outputSettings.format === 'png' 
                  ? `压缩级别 ${outputSettings.quality}`
                  : `${outputSettings.quality}% 质量`
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>文件命名:</span>
              <span className="font-medium">
                {outputSettings.maintainOriginalName ? '保持原名' : '自定义'}
              </span>
            </div>
          </div>
        </div>

        {/* 单张导出列表 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">单张导出</h4>
            <span className="text-xs text-gray-500">{completedTasks.length} 张可导出</span>
          </div>
          
          <div className="max-h-48 overflow-y-auto space-y-2">
            {completedTasks.map((task, index) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {generateFileName(task, index)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {task.processedBlob ? formatFileSize(task.processedBlob.size) : 'N/A'}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSingleDownload(task)}
                  className="ml-2"
                >
                  <Download className="w-4 h-4 mr-1" aria-hidden="true" />
                  下载
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 使用提示 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-blue-800">导出提示</span>
            </div>
            <div className="text-xs text-blue-700 space-y-1">
              <p>• ZIP 打包下载：将所有图片打包成一个压缩文件</p>
              <p>• 逐个下载：浏览器将依次下载每张图片</p>
              <p>• 单张下载：可选择性下载特定图片</p>
              <p>• 下载的文件将保存到浏览器默认下载文件夹</p>
            </div>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">快速操作</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // 预览第一张图片
                if (completedTasks[0]?.processedUrl) {
                  window.open(completedTasks[0].processedUrl, '_blank');
                }
              }}
              disabled={completedTasks.length === 0}
            >
              预览
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // 复制统计信息到剪贴板
                const stats = `处理完成：${completedTasks.length} 张图片，总大小：${formatFileSize(totalSize)}`;
                navigator.clipboard?.writeText(stats);
              }}
            >
              复制信息
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
