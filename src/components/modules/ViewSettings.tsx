'use client';

import React from 'react';
import { GRID_TYPES, ZOOM_LEVELS } from '@/constants';
import { Button, Card } from '@/components/ui';

interface ViewSettingsProps {
  zoom: number;
  showGrid: boolean;
  gridType: '九宫格' | '黄金比例';
  onZoomChange: (zoom: number) => void;
  onGridToggle: (show: boolean) => void;
  onGridTypeChange: (type: '九宫格' | '黄金比例') => void;
}

/**
 * 视图设置组件 - 控制缩放和网格显示
 */
export const ViewSettings: React.FC<ViewSettingsProps> = ({
  zoom,
  showGrid,
  gridType,
  onZoomChange,
  onGridToggle,
  onGridTypeChange,
}) => {
  // 预设缩放级别
  const presetZooms = [0.25, 0.5, 0.75, 1, 1.5, 2];

  return (
    <Card title="视图" className="bg-white">
      <div className="space-y-3">
        {/* 缩放控制 */}
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">缩放</h4>

          {/* 缩放滑块 */}
          <div className="mb-2">
            <input
              type="range"
              min={ZOOM_LEVELS[0]}
              max={ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
              step={0.25}
              value={zoom}
              onChange={(e) => onZoomChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer"
            />
          </div>

          {/* 当前缩放显示 */}
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>{Math.round(zoom * 100)}%</span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onZoomChange(Math.max(ZOOM_LEVELS[0], zoom - 0.25))}
                disabled={zoom <= ZOOM_LEVELS[0]}
                className="h-6 w-6 p-0 text-xs"
              >
                -
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onZoomChange(Math.min(ZOOM_LEVELS[ZOOM_LEVELS.length - 1], zoom + 0.25))}
                disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
                className="h-6 w-6 p-0 text-xs"
              >
                +
              </Button>
            </div>
          </div>

          {/* 预设缩放按钮 */}
          <div className="grid grid-cols-3 gap-1">
            {presetZooms.map((level) => (
              <button
                key={level}
                onClick={() => onZoomChange(level)}
                className={`px-1 py-0.5 text-xs border rounded transition-colors ${
                  Math.abs(zoom - level) < 0.01
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {Math.round(level * 100)}%
              </button>
            ))}
          </div>
        </div>

        {/* 网格设置 */}
        <div className="pt-2 border-t border-gray-200">
          <h4 className="text-xs font-medium text-gray-700 mb-2">网格</h4>

          {/* 网格开关 */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">显示网格</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => onGridToggle(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                showGrid ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  showGrid ? 'transform translate-x-5' : ''
                }`} />
              </div>
            </label>
          </div>

          {/* 网格类型选择 */}
          {showGrid && (
            <div className="space-y-2">
              <span className="text-sm text-gray-600">网格类型</span>
              <div className="grid grid-cols-1 gap-2">
                {GRID_TYPES.map((grid) => (
                  <button
                    key={grid.value}
                    onClick={() => onGridTypeChange(grid.value as any)}
                    className={`flex items-center justify-between p-2 text-sm border rounded-lg transition-colors ${
                      gridType === grid.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span>{grid.name}</span>
                    {gridType === grid.value && (
                      <span className="text-blue-500">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 快速操作 */}
        <div className="pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">快速操作</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onZoomChange(1)}
            >
              适合窗口
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onZoomChange(1);
                onGridToggle(true);
                onGridTypeChange('九宫格');
              }}
            >
              重置视图
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
