'use client';

import React from 'react';
import { GRID_TYPES } from '@/constants';

interface ViewSettingsProps {
  zoom: number;
  showGrid: boolean;
  gridType: '九宫格' | '黄金比例';
  onZoomChange: (zoom: number) => void;
  onGridToggle: (show: boolean) => void;
  onGridTypeChange: (type: '九宫格' | '黄金比例') => void;
}

/**
 * 视图设置组件 - 控制网格显示
 */
export const ViewSettings: React.FC<ViewSettingsProps> = ({
  showGrid,
  gridType,
  onGridToggle,
  onGridTypeChange,
}) => {
  return (
    <div>
      <div className="space-y-3">
        {/* 网格设置 */}
        <div>
          {/* 网格开关 */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-ink-muted">显示网格</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => onGridToggle(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                showGrid ? 'bg-brand' : 'bg-line-strong'
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
              <span className="text-sm text-ink-muted">网格类型</span>
              <div className="grid grid-cols-1 gap-2">
                {GRID_TYPES.map((grid) => (
                  <button
                    key={grid.value}
                    onClick={() => onGridTypeChange(grid.value as '九宫格' | '黄金比例')}
                    className={`flex items-center justify-between p-2 text-sm border rounded-lg transition-colors ${
                      gridType === grid.value
                        ? 'border-crop bg-crop-tint text-crop-hover'
                        : 'border-line hover:border-line-strong'
                    }`}
                  >
                    <span>{grid.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
