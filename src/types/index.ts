// 图片文件类型定义
export interface ImageFile {
  id: string;
  file: File;
  name: string;
  size: number; // 文件大小（字节）
  type: string; // MIME类型
  width: number; // 图片宽度
  height: number; // 图片高度
  url: string; // 预览URL
  dpi?: number; // DPI信息
  colorMode?: string; // 色彩模式
  lastModified: number;
}

// 裁剪参数定义
export interface CropParams {
  width: number;
  height: number;
  x: number; // 裁剪起始x坐标
  y: number; // 裁剪起始y坐标
  rotation?: number; // 旋转角度
  flipHorizontal?: boolean; // 水平翻转
  flipVertical?: boolean; // 垂直翻转
  borderRadius?: number; // 圆角半径
  maintainAspectRatio?: boolean; // 保持宽高比
}

// 裁剪基准点枚举
export enum CropAnchor {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center', 
  TOP_RIGHT = 'top-right',
  MIDDLE_LEFT = 'middle-left',
  MIDDLE_CENTER = 'middle-center',
  MIDDLE_RIGHT = 'middle-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right'
}

// 预设尺寸定义
export interface PresetSize {
  name: string;
  width: number;
  height: number;
  unit: 'px' | 'mm';
  category: '照片' | '社交媒体' | '打印' | '壁纸' | '电商';
}

// 输出格式设置
export interface OutputSettings {
  format: 'jpg' | 'png' | 'webp';
  quality: number; // 1-100 for JPG, 0-9 for PNG
  maintainOriginalName?: boolean;
  filenamePrefix?: string;
  filenameSuffix?: string;
}

// 批处理状态
export enum ProcessStatus {
  PENDING = 'pending',
  PROCESSING = 'processing', 
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// 批处理任务
export interface ProcessTask {
  id: string;
  imageId: string;
  status: ProcessStatus;
  progress: number; // 0-100
  cropParams: CropParams;
  outputSettings: OutputSettings;
  error?: string;
  processedUrl?: string; // 处理后的图片URL
  processedBlob?: Blob;
}

// 批处理概览
export interface BatchSummary {
  totalCount: number;
  completedCount: number;
  failedCount: number;
  pendingCount: number;
  processingCount: number;
  totalSize: number; // 总文件大小
  estimatedTime?: number; // 预估完成时间（秒）
}

// 应用设置
export interface AppSettings {
  maxBatchSize: number; // 最大批处理数量
  maxFileSize: number; // 单文件最大大小（MB）
  defaultOutputFormat: 'jpg' | 'png' | 'webp';
  defaultQuality: number;
  showGrid: boolean; // 显示网格辅助线
  gridType: '九宫格' | '黄金比例';
  theme: 'light' | 'dark';
}

// 错误类型
export interface AppError {
  id: string;
  type: 'upload' | 'processing' | 'export' | 'system';
  message: string;
  details?: string;
  timestamp: number;
}