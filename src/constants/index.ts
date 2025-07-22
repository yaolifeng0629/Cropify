import { PresetSize } from '@/types';

// 应用配置常量
export const APP_CONFIG = {
  MAX_BATCH_SIZE: 50, // 默认最大批处理数量
  MAX_BATCH_SIZE_LIMIT: 100, // 最大批处理数量上限
  MAX_FILE_SIZE: 10, // 单文件最大大小（MB）
  SUPPORTED_INPUT_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff', 'image/gif'] as string[],
  SUPPORTED_OUTPUT_FORMATS: ['jpg', 'png', 'webp'],
  DEFAULT_QUALITY: 85,
  CANVAS_MAX_SIZE: 4096, // Canvas最大尺寸限制
} as const;

// 预设尺寸配置
export const PRESET_SIZES: PresetSize[] = [
  // 证件照尺寸
  { name: '一寸照', width: 25, height: 35, unit: 'mm', category: '照片' },
  { name: '二寸照', width: 35, height: 49, unit: 'mm', category: '照片' },
  { name: '身份证照', width: 26, height: 32, unit: 'mm', category: '照片' },
  
  // 社交媒体尺寸
  { name: '公众号首图', width: 900, height: 833, unit: 'px', category: '社交媒体' },
  { name: '公众号次图', width: 200, height: 200, unit: 'px', category: '社交媒体' },
  { name: '公众号双图', width: 1100, height: 1033, unit: 'px', category: '社交媒体' },
  { name: '朋友圈封面', width: 1080, height: 1080, unit: 'px', category: '社交媒体' },
  
  // 壁纸尺寸
  { name: '电脑壁纸', width: 1920, height: 1080, unit: 'px', category: '壁纸' },
  { name: '方图', width: 800, height: 800, unit: 'px', category: '壁纸' },
  { name: '竖图', width: 800, height: 1200, unit: 'px', category: '壁纸' },
  
  // 打印尺寸
  { name: 'A4纸', width: 210, height: 297, unit: 'mm', category: '打印' },
];

// 预设比例配置
export const PRESET_RATIOS = [
  { name: '方图', ratio: '1:1', value: 1 },
  { name: '媒体主图', ratio: '4:3', value: 4/3 },
  { name: '封面(横)', ratio: '16:9', value: 16/9 },
  { name: '封面(竖)', ratio: '9:16', value: 9/16 },
  { name: '单反相机(横)', ratio: '3:2', value: 3/2 },
  { name: '单反相机(竖)', ratio: '2:3', value: 2/3 },
  { name: '电商主图', ratio: '3:4', value: 3/4 },
] as const;

// 网格类型配置
export const GRID_TYPES = [
  { name: '九宫格', value: '九宫格' },
  { name: '黄金比例', value: '黄金比例' },
] as const;

// 缩放级别配置
export const ZOOM_LEVELS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

// 错误信息配置
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: (maxSize: number) => `文件大小超过 ${maxSize}MB 限制`,
  UNSUPPORTED_FORMAT: '不支持的文件格式',
  BATCH_SIZE_EXCEEDED: (maxSize: number) => `批处理数量不能超过 ${maxSize} 张`,
  PROCESSING_FAILED: '图片处理失败',
  UPLOAD_FAILED: '文件上传失败',
  EXPORT_FAILED: '导出失败',
  CANVAS_SIZE_EXCEEDED: '图片尺寸过大，无法处理',
  INSUFFICIENT_MEMORY: '内存不足，请减少批处理数量',
} as const;