'use client';

import { useState, useCallback } from 'react';

interface UseViewSettingsReturn {
  zoom: number;
  showGrid: boolean;
  gridType: '九宫格' | '黄金比例';
  setZoom: (zoom: number) => void;
  setShowGrid: (show: boolean) => void;
  setGridType: (type: '九宫格' | '黄金比例') => void;
  resetView: () => void;
}

/**
 * 视图设置管理 Hook
 */
export function useViewSettings(): UseViewSettingsReturn {
  const [zoom, setZoomState] = useState(1);
  const [showGrid, setShowGridState] = useState(true);
  const [gridType, setGridTypeState] = useState<'九宫格' | '黄金比例'>('九宫格');

  // 设置缩放级别
  const setZoom = useCallback((newZoom: number) => {
    setZoomState(newZoom);
  }, []);

  // 设置网格显示
  const setShowGrid = useCallback((show: boolean) => {
    setShowGridState(show);
  }, []);

  // 设置网格类型
  const setGridType = useCallback((type: '九宫格' | '黄金比例') => {
    setGridTypeState(type);
  }, []);

  // 重置视图设置
  const resetView = useCallback(() => {
    setZoomState(1);
    setShowGridState(true);
    setGridTypeState('九宫格');
  }, []);

  return {
    zoom,
    showGrid,
    gridType,
    setZoom,
    setShowGrid,
    setGridType,
    resetView,
  };
}