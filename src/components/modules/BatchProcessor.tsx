'use client';

import React, { useState } from 'react';
import { ImageFile, CropParams, OutputSettings, ProcessTask, ProcessStatus } from '@/types';
import { Card, ProgressBar } from '@/components/ui';
import { formatFileSize } from '@/utils';

interface BatchProcessorProps {
  images: ImageFile[];
  cropParams: CropParams;
  outputSettings: OutputSettings;
  tasks: ProcessTask[];
  isProcessing: boolean;
  onStartBatch: () => void;
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
    <div>
      <h3 className="text-sm font-medium text-ink mb-3">批处理工作流</h3>
      <div className="space-y-4">
        {/* 整体进度 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-ink">整体进度</span>
            <span className="text-sm text-ink-muted">
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
              isCompleted ? 'text-brand' :
              hasErrors ? 'text-destructive' :
              isProcessing ? 'text-info' : 'text-ink-muted'
            }`}>
              {getProcessingStatus()}
            </span>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-brand-tint rounded-lg">
            <div className="text-2xl font-medium text-brand">{stats.completed}</div>
            <div className="text-xs text-brand">已完成</div>
          </div>
          <div className="text-center p-3 bg-info-tint rounded-lg">
            <div className="text-2xl font-medium text-info">{stats.processing}</div>
            <div className="text-xs text-info">处理中</div>
          </div>
          <div className="text-center p-3 bg-copper-tint rounded-lg">
            <div className="text-2xl font-medium text-copper">{stats.pending}</div>
            <div className="text-xs text-copper">等待中</div>
          </div>
          <div className="text-center p-3 bg-error-tint rounded-lg">
            <div className="text-2xl font-medium text-destructive">{stats.failed}</div>
            <div className="text-xs text-destructive">失败</div>
          </div>
        </div>

        {/* 当前处理设置 */}
        <div className="pt-3 border-t border-line">
          <h4 className="text-sm font-medium text-ink mb-2">处理设置</h4>
          <div className="text-xs text-ink-muted space-y-1">
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



        {/* 详细信息展开/收起 */}
        <div className="pt-3 border-t border-line">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-sm text-ink-muted hover:text-ink"
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
                  <div className="text-center text-ink-muted py-4">
                    <p>暂无处理任务</p>
                  </div>
                ) : (
                  tasks.map((task) => {
                    const image = images.find(img => img.id === task.imageId);
                    if (!image) return null;

                    return (
                      <div
                        key={task.id}
                        className={`p-3 rounded-md border ${
                          task.status === ProcessStatus.COMPLETED ? 'border-brand/25 bg-brand-tint' :
                          task.status === ProcessStatus.FAILED ? 'border-destructive/25 bg-error-tint' :
                          task.status === ProcessStatus.PROCESSING ? 'border-crop/25 bg-crop-tint' :
                          task.status === ProcessStatus.CANCELLED ? 'border-line bg-wash' :
                          'border-copper/25 bg-copper-tint'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-ink truncate">
                              {image.name}
                            </div>
                            <div className="text-xs text-ink-muted">
                              {formatFileSize(image.size)} • {image.width} × {image.height}
                            </div>
                            {task.error && (
                              <div className="text-xs text-destructive mt-1">
                                错误: {task.error}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {task.status === ProcessStatus.PROCESSING && (
                              <div className="text-xs text-crop">
                                {Math.round(task.progress)}%
                              </div>
                            )}
                            <div className={`text-xs px-2 py-1 rounded ${
                              task.status === ProcessStatus.COMPLETED ? 'bg-brand-tint text-brand' :
                              task.status === ProcessStatus.FAILED ? 'bg-error-tint text-destructive' :
                              task.status === ProcessStatus.PROCESSING ? 'bg-crop-tint text-crop-hover' :
                              task.status === ProcessStatus.CANCELLED ? 'bg-wash text-ink-muted' :
                              'bg-copper-tint text-copper'
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
          <div className="pt-3 border-t border-line">
            <div className="p-3 bg-copper-tint rounded-lg">
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium text-copper">性能提示</span>
              </div>
              <div className="text-xs text-copper">
                <p>• 大批量处理时建议降低输出质量以提升速度</p>
                <p>• 处理过程中请避免切换到其他应用程序</p>
                <p>• 如遇到内存不足，可分批次处理</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
