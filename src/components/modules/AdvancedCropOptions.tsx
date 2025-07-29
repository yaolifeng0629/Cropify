'use client';

import React, { useState } from 'react';
import { CropParams } from '@/types';
import { Button, Card } from '@/components/ui';

interface AdvancedCropOptionsProps {
  cropParams: CropParams;
  onCropChange: (params: CropParams) => void;
}

/**
 * 高级裁剪选项组件 - 旋转、翻转、圆角裁剪
 */
export const AdvancedCropOptions: React.FC<AdvancedCropOptionsProps> = ({
  cropParams,
  onCropChange,
}) => {
  const [rotationInput, setRotationInput] = useState(cropParams.rotation || 0);

  // 处理参数变化
  const handleParamChange = (field: keyof CropParams, value: number | boolean) => {
    onCropChange({
      ...cropParams,
      [field]: value,
    });
  };

  // 快速旋转
  const quickRotate = (degrees: number) => {
    const newRotation = ((cropParams.rotation || 0) + degrees) % 360;
    setRotationInput(newRotation);
    handleParamChange('rotation', newRotation);
  };

  // 处理旋转角度输入
  const handleRotationChange = (value: number) => {
    setRotationInput(value);
    handleParamChange('rotation', value % 360);
  };

  // 重置所有高级选项
  const resetAdvanced = () => {
    setRotationInput(0);
    onCropChange({
      ...cropParams,
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
      borderRadius: 0,
    });
  };

  return (
    <Card title="高级裁剪选项" className="bg-white">
      <div className="space-y-6">
        {/* 旋转控制 */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">旋转</h4>

          {/* 旋转滑块 */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>角度</span>
              <span>{Math.round(rotationInput)}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotationInput}
              onChange={(e) => handleRotationChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* 精确角度输入 */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={Math.round(rotationInput)}
                onChange={(e) => handleRotationChange(parseInt(e.target.value) || 0)}
                min={0}
                max={360}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="角度"
              />
              <span className="text-sm text-gray-500">度</span>
            </div>
          </div>

          {/* 快速旋转按钮 */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickRotate(90)}
              title="顺时针旋转90°"
            >
              <span className="text-lg">↻</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickRotate(-90)}
              title="逆时针旋转90°"
            >
              <span className="text-lg">↺</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickRotate(180)}
              title="旋转180°"
            >
              180°
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotationChange(0)}
              title="重置旋转"
            >
              0°
            </Button>
          </div>
        </div>

        {/* 翻转控制 */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">翻转</h4>

          <div className="grid grid-cols-2 gap-3">
            {/* 水平翻转 */}
            <button
              onClick={() => handleParamChange('flipHorizontal', !cropParams.flipHorizontal)}
              className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                cropParams.flipHorizontal
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-center">
                <div className="text-lg mb-1">⟷</div>
                <div className="text-xs">水平翻转</div>
              </div>
            </button>

            {/* 垂直翻转 */}
            <button
              onClick={() => handleParamChange('flipVertical', !cropParams.flipVertical)}
              className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                cropParams.flipVertical
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-center">
                <div className="text-lg mb-1">⥁</div>
                <div className="text-xs">垂直翻转</div>
              </div>
            </button>
          </div>
        </div>

        {/* 圆角设置 */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">圆角</h4>

          {/* 圆角滑块 */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>圆角半径</span>
              <span>{Math.round(cropParams.borderRadius || 0)}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.min(cropParams.width, cropParams.height) / 2}
              step={1}
              value={cropParams.borderRadius || 0}
              onChange={(e) => handleParamChange('borderRadius', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* 精确圆角输入 */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={Math.round(cropParams.borderRadius || 0)}
                onChange={(e) => handleParamChange('borderRadius', parseInt(e.target.value) || 0)}
                min={0}
                max={Math.min(cropParams.width, cropParams.height) / 2}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="半径"
              />
              <span className="text-sm text-gray-500">px</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
