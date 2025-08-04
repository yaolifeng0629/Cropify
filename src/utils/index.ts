import { ImageFile, CropParams } from '@/types';

/**
 * 格式化文件大小显示
 * @param bytes 字节数
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 生成唯一ID
 * @returns 唯一标识符
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 获取图片文件的元数据信息
 * @param file 图片文件
 * @returns Promise<ImageFile> 包含元数据的图片文件对象
 */
export async function getImageMetadata(file: File): Promise<ImageFile> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      const imageFile: ImageFile = {
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        width: img.naturalWidth,
        height: img.naturalHeight,
        url,
        lastModified: file.lastModified,
      };
      
      // 尝试获取DPI信息（如果可用）
      // 注: 实际DPI获取需要更复杂的EXIF解析
      resolve(imageFile);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('无法加载图片文件'));
    };
    
    img.src = url;
  });
}

/**
 * 验证文件是否为支持的图片格式
 * @param file 文件对象
 * @param supportedFormats 支持的格式列表
 * @returns boolean
 */
export function isValidImageFile(file: File, supportedFormats: string[]): boolean {
  return supportedFormats.includes(file.type);
}

/**
 * 计算裁剪后的图片尺寸
 * @param originalWidth 原图宽度
 * @param originalHeight 原图高度
 * @param cropParams 裁剪参数
 * @returns 裁剪后的尺寸
 */
export function calculateCroppedSize(
  originalWidth: number,
  originalHeight: number,
  cropParams: CropParams
): { width: number; height: number } {
  const { width, height, rotation = 0 } = cropParams;
  
  // 考虑旋转角度对尺寸的影响
  if (rotation % 180 !== 0) {
    return { width: height, height: width };
  }
  
  return { width, height };
}

/**
 * 限制数值在指定范围内
 * @param value 输入值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的值
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * 计算两个尺寸的比例差异
 * @param width1 第一个宽度
 * @param height1 第一个高度
 * @param width2 第二个宽度
 * @param height2 第二个高度
 * @returns 比例是否相同
 */
export function hasSameAspectRatio(
  width1: number,
  height1: number,
  width2: number,
  height2: number,
  tolerance: number = 0.01
): boolean {
  const ratio1 = width1 / height1;
  const ratio2 = width2 / height2;
  return Math.abs(ratio1 - ratio2) < tolerance;
}

/**
 * 毫米转像素
 * @param mm 毫米值
 * @param dpi DPI值，默认72
 * @returns 像素值
 */
export function mmToPixels(mm: number, dpi: number = 72): number {
  return Math.round((mm * dpi) / 25.4);
}

/**
 * 像素转毫米
 * @param pixels 像素值
 * @param dpi DPI值，默认72
 * @returns 毫米值
 */
export function pixelsToMm(pixels: number, dpi: number = 72): number {
  return (pixels * 25.4) / dpi;
}

// 导出图片处理器
export { ImageProcessor } from './imageProcessor';

// 导出导出工具
export { ExportUtils } from './exportUtils';