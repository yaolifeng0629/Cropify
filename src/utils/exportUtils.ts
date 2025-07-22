import { ProcessTask, OutputSettings } from '@/types';

/**
 * 导出工具函数
 */
export class ExportUtils {
  /**
   * 下载单个文件
   * @param blob 文件数据
   * @param filename 文件名
   */
  static downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * 批量下载文件（逐个）
   * @param tasks 已完成的任务列表
   * @param outputSettings 输出设置
   */
  static async batchDownload(
    tasks: ProcessTask[],
    outputSettings: OutputSettings
  ): Promise<void> {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (!task.processedBlob) continue;

      const filename = this.generateFileName(task, i, outputSettings);
      this.downloadFile(task.processedBlob, filename);
      
      // 添加小延迟，避免浏览器阻止多个下载
      if (i < tasks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  /**
   * 创建 ZIP 文件并下载
   * @param tasks 已完成的任务列表
   * @param outputSettings 输出设置
   */
  static async downloadAsZip(
    tasks: ProcessTask[],
    outputSettings: OutputSettings
  ): Promise<void> {
    // 动态导入 JSZip（需要安装：npm install jszip）
    const JSZip = (await import('jszip')).default;
    
    const zip = new JSZip();
    
    // 添加每个文件到 ZIP
    tasks.forEach((task, index) => {
      if (!task.processedBlob) return;
      
      const filename = this.generateFileName(task, index, outputSettings);
      zip.file(filename, task.processedBlob);
    });

    // 生成 ZIP 文件
    const zipBlob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    // 下载 ZIP 文件
    const zipFilename = `cropify_batch_${new Date().toISOString().split('T')[0]}.zip`;
    this.downloadFile(zipBlob, zipFilename);
  }

  /**
   * 生成文件名
   * @param task 处理任务
   * @param index 索引
   * @param outputSettings 输出设置
   * @param originalName 原始文件名（可选）
   */
  static generateFileName(
    task: ProcessTask,
    index: number,
    outputSettings: OutputSettings,
    originalName?: string
  ): string {
    if (outputSettings.maintainOriginalName && originalName) {
      // 保持原文件名，只改扩展名
      const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
      return `${nameWithoutExt}.${outputSettings.format}`;
    }

    // 自定义文件名
    const prefix = outputSettings.filenamePrefix || '';
    const suffix = outputSettings.filenameSuffix || '';
    const number = String(index + 1).padStart(3, '0');
    
    return `${prefix}image_${number}${suffix}.${outputSettings.format}`;
  }

  /**
   * 预览图片（在新标签页打开）
   * @param task 处理任务
   */
  static previewImage(task: ProcessTask): void {
    if (task.processedUrl) {
      window.open(task.processedUrl, '_blank');
    }
  }

  /**
   * 复制图片到剪贴板
   * @param task 处理任务
   */
  static async copyToClipboard(task: ProcessTask): Promise<boolean> {
    try {
      if (!task.processedBlob) return false;

      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({
          [task.processedBlob.type]: task.processedBlob
        });
        await navigator.clipboard.write([item]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('复制到剪贴板失败:', error);
      return false;
    }
  }

  /**
   * 计算所有任务的统计信息
   * @param tasks 任务列表
   */
  static calculateStats(tasks: ProcessTask[]) {
    const completed = tasks.filter(t => t.status === 'completed');
    const totalSize = completed.reduce((sum, task) => 
      sum + (task.processedBlob?.size || 0), 0
    );
    
    return {
      completedCount: completed.length,
      totalCount: tasks.length,
      totalSize,
      averageSize: completed.length > 0 ? totalSize / completed.length : 0,
    };
  }
}