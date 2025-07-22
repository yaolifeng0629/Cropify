'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ImageFile, CropParams, CropAnchor } from '@/types';
import { ZOOM_LEVELS } from '@/constants';
import { Button } from '@/components/ui';
import { clamp } from '@/utils';

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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
    
    if (action === 'drag') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - cropParams.x, y: e.clientY - cropParams.y });
    } else if (action === 'resize' && handle) {
      setIsResizing(true);
      setResizeHandle(handle);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // 处理鼠标移动事件
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!selectedImage) return;

    if (isDragging) {
      const newX = clamp(e.clientX - dragStart.x, 0, selectedImage.width - cropParams.width);
      const newY = clamp(e.clientY - dragStart.y, 0, selectedImage.height - cropParams.height);
      
      onCropChange({
        ...cropParams,
        x: newX,
        y: newY,
      });
    } else if (isResizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
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
      }

      // 如果保持宽高比
      if (cropParams.maintainAspectRatio) {
        const aspectRatio = cropParams.width / cropParams.height;
        newHeight = newWidth / aspectRatio;
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
  }, [isDragging, isResizing, dragStart, cropParams, selectedImage, resizeHandle, onCropChange]);

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
    const scaleX = displayWidth / selectedImage.width;
    const scaleY = displayHeight / selectedImage.height;
    
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
      >
        {/* 调整手柄 */}
        <div 
          className="crop-handle" 
          style={{ top: -5, left: -5, cursor: 'nw-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'nw'); }}
        />
        <div 
          className="crop-handle" 
          style={{ top: -5, right: -5, cursor: 'ne-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'ne'); }}
        />
        <div 
          className="crop-handle" 
          style={{ bottom: -5, left: -5, cursor: 'sw-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'sw'); }}
        />
        <div 
          className="crop-handle" 
          style={{ bottom: -5, right: -5, cursor: 'se-resize' }}
          onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, 'resize', 'se'); }}
        />
      </div>
    );
  };

  if (!selectedImage) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
        <div className="text-gray-500">
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* 工具栏 */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">实时预览</h3>
        
        {/* 缩放控制 */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleZoomChange(zoom - 0.25)}
            disabled={zoom <= ZOOM_LEVELS[0]}
          >
            -
          </Button>
          <span className="text-sm text-gray-600 min-w-16 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleZoomChange(zoom + 0.25)}
            disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
          >
            +
          </Button>
        </div>
      </div>

      {/* 预览区域 */}
      <div 
        ref={containerRef}
        className="relative p-4 bg-gray-50 overflow-auto"
        style={{ height: '400px' }}
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