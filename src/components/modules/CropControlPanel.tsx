'use client';

import React, { useState } from 'react';
import { ImageFile, CropParams, CropAnchor } from '@/types';
import { PRESET_SIZES, PRESET_RATIOS } from '@/constants';
import { Button, Card } from '@/components/ui';

interface CropControlPanelProps {
  selectedImage: ImageFile | null;
  cropParams: CropParams;
  onCropChange: (params: CropParams) => void;
  onApplyCropAnchor: (anchor: CropAnchor, image: ImageFile) => void;
  onApplyPresetSize: (presetName: string, image: ImageFile) => void;
  onReset: (image?: ImageFile | null) => void;
}

/**
 * 裁剪控制面板组件 - 智能裁剪系统
 */
export const CropControlPanel: React.FC<CropControlPanelProps> = ({
  selectedImage,
  cropParams,
  onCropChange,
  onApplyCropAnchor,
  onApplyPresetSize,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'presets'>('manual');
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  // 处理数值输入变化
  const handleValueChange = (field: keyof CropParams, value: number | boolean) => {
    onCropChange({
      ...cropParams,
      [field]: value,
    });
  };

  // 裁剪基准点选项
  const cropAnchors = [
    { value: CropAnchor.TOP_LEFT, label: '左上', icon: '↖' },
    { value: CropAnchor.TOP_CENTER, label: '上中', icon: '↑' },
    { value: CropAnchor.TOP_RIGHT, label: '右上', icon: '↗' },
    { value: CropAnchor.MIDDLE_LEFT, label: '左中', icon: '←' },
    { value: CropAnchor.MIDDLE_CENTER, label: '居中', icon: '●' },
    { value: CropAnchor.MIDDLE_RIGHT, label: '右中', icon: '→' },
    { value: CropAnchor.BOTTOM_LEFT, label: '左下', icon: '↙' },
    { value: CropAnchor.BOTTOM_CENTER, label: '下中', icon: '↓' },
    { value: CropAnchor.BOTTOM_RIGHT, label: '右下', icon: '↘' },
  ];

  // 按类别分组的预设尺寸
  const groupedPresets = PRESET_SIZES.reduce((acc, preset) => {
    if (!acc[preset.category]) {
      acc[preset.category] = [];
    }
    acc[preset.category].push(preset);
    return acc;
  }, {} as Record<string, typeof PRESET_SIZES>);

  // 创建下拉菜单选项：预设尺寸 + 预设比例
  const dropdownOptions = [
    { type: 'header', label: '预设尺寸', value: '' },
    ...Object.entries(groupedPresets).flatMap(([category, presets]) => [
      { type: 'category', label: category, value: '' },
      ...presets.map(preset => ({
        type: 'preset',
        label: `${preset.name} (${preset.width} × ${preset.height} ${preset.unit})`,
        value: `preset_${preset.name}`,
        preset
      }))
    ]),
    { type: 'header', label: '预设比例', value: '' },
    ...PRESET_RATIOS.map(ratio => ({
      type: 'ratio',
      label: `${ratio.name} (${ratio.ratio})`,
      value: `ratio_${ratio.name}`,
      ratio
    }))
  ];

  // 处理下拉菜单选择
  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);

    if (!selectedImage) return;

    if (value.startsWith('preset_')) {
      const presetName = value.replace('preset_', '');
      onApplyPresetSize(presetName, selectedImage);
    } else if (value.startsWith('ratio_')) {
      const ratioName = value.replace('ratio_', '');
      const ratio = PRESET_RATIOS.find(r => r.name === ratioName);
      if (ratio) {
        const newHeight = cropParams.width / ratio.value;
        const maxHeight = selectedImage.height - cropParams.y;
        const finalHeight = Math.min(newHeight, maxHeight);

        onCropChange({
          ...cropParams,
          height: finalHeight,
          maintainAspectRatio: true,
        });
      }
    }
  };

  if (!selectedImage) {
    return (
      <Card title="裁剪设置" className="bg-white">
        <div className="text-center py-4 text-gray-500 text-sm">
          <p>请选择图片</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="裁剪设置" className="bg-white">
      <div className="space-y-4">
        {/* 选项卡导航 */}
        <div className="flex space-x-1 bg-gray-100 rounded p-0.5">
          {[
            { key: 'manual', label: '手动' },
            { key: 'presets', label: '预设/比例' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-2 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 手动设置选项卡 */}
        {activeTab === 'manual' && (
          <div className="space-y-3">
            {/* 尺寸设置 */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  宽度
                </label>
                <input
                  type="number"
                  value={Math.round(cropParams.width)}
                  onChange={(e) => handleValueChange('width', parseInt(e.target.value) || 0)}
                  min={10}
                  max={selectedImage.width}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  高度
                </label>
                <input
                  type="number"
                  value={Math.round(cropParams.height)}
                  onChange={(e) => handleValueChange('height', parseInt(e.target.value) || 0)}
                  min={10}
                  max={selectedImage.height}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 位置设置 */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  X 坐标
                </label>
                <input
                  type="number"
                  value={Math.round(cropParams.x)}
                  onChange={(e) => handleValueChange('x', parseInt(e.target.value) || 0)}
                  min={0}
                  max={selectedImage.width - cropParams.width}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Y 坐标
                </label>
                <input
                  type="number"
                  value={Math.round(cropParams.y)}
                  onChange={(e) => handleValueChange('y', parseInt(e.target.value) || 0)}
                  min={0}
                  max={selectedImage.height - cropParams.height}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 约束选项 */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={cropParams.maintainAspectRatio || false}
                  onChange={(e) => handleValueChange('maintainAspectRatio', e.target.checked)}
                  className="mr-2 h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-xs text-gray-700">保持宽高比</span>
              </label>
            </div>
          </div>
        )}

        {/* 预设尺寸和比例选项卡 */}
        {activeTab === 'presets' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                选择预设尺寸或比例
              </label>
              <select
                value={selectedPreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">请选择...</option>

                {/* 预设尺寸分组 */}
                <optgroup label="预设尺寸">
                  {Object.entries(groupedPresets).map(([category, presets]) => (
                    <React.Fragment key={category}>
                      <option disabled className="font-medium text-gray-900">
                        ── {category} ──
                      </option>
                      {presets.map((preset) => (
                        <option
                          key={preset.name}
                          value={`preset_${preset.name}`}
                        >
                          {preset.name} ({preset.width} × {preset.height} {preset.unit})
                        </option>
                      ))}
                    </React.Fragment>
                  ))}
                </optgroup>

                {/* 预设比例分组 */}
                <optgroup label="预设比例">
                  {PRESET_RATIOS.map((ratio) => (
                    <option
                      key={ratio.name}
                      value={`ratio_${ratio.name}`}
                    >
                      {ratio.name} ({ratio.ratio})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* 当前选择的信息显示 */}
            {selectedPreset && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-xs text-blue-800">
                  {selectedPreset.startsWith('preset_') && (
                    <div>
                      <span className="font-medium">已选择预设尺寸：</span>
                      {selectedPreset.replace('preset_', '')}
                    </div>
                  )}
                  {selectedPreset.startsWith('ratio_') && (
                    <div>
                      <span className="font-medium">已选择预设比例：</span>
                      {selectedPreset.replace('ratio_', '')}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 裁剪基准点 */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">裁剪基准点</h4>
          <div className="grid grid-cols-3 gap-2">
            {cropAnchors.map((anchor) => (
              <button
                key={anchor.value}
                onClick={() => onApplyCropAnchor(anchor.value, selectedImage)}
                className="flex flex-col items-center justify-center p-2 text-xs border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                title={anchor.label}
              >
                <span className="text-lg mb-1">{anchor.icon}</span>
                <span className="text-gray-600">{anchor.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="pt-4 border-t border-gray-200 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReset(selectedImage)}
            className="flex-1"
          >
            重置
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              // 应用到中心位置
              onApplyCropAnchor(CropAnchor.MIDDLE_CENTER, selectedImage);
            }}
            className="flex-1"
          >
            居中
          </Button>
        </div>

        {/* 当前参数信息 */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">当前参数</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>裁剪尺寸:</span>
              <span>{Math.round(cropParams.width)} × {Math.round(cropParams.height)} px</span>
            </div>
            <div className="flex justify-between">
              <span>宽高比:</span>
              <span>{(cropParams.width / cropParams.height).toFixed(2)}:1</span>
            </div>
            <div className="flex justify-between">
              <span>裁剪比例:</span>
              <span>
                {Math.round((cropParams.width * cropParams.height) / (selectedImage.width * selectedImage.height) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
