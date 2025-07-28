'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ImageFile, CropParams, CropAnchor } from '@/types';
import { ZOOM_LEVELS } from '@/constants';
import { Button } from '@/components/ui';
import { clamp, throttle } from '@/utils';

interface PreviewSystemProps {
  selectedImage: ImageFile | null;
  cropParams: CropParams;
  onCropChange: (params: CropParams) => void;
  zoom?: number;
  showGrid?: boolean;
  gridType?: '九宫格' | '黄金比例';
  onZoomChange?: (zoom: number) => void;
}

/**
 * 实时预览系统组件 - 显示裁剪前后对比视图
 */
export const PreviewSystem: React.FC<PreviewSystemProps> = ({
  selectedImage,
  cropParams,
  onCropChange,
  zoom: externalZoom,
  showGrid = true,
  gridType = '九宫格',
  onZoomChange,
}) => {
  const [internalZoom, setInternalZoom] = useState(1);
  const zoom = externalZoom !== undefined ? externalZoom : internalZoom;
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string>('');
  const [isHovering, setIsHovering] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  // 计算显示尺寸
  const getDisplaySize = useCallback(() => {
    if (!selectedImage) return { width: 0, height: 0 };

    const containerWidth = containerRef.current?.clientWidth || 400;
    const containerHeight = containerRef.current?.clientHeight || 300;

    // 计算适合容器的尺寸
    const imageAspect = selectedImage.width / selectedImage.height;
    const containerAspect = containerWidth / containerHeight;

    let displayWidth, displayHeight;

    if (imageAspect > containerAspect) {
      displayWidth = Math.min(containerWidth * 0.9, selectedImage.width);
      displayHeight = displayWidth / imageAspect;
    } else {
      displayHeight = Math.min(containerHeight * 0.9, selectedImage.height);
      displayWidth = displayHeight * imageAspect;
    }

    return {
      width: displayWidth * zoom,
      height: displayHeight * zoom,
    };
  }, [selectedImage, zoom]);

  // 处理缩放变化
  const handleZoomChange = (newZoom: number) => {
    const clampedZoom = clamp(newZoom, ZOOM_LEVELS[0], ZOOM_LEVELS[ZOOM_LEVELS.length - 1]);
    if (onZoomChange) {
      onZoomChange(clampedZoom);
    } else {
      setInternalZoom(clampedZoom);
    }
  };

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault();
            handleZoomChange(zoom + 0.25);
            break;
          case '-':
            e.preventDefault();
            handleZoomChange(zoom - 0.25);
            break;
          case '0':
            e.preventDefault();
            handleZoomChange(1);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoom]);

  // 处理鼠标按下事件
  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize', handle?: string) => {
    e.preventDefault();

    if (!selectedImage) return;

    const { width: displayWidth, height: displayHeight } = getDisplaySize();
    const scaleX = displayWidth / selectedImage.width;
    const scaleY = displayHeight / selectedImage.height;

    if (action === 'drag') {
      setIsDragging(true);
      // 计算鼠标相对于裁剪框的偏移
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const cropBoxLeft = cropParams.x * scaleX;
        const cropBoxTop = cropParams.y * scaleY;

        dragOffsetRef.current = {
          x: mouseX - cropBoxLeft,
          y: mouseY - cropBoxTop
        };
      }
    } else if (action === 'resize' && handle) {
      setIsResizing(true);
      setResizeHandle(handle);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // 优化的鼠标移动处理函数
  const handleMouseMoveInternal = useCallback((e: MouseEvent) => {
    if (!selectedImage) return;

    const { width: displayWidth, height: displayHeight } = getDisplaySize();
    const scaleX = displayWidth / selectedImage.width;
    const scaleY = displayHeight / selectedImage.height;

    if (isDragging) {
      // 获取容器位置
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // 计算鼠标在容器中的位置
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // 计算新的裁剪框位置（在原图坐标系中）
      const newX = clamp(
        (mouseX - dragOffsetRef.current.x) / scaleX,
        0,
        selectedImage.width - cropParams.width
      );
      const newY = clamp(
        (mouseY - dragOffsetRef.current.y) / scaleY,
        0,
        selectedImage.height - cropParams.height
      );

      onCropChange({
        ...cropParams,
        x: newX,
        y: newY,
      });
    } else if (isResizing) {
      const deltaX = (e.clientX - dragStart.x) / scaleX;
      const deltaY = (e.clientY - dragStart.y) / scaleY;

      let newWidth = cropParams.width;
      let newHeight = cropParams.height;
      let newX = cropParams.x;
      let newY = cropParams.y;

      // 根据拖拽手柄调整尺寸
      switch (resizeHandle) {
        case 'se': // 右下角
          newWidth = clamp(cropParams.width + deltaX, 50, selectedImage.width - cropParams.x);
          newHeight = clamp(cropParams.height + deltaY, 50, selectedImage.height - cropParams.y);
          break;
        case 'sw': // 左下角
          newWidth = clamp(cropParams.width - deltaX, 50, cropParams.x + cropParams.width);
          newHeight = clamp(cropParams.height + deltaY, 50, selectedImage.height - cropParams.y);
          newX = cropParams.x + cropParams.width - newWidth;
          break;
        case 'ne': // 右上角
          newWidth = clamp(cropParams.width + deltaX, 50, selectedImage.width - cropParams.x);
          newHeight = clamp(cropParams.height - deltaY, 50, cropParams.y + cropParams.height);
          newY = cropParams.y + cropParams.height - newHeight;
          break;
        case 'nw': // 左上角
          newWidth = clamp(cropParams.width - deltaX, 50, cropParams.x + cropParams.width);
          newHeight = clamp(cropParams.height - deltaY, 50, cropParams.y + cropParams.height);
          newX = cropParams.x + cropParams.width - newWidth;
          newY = cropParams.y + cropParams.height - newHeight;
          break;
        case 'n': // 上边
          newHeight = clamp(cropParams.height - deltaY, 50, cropParams.y + cropParams.height);
          newY = cropParams.y + cropParams.height - newHeight;
          break;
        case 's': // 下边
          newHeight = clamp(cropParams.height + deltaY, 50, selectedImage.height - cropParams.y);
          break;
        case 'w': // 左边
          newWidth = clamp(cropParams.width - deltaX, 50, cropParams.x + cropParams.width);
          newX = cropParams.x + cropParams.width - newWidth;
          break;
        case 'e': // 右边
          newWidth = clamp(cropParams.width + deltaX, 50, selectedImage.width - cropParams.x);
          break;
      }

      // 如果保持宽高比
      if (cropParams.maintainAspectRatio) {
        const aspectRatio = cropParams.width / cropParams.height;
        if (resizeHandle.includes('e') || resizeHandle.includes('w')) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }

      onCropChange({
        ...cropParams,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, isResizing, dragStart, cropParams, selectedImage, resizeHandle, onCropChange, getDisplaySize]);

  // 使用节流优化性能
  const handleMouseMove = useMemo(
    () => throttle(handleMouseMoveInternal, 16), // 约60fps
    [handleMouseMoveInternal]
  );

  // 处理鼠标松开事件
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle('');
  }, []);

  // 绑定全局鼠标事件
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  // 渲染网格辅助线
  const renderGrid = () => {
    if (!showGrid || !selectedImage) return null;

    const { width: displayWidth, height: displayHeight } = getDisplaySize();

    if (gridType === '九宫格') {
      return (
        <svg
          className="grid-overlay pointer-events-none absolute inset-0"
          width={displayWidth}
          height={displayHeight}
        >
          {/* 垂直线 */}
          <line x1={displayWidth / 3} y1={0} x2={displayWidth / 3} y2={displayHeight} className="grid-lines" />
          <line x1={(displayWidth / 3) * 2} y1={0} x2={(displayWidth / 3) * 2} y2={displayHeight} className="grid-lines" />
          {/* 水平线 */}
          <line x1={0} y1={displayHeight / 3} x2={displayWidth} y2={displayHeight / 3} className="grid-lines" />
          <line x1={0} y1={(displayHeight / 3) * 2} x2={displayWidth} y2={(displayHeight / 3) * 2} className="grid-lines" />
        </svg>
      );
    } else if (gridType === '黄金比例') {
      const goldenRatio = 0.618;
      return (
        <svg
          className="grid-overlay pointer-events-none absolute inset-0"
          width={displayWidth}
          height={displayHeight}
        >
          {/* 黄金比例线 */}
          <line x1={displayWidth * goldenRatio} y1={0} x2={displayWidth * goldenRatio} y2={displayHeight} className="grid-lines" />
          <line x1={displayWidth * (1 - goldenRatio)} y1={0} x2={displayWidth * (1 - goldenRatio)} y2={displayHeight} className="grid-lines" />
          <line x1={0} y1={displayHeight * goldenRatio} x2={displayWidth} y2={displayHeight * goldenRatio} className="grid-lines" />
          <line x1={0} y1={displayHeight * (1 - goldenRatio)} x2={displayWidth} y2={displayHeight * (1 - goldenRatio)} className="grid-lines" />
        </svg>
      );
    }

    return null;
  };



  // 处理中心点扩展
  const handleCenterExpansion = useCallback((amount: number = 20) => {
    if (!selectedImage) return;

    const expandX = Math.min(amount, cropParams.x, selectedImage.width - cropParams.x - cropParams.width);
    const expandY = Math.min(amount, cropParams.y, selectedImage.height - cropParams.y - cropParams.height);

    const newParams = {
      ...cropParams,
      x: cropParams.x - expandX,
      y: cropParams.y - expandY,
      width: cropParams.width + expandX * 2,
      height: cropParams.height + expandY * 2,
    };

    onCropChange(newParams);
  }, [cropParams, selectedImage, onCropChange]);

  // 渲染裁剪框
  const renderCropBox = () => {
    if (!selectedImage) return null;

    const { width: displayWidth, height: displayHeight } = getDisplaySize();
    const scaleX = displayWidth / selectedImage.width;
    const scaleY = displayHeight / selectedImage.height;

    const cropBoxStyle = {
      left: cropParams.x * scaleX,
      top: cropParams.y * scaleY,
      width: cropParams.width * scaleX,
      height: cropParams.height * scaleY,
    };

    return (
      <div
        className="crop-selection absolute"
        style={cropBoxStyle}
        onMouseDown={(e) => handleMouseDown(e, 'drag')}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* 角落调整手柄 */}
        <div
          className="crop-handle corner-handle"
          style={{ top: -6, left: -6, cursor: 'nw-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'nw'); }}
        />
        <div
          className="crop-handle corner-handle"
          style={{ top: -6, right: -6, cursor: 'ne-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'ne'); }}
        />
        <div
          className="crop-handle corner-handle"
          style={{ bottom: -6, left: -6, cursor: 'sw-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'sw'); }}
        />
        <div
          className="crop-handle corner-handle"
          style={{ bottom: -6, right: -6, cursor: 'se-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'se'); }}
        />

        {/* 边缘箭头（鼠标划入时淡入显示） */}
        <div
          className={`edge-arrow edge-arrow-top ${isHovering ? 'visible' : ''}`}
          style={{ top: -10, left: '50%', transform: 'translateX(-50%)', cursor: 'n-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'n'); }}
          title="向上调整"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2l4 4H9v6H7V6H4l4-4z"/>
          </svg>
        </div>
        <div
          className={`edge-arrow edge-arrow-bottom ${isHovering ? 'visible' : ''}`}
          style={{ bottom: -10, left: '50%', transform: 'translateX(-50%)', cursor: 's-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 's'); }}
          title="向下调整"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 14l-4-4h3V4h2v6h3l-4 4z"/>
          </svg>
        </div>
        <div
          className={`edge-arrow edge-arrow-left ${isHovering ? 'visible' : ''}`}
          style={{ left: -10, top: '50%', transform: 'translateY(-50%)', cursor: 'w-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'w'); }}
          title="向左调整"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 8l4-4v3h6v2H6v3l-4-4z"/>
          </svg>
        </div>
        <div
          className={`edge-arrow edge-arrow-right ${isHovering ? 'visible' : ''}`}
          style={{ right: -10, top: '50%', transform: 'translateY(-50%)', cursor: 'e-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'e'); }}
          title="向右调整"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 8l-4 4V9H4V7h6V4l4 4z"/>
          </svg>
        </div>

        {/* 中心点（鼠标划入时显示实心圆点） */}
        <div
          className={`center-point ${isHovering ? 'visible' : ''}`}
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          onClick={() => handleCenterExpansion()}
          title="全方向扩展"
        />
      </div>
    );
  };

  if (!selectedImage) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="text-gray-500 text-center">
          <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p>请选择图片开始预览</p>
        </div>
      </div>
    );
  }

  const { width: displayWidth, height: displayHeight } = getDisplaySize();

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* 工具栏 */}
      <div className="flex-shrink-0 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">实时预览</h3>

        {/* 缩放控制 */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoomChange(zoom - 0.25)}
            disabled={zoom <= ZOOM_LEVELS[0]}
            className="h-6 w-6 p-0"
          >
            -
          </Button>
          <span className="text-xs text-gray-600 min-w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoomChange(zoom + 0.25)}
            disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
            className="h-6 w-6 p-0"
          >
            +
          </Button>
        </div>
      </div>

      {/* 预览区域 */}
      <div
        ref={containerRef}
        className="flex-1 relative p-2 bg-gray-50 overflow-auto min-h-0"
      >
        <div className="relative mx-auto image-container" style={{ width: displayWidth, height: displayHeight }}>
          {/* 原图 */}
          <img
            ref={imageRef}
            src={selectedImage.url}
            alt={selectedImage.name}
            className="w-full h-full object-contain select-none"
            draggable={false}
            style={{ width: displayWidth, height: displayHeight }}
          />

          {/* 网格辅助线 */}
          {renderGrid()}

          {/* 裁剪框 */}
          {renderCropBox()}
        </div>
      </div>
    </div>
  );
};
