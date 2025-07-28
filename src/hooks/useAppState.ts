'use client';

import { useState, useMemo, useEffect } from 'react';
import { ImageFile, BatchSummary, ProcessTask, ProcessStatus } from '@/types';

interface UseAppStateReturn {
  selectedImageId: string | null;
  selectedImage: ImageFile | null;
  batchSummary: BatchSummary;
  processTasks: ProcessTask[];
  selectImage: (id: string | null) => void;
  updateProcessTasks: (tasks: ProcessTask[]) => void;
}

/**
 * 应用主状态管理 Hook
 */
export function useAppState(images: ImageFile[]): UseAppStateReturn {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [processTasks, setProcessTasks] = useState<ProcessTask[]>([]);

  // 当前选中的图片
  const selectedImage = useMemo(() => {
    if (!selectedImageId) return null;
    return images.find(img => img.id === selectedImageId) || null;
  }, [selectedImageId, images]);

  // 批处理概览统计
  const batchSummary = useMemo((): BatchSummary => {
    const totalSize = images.reduce((sum, img) => sum + img.size, 0);

    // 统计处理任务状态
    const completedCount = processTasks.filter(task => task.status === ProcessStatus.COMPLETED).length;
    const failedCount = processTasks.filter(task => task.status === ProcessStatus.FAILED).length;
    const processingCount = processTasks.filter(task => task.status === ProcessStatus.PROCESSING).length;
    const pendingCount = Math.max(0, images.length - completedCount - failedCount - processingCount);

    // 估算完成时间（基于处理速度）
    let estimatedTime: number | undefined;
    if (processingCount > 0 || pendingCount > 0) {
      // 假设每张图片需要 2-5 秒处理时间
      const avgProcessTime = 3;
      estimatedTime = (processingCount + pendingCount) * avgProcessTime;
    }

    return {
      totalCount: images.length,
      completedCount,
      failedCount,
      processingCount,
      pendingCount,
      totalSize,
      estimatedTime,
    };
  }, [images, processTasks]);

  // 自动选择第一张图片
  useEffect(() => {
    if (images.length > 0 && !selectedImageId) {
      setSelectedImageId(images[0].id);
    } else if (images.length === 0) {
      setSelectedImageId(null);
    }
  }, [images, selectedImageId]);

  // 选择图片
  const selectImage = (id: string | null) => {
    setSelectedImageId(id);
  };

  // 更新处理任务
  const updateProcessTasks = (tasks: ProcessTask[]) => {
    setProcessTasks(tasks);
  };

  return {
    selectedImageId,
    selectedImage,
    batchSummary,
    processTasks,
    selectImage,
    updateProcessTasks,
  };
}
