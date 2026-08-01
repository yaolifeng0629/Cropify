'use client';

import React from 'react';
import { OutputSettings } from '@/types';
import { Card } from '@/components/ui';

interface QualityControlPanelProps {
  outputSettings: OutputSettings;
  onSettingsChange: (settings: OutputSettings) => void;
}

/**
 * 图像质量控制模块 - JPG/PNG 压缩设置
 */
export const QualityControlPanel: React.FC<QualityControlPanelProps> = ({
  outputSettings,
  onSettingsChange,
}) => {
  const qualityOptionClasses = {
    default: 'text-slate-600 hover:bg-slate-100',
    low: 'bg-rose-600 text-white',
    balanced: 'bg-amber-400 text-[#1f2b29]',
    high: 'bg-emerald-600 text-white',
  };

  // 处理设置变化
  const handleSettingChange = (field: keyof OutputSettings, value: string | number | boolean) => {
    onSettingsChange({
      ...outputSettings,
      [field]: value,
    });
  };

  // 获取文件大小估算
  const getEstimatedSize = () => {
    const baseSize = 1024; // 1KB 基础大小
    const qualityMultiplier = outputSettings.quality / 100;

    switch (outputSettings.format) {
      case 'jpg':
        return Math.round(baseSize * qualityMultiplier * 0.8); // JPG通常更小
      case 'png':
        return Math.round(baseSize * (outputSettings.quality / 9 + 1) * 1.2); // PNG通常更大
      case 'webp':
        return Math.round(baseSize * qualityMultiplier * 0.6); // WebP最小
      default:
        return baseSize;
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">输出</h3>
      <div className="space-y-3">
        {/* 输出格式选择 */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">输出格式</h4>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'jpg', label: 'JPG' },
              { value: 'png', label: 'PNG' },
              { value: 'webp', label: 'WebP' },
            ].map((format) => (
              <button
                key={format.value}
                onClick={() => handleSettingChange('format', format.value as 'jpg' | 'png' | 'webp')}
                className={`flex items-center justify-center min-h-11 p-3 border rounded-lg transition-colors ${
                  outputSettings.format === format.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="text-sm font-medium">{format.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 质量设置 */}
        <div className="pt-3 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {outputSettings.format === 'png' ? '压缩级别' : '输出质量'}
          </h4>

          {/* 质量滑块 */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>
                {outputSettings.format === 'png' ? '压缩级别' : '质量'}
              </span>
              <span>
                {outputSettings.format === 'png'
                  ? `${outputSettings.quality}/9`
                  : `${outputSettings.quality}%`
                }
              </span>
            </div>
            <input
              type="range"
              min={outputSettings.format === 'png' ? 0 : 1}
              max={outputSettings.format === 'png' ? 9 : 100}
              step={1}
              value={outputSettings.quality}
              onChange={(e) => handleSettingChange('quality', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* 质量级别标签 */}
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div className={outputSettings.format === 'png' ? 'hidden' : ''}>
              <button
                onClick={() => handleSettingChange('quality', 60)}
                className={`w-full p-1 rounded ${outputSettings.quality <= 60 ? qualityOptionClasses.low : qualityOptionClasses.default}`}
              >
                低质量
              </button>
            </div>
            <div className={outputSettings.format === 'png' ? 'hidden' : ''}>
              <button
                onClick={() => handleSettingChange('quality', 85)}
                className={`w-full p-1 rounded ${outputSettings.quality > 60 && outputSettings.quality <= 90 ? qualityOptionClasses.balanced : qualityOptionClasses.default}`}
              >
                平衡
              </button>
            </div>
            <div className={outputSettings.format === 'png' ? 'hidden' : ''}>
              <button
                onClick={() => handleSettingChange('quality', 95)}
                className={`w-full p-1 rounded ${outputSettings.quality > 90 ? qualityOptionClasses.high : qualityOptionClasses.default}`}
              >
                高质量
              </button>
            </div>

            {/* PNG压缩级别标签 */}
            <div className={outputSettings.format !== 'png' ? 'hidden' : ''}>
              <button
                onClick={() => handleSettingChange('quality', 0)}
                className={`w-full p-1 rounded ${outputSettings.quality <= 3 ? qualityOptionClasses.high : qualityOptionClasses.default}`}
              >
                快速
              </button>
            </div>
            <div className={outputSettings.format !== 'png' ? 'hidden' : ''}>
              <button
                onClick={() => handleSettingChange('quality', 6)}
                className={`w-full p-1 rounded ${outputSettings.quality > 3 && outputSettings.quality <= 6 ? qualityOptionClasses.balanced : qualityOptionClasses.default}`}
              >
                平衡
              </button>
            </div>
            <div className={outputSettings.format !== 'png' ? 'hidden' : ''}>
              <button
                onClick={() => handleSettingChange('quality', 9)}
                className={`w-full p-1 rounded ${outputSettings.quality > 6 ? qualityOptionClasses.low : qualityOptionClasses.default}`}
              >
                最佳
              </button>
            </div>
          </div>
        </div>

        {/* 文件命名设置 */}
        <div className="pt-3 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">文件命名</h4>

          {/* 保持原文件名 */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={outputSettings.maintainOriginalName || false}
                onChange={(e) => handleSettingChange('maintainOriginalName', e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">保持原文件名</span>
            </label>

            {/* 前缀和后缀 */}
            {!outputSettings.maintainOriginalName && (
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">文件名前缀</label>
                  <input
                    type="text"
                    value={outputSettings.filenamePrefix || ''}
                    onChange={(e) => handleSettingChange('filenamePrefix', e.target.value)}
                    placeholder="例如: cropped_"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">文件名后缀</label>
                  <input
                    type="text"
                    value={outputSettings.filenameSuffix || ''}
                    onChange={(e) => handleSettingChange('filenameSuffix', e.target.value)}
                    placeholder="例如: _small"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 预估信息 */}
        <div className="pt-3 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">输出预估</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>输出格式:</span>
              <span className="font-medium">{outputSettings.format.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>质量设置:</span>
              <span className="font-medium">
                {outputSettings.format === 'png'
                  ? `压缩级别 ${outputSettings.quality}`
                  : `${outputSettings.quality}% 质量`
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>预估文件大小:</span>
              <span className="font-medium">~{getEstimatedSize()}KB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
