'use client';

import { useState, useCallback, useRef } from 'react';
import { ImageFile, CropParams, OutputSettings, ProcessTask, ProcessStatus, AppError } from '@/types';
import { generateId, ImageProcessor } from '@/utils';
import { ERROR_MESSAGES } from '@/constants';

interface UseBatchProcessorReturn {
  tasks: ProcessTask[];
  isProcessing: boolean;
  startBatch: (images: ImageFile[], cropParams: CropParams, outputSettings: OutputSettings) => void;
  pauseBatch: () => void;
  cancelBatch: () => void;
  retryFailed: (images: ImageFile[], cropParams: CropParams, outputSettings: OutputSettings) => void;
  addError: (error: AppError) => void;
}

/**
 * 批处理管理 Hook
 */
export function useBatchProcessor(onError: (error: AppError) => void): UseBatchProcessorReturn {
  const [tasks, setTasks] = useState<ProcessTask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 添加错误
  const addError = useCallback((error: AppError) => {
    onError(error);
  }, [onError]);

  // 更新任务状态
  const updateTask = useCallback((taskId: string, updates: Partial<ProcessTask>) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  }, []);

  // 处理单个图片
  const processImage = useCallback(async (
    image: ImageFile,
    task: ProcessTask,
    cropParams: CropParams,
    outputSettings: OutputSettings,
    signal: AbortSignal
  ): Promise<void> => {
    try {
      // 检查是否被取消
      if (signal.aborted) {
        updateTask(task.id, { status: ProcessStatus.CANCELLED });
        return;
      }

      // 更新状态为处理中
      updateTask(task.id, {
        status: ProcessStatus.PROCESSING,
        progress: 0
      });

      // 创建图片元素
      const img = new Image();
      img.crossOrigin = 'anonymous';

      const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('图片加载失败'));
        img.src = image.url;
      });

      const imageElement = await imagePromise;

      // 检查是否被取消
      if (signal.aborted) {
        updateTask(task.id, { status: ProcessStatus.CANCELLED });
        return;
      }

      // 更新进度：图片加载完成
      updateTask(task.id, { progress: 25 });

      // 创建图片处理器
      const processor = new ImageProcessor();

      // 更新进度：开始处理
      updateTask(task.id, { progress: 50 });

      // 检查是否被取消
      if (signal.aborted) {
        updateTask(task.id, { status: ProcessStatus.CANCELLED });
        return;
      }

      // 应用裁剪和变换
      const processedBlob = await processor.cropImage(imageElement, cropParams);

      // 更新进度：处理完成
      updateTask(task.id, { progress: 75 });

      // 检查是否被取消
      if (signal.aborted) {
        updateTask(task.id, { status: ProcessStatus.CANCELLED });
        return;
      }

      // 转换为最终格式和质量
      const finalBlob = await convertBlobFormat(processedBlob, outputSettings);

      // 创建预览URL
      const processedUrl = URL.createObjectURL(finalBlob);

      // 更新任务完成状态
      updateTask(task.id, {
        status: ProcessStatus.COMPLETED,
        progress: 100,
        processedBlob: finalBlob,
        processedUrl,
      });

    } catch (error) {
      console.error('处理图片失败:', error);
      updateTask(task.id, {
        status: ProcessStatus.FAILED,
        error: error instanceof Error ? error.message : '处理失败',
        progress: 0,
      });

      addError({
        id: generateId(),
        type: 'processing',
        message: ERROR_MESSAGES.PROCESSING_FAILED,
        details: `文件: ${image.name}`,
        timestamp: Date.now(),
      });
    }
  }, [updateTask, addError]);

  // 格式转换函数
  const convertBlobFormat = async (
    blob: Blob,
    settings: OutputSettings
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('无法获取Canvas上下文'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const mimeType = `image/${settings.format === 'jpg' ? 'jpeg' : settings.format}`;
        const quality = settings.format === 'png'
          ? undefined // PNG不支持质量参数
          : settings.quality / 100;

        canvas.toBlob((convertedBlob) => {
          if (convertedBlob) {
            resolve(convertedBlob);
          } else {
            reject(new Error('格式转换失败'));
          }
        }, mimeType, quality);
      };

      img.onerror = () => reject(new Error('图片格式转换失败'));
      img.src = URL.createObjectURL(blob);
    });
  };

  // 开始批处理
  const startBatch = useCallback(async (
    images: ImageFile[],
    cropParams: CropParams,
    outputSettings: OutputSettings
  ) => {
    if (isProcessing) return;

    setIsProcessing(true);
    processingRef.current = true;
    abortControllerRef.current = new AbortController();

    try {
      // 创建或更新任务列表
      const newTasks: ProcessTask[] = images.map(image => {
        // 查找现有任务
        const existingTask = tasks.find(t => t.imageId === image.id);

        if (existingTask && existingTask.status === ProcessStatus.COMPLETED) {
          // 如果已完成且参数未变化，保持完成状态
          return existingTask;
        }

        // 创建新任务或重置现有任务
        return {
          id: existingTask?.id || generateId(),
          imageId: image.id,
          status: ProcessStatus.PENDING,
          progress: 0,
          cropParams: { ...cropParams },
          outputSettings: { ...outputSettings },
        };
      });

      setTasks(newTasks);

      // 获取需要处理的任务
      const pendingTasks = newTasks.filter(task =>
        task.status === ProcessStatus.PENDING || task.status === ProcessStatus.FAILED
      );

      // 顺序处理每个任务
      for (const task of pendingTasks) {
        if (!processingRef.current || abortControllerRef.current?.signal.aborted) {
          break;
        }

        const image = images.find(img => img.id === task.imageId);
        if (!image) continue;

        await processImage(image, task, cropParams, outputSettings, abortControllerRef.current.signal);

        // 添加小延迟，避免UI阻塞
        await new Promise(resolve => setTimeout(resolve, 50));
      }

    } catch (error) {
      console.error('批处理出错:', error);
      addError({
        id: generateId(),
        type: 'processing',
        message: '批处理过程中出现错误',
        details: error instanceof Error ? error.message : '未知错误',
        timestamp: Date.now(),
      });
    } finally {
      setIsProcessing(false);
      processingRef.current = false;
      abortControllerRef.current = null;
    }
  }, [isProcessing, tasks, processImage, addError]);

  // 暂停批处理
  const pauseBatch = useCallback(() => {
    processingRef.current = false;
    abortControllerRef.current?.abort();
    setIsProcessing(false);
  }, []);

  // 取消批处理
  const cancelBatch = useCallback(() => {
    processingRef.current = false;
    abortControllerRef.current?.abort();
    setIsProcessing(false);

    // 取消所有进行中的任务
    setTasks(prev => prev.map(task => ({
      ...task,
      status: task.status === ProcessStatus.PROCESSING
        ? ProcessStatus.CANCELLED
        : task.status
    })));
  }, []);

  // 重试失败的任务
  const retryFailed = useCallback(async (
    images: ImageFile[],
    cropParams: CropParams,
    outputSettings: OutputSettings
  ) => {
    if (isProcessing) return;

    // 重置失败的任务状态
    setTasks(prev => prev.map(task => ({
      ...task,
      status: task.status === ProcessStatus.FAILED
        ? ProcessStatus.PENDING
        : task.status,
      error: task.status === ProcessStatus.FAILED ? undefined : task.error,
      progress: task.status === ProcessStatus.FAILED ? 0 : task.progress,
    })));

    // 重新开始批处理
    await startBatch(images, cropParams, outputSettings);
  }, [isProcessing, startBatch]);

  return {
    tasks,
    isProcessing,
    startBatch,
    pauseBatch,
    cancelBatch,
    retryFailed,
    addError,
  };
}
