'use client';

import React, { useState } from 'react';
import { ImageFile, CropParams, OutputSettings, ProcessTask, ProcessStatus } from '@/types';
import { Button, Card, ProgressBar } from '@/components/ui';
import { formatFileSize } from '@/utils';

interface BatchProcessorProps {
  images: ImageFile[];
  cropParams: CropParams;
  outputSettings: OutputSettings;
  tasks: ProcessTask[];
  isProcessing: boolean;
  onStartBatch: () => void;
  onPauseBatch: () => void;
  onCancelBatch: () => void;
  onRetryFailed: () => void;
}

/**
 * 批处理工作流组件 - 进度监控、状态管理、错误处理
 */
export const BatchProcessor: React.FC<BatchProcessorProps> = ({
  images,
  cropParams,
  outputSettings,
  tasks,
  isProcessing,
  onStartBatch,
  onPauseBatch,
  onCancelBatch,
  onRetryFailed,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // 计算统计信息
  const stats = {
    total: images.length,
    completed: tasks.filter(t => t.status === ProcessStatus.COMPLETED).length,
    failed: tasks.filter(t => t.status === ProcessStatus.FAILED).length,
    processing: tasks.filter(t => t.status === ProcessStatus.PROCESSING).length,
    pending: tasks.filter(t => t.status === ProcessStatus.PENDING).length,
    cancelled: tasks.filter(t => t.status === ProcessStatus.CANCELLED).length,
  };

  const progress = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
  const hasErrors = stats.failed > 0;
  const isCompleted = stats.completed === stats.total && stats.total > 0;

  // 获取当前处理状态
  const getProcessingStatus = () => {
    if (isCompleted) return '处理完成';
    if (isProcessing) return '正在处理...';
    if (hasErrors && stats.processing === 0) return '处理出错';
    if (stats.total === 0) return '无图片待处理';
    return '准备开始';
  };

  // 获取状态颜色
  const getStatusColor = () => {
    if (isCompleted) return 'green';
    if (hasErrors) return 'red';
    if (isProcessing) return 'blue';
    return 'blue';
  };

  return (
    <Card title="批处理工作流" className="bg-white">
      <div className="space-y-6">
        {/* 整体进度 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">整体进度</span>
            <span className="text-sm text-gray-500">
              {stats.completed}/{stats.total} 完成
            </span>
          </div>
          <ProgressBar
            value={progress}
            color={getStatusColor() as 'blue' | 'green' | 'red' | 'yellow'}
            showPercentage={true}
          />
          <div className="mt-2 text-center">
            <span className={`text-sm font-medium ${
              isCompleted ? 'text-green-600' :
              hasErrors ? 'text-red-600' :
              isProcessing ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {getProcessingStatus()}
            </span>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-green-600">已完成</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
            <div className="text-xs text-blue-600">处理中</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs text-yellow-600">等待中</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <div className="text-xs text-red-600">失败</div>
          </div>
        </div>

        {/* 当前处理设置 */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">处理设置</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>裁剪尺寸:</span>
              <span>{Math.round(cropParams.width)} × {Math.round(cropParams.height)}px</span>
            </div>
            <div className="flex justify-between">
              <span>输出格式:</span>
              <span>{outputSettings.format.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>质量设置:</span>
              <span>
                {outputSettings.format === 'png'
                  ? `级别 ${outputSettings.quality}`
                  : `${outputSettings.quality}%`
                }
              </span>
            </div>
            {(cropParams.rotation || 0) !== 0 && (
              <div className="flex justify-between">
                <span>旋转角度:</span>
                <span>{cropParams.rotation}°</span>
              </div>
            )}
            {(cropParams.flipHorizontal || cropParams.flipVertical) && (
              <div className="flex justify-between">
                <span>翻转:</span>
                <span>
                  {cropParams.flipHorizontal ? '水平 ' : ''}
                  {cropParams.flipVertical ? '垂直' : ''}
                </span>
              </div>
            )}
            {(cropParams.borderRadius || 0) > 0 && (
              <div className="flex justify-between">
                <span>圆角:</span>
                <span>{cropParams.borderRadius}px</span>
              </div>
            )}
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex gap-2">
            {!isProcessing ? (
              <Button
                variant="primary"
                size="sm"
                onClick={onStartBatch}
                disabled={stats.total === 0}
                className="flex-1"
              >
                {stats.completed > 0 ? '继续处理' : '开始批处理'}
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={onPauseBatch}
                className="flex-1"
              >
                暂停处理
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onCancelBatch}
              disabled={stats.total === 0}
              className="flex-1"
            >
              {isProcessing ? '停止' : '重置'}
            </Button>
          </div>

          {hasErrors && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetryFailed}
              className="w-full mt-2"
            >
              重试失败项目 ({stats.failed})
            </Button>
          )}
        </div>

        {/* 详细信息展开/收起 */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-900"
          >
            <span>任务详情</span>
            <span className={`transform transition-transform ${showDetails ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {showDetails && (
            <div className="mt-4 max-h-60 overflow-y-auto">
              <div className="space-y-2">
                {tasks.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                    <p>暂无处理任务</p>
                  </div>
                ) : (
                  tasks.map((task) => {
                    const image = images.find(img => img.id === task.imageId);
                    if (!image) return null;

                    return (
                      <div
                        key={task.id}
                        className={`p-3 rounded border-l-4 ${
                          task.status === ProcessStatus.COMPLETED ? 'border-green-500 bg-green-50' :
                          task.status === ProcessStatus.FAILED ? 'border-red-500 bg-red-50' :
                          task.status === ProcessStatus.PROCESSING ? 'border-blue-500 bg-blue-50' :
                          task.status === ProcessStatus.CANCELLED ? 'border-gray-500 bg-gray-50' :
                          'border-yellow-500 bg-yellow-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {image.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatFileSize(image.size)} • {image.width} × {image.height}
                            </div>
                            {task.error && (
                              <div className="text-xs text-red-600 mt-1">
                                错误: {task.error}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {task.status === ProcessStatus.PROCESSING && (
                              <div className="text-xs text-blue-600">
                                {Math.round(task.progress)}%
                              </div>
                            )}
                            <div className={`text-xs px-2 py-1 rounded ${
                              task.status === ProcessStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                              task.status === ProcessStatus.FAILED ? 'bg-red-100 text-red-800' :
                              task.status === ProcessStatus.PROCESSING ? 'bg-blue-100 text-blue-800' :
                              task.status === ProcessStatus.CANCELLED ? 'bg-gray-100 text-gray-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {task.status === ProcessStatus.COMPLETED ? '完成' :
                               task.status === ProcessStatus.FAILED ? '失败' :
                               task.status === ProcessStatus.PROCESSING ? '处理中' :
                               task.status === ProcessStatus.CANCELLED ? '已取消' :
                               '等待'}
                            </div>
                          </div>
                        </div>

                        {task.status === ProcessStatus.PROCESSING && (
                          <div className="mt-2">
                            <ProgressBar
                              value={task.progress}
                              color="blue"
                              showPercentage={false}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* 性能提示 */}
        {stats.total > 10 && (
          <div className="pt-4 border-t border-gray-200">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-600">⚡</span>
                <span className="text-sm font-medium text-yellow-800">性能提示</span>
              </div>
              <div className="text-xs text-yellow-700">
                <p>• 大批量处理时建议降低输出质量以提升速度</p>
                <p>• 处理过程中请避免切换到其他应用程序</p>
                <p>• 如遇到内存不足，可分批次处理</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
