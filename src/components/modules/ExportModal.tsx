'use client';

import React, { useState } from 'react';
import { Archive, Download } from 'lucide-react';
import { ProcessTask, ProcessStatus, OutputSettings } from '@/types';
import { Button, Modal } from '@/components/ui';
import { formatFileSize } from '@/utils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: ProcessTask[];
  outputSettings: OutputSettings;
  onSingleDownload: (task: ProcessTask) => void;
  onBatchDownload: (tasks: ProcessTask[]) => void;
  onZipDownload: (tasks: ProcessTask[]) => void;
}

/**
 * 导出模态框组件 - 优化的导出界面
 */
export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
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
      const originalName = task.imageId;
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
      <Modal isOpen={isOpen} onClose={onClose} title="导出选项" size="md">
        <div className="p-6">
          <div className="text-center py-12 text-gray-500">
            <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2">暂无可导出内容</p>
            <p className="text-sm">完成图片处理后可在此导出</p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="导出选项" size="lg">
      <div className="p-6 space-y-6">
        {/* 导出统计 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <div className="text-sm text-green-600 font-medium">已完成</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-bold text-blue-600">{formatFileSize(totalSize)}</div>
            <div className="text-sm text-blue-600 font-medium">总大小</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-bold text-blue-700">{outputSettings.format.toUpperCase()}</div>
            <div className="text-sm text-blue-700 font-medium">格式</div>
          </div>
        </div>

        {/* 批量导出选项 */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">批量导出</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* ZIP 打包下载 */}
            <Button
              variant="primary"
              size="md"
              onClick={handleZipDownload}
              disabled={isGeneratingZip}
              loading={isGeneratingZip}
              className="w-full h-12"
            >
              <Archive className="w-5 h-5 mr-2" aria-hidden="true" />
              <div className="text-left">
                <div className="font-medium">
                  {isGeneratingZip ? '正在打包...' : 'ZIP 打包下载'}
                </div>
                <div className="text-xs opacity-80">
                  {completedTasks.length} 张图片
                </div>
              </div>
            </Button>

            {/* 逐个下载 */}
            <Button
              variant="outline"
              size="md"
              onClick={() => onBatchDownload(completedTasks)}
              className="w-full h-12"
            >
              <Download className="w-5 h-5 mr-2" aria-hidden="true" />
              <div className="text-left">
                <div className="font-medium">逐个下载</div>
                <div className="text-xs text-gray-500">
                  依次下载全部
                </div>
              </div>
            </Button>
          </div>
        </div>

        {/* 单张导出列表 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800">单张导出</h4>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {completedTasks.length} 张可导出
            </span>
          </div>
          
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
            {completedTasks.map((task, index) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
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
                  className="ml-3 flex-shrink-0"
                >
                  <Download className="w-4 h-4 mr-1" aria-hidden="true" />
                  下载
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 使用提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <span className="text-sm font-semibold text-blue-800">导出提示</span>
          </div>
          <div className="text-xs text-blue-700 space-y-1 leading-relaxed">
            <p>• <strong>ZIP 打包下载</strong>：将所有图片打包成一个压缩文件，适合批量保存</p>
            <p>• <strong>逐个下载</strong>：浏览器将依次下载每张图片到默认下载文件夹</p>
            <p>• <strong>单张下载</strong>：可选择性下载特定图片，支持预览文件名</p>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
          >
            关闭
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleZipDownload}
            disabled={isGeneratingZip}
            loading={isGeneratingZip}
          >
            <Archive className="w-4 h-4 mr-2" aria-hidden="true" />
            {isGeneratingZip ? '正在打包...' : '快速打包下载'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
