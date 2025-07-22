'use client';

import React from 'react';
import { AppError } from '@/types';
import { Button } from '@/components/ui';

interface ErrorDisplayProps {
  errors: AppError[];
  onClear: () => void;
  onDismiss: (id: string) => void;
}

/**
 * 错误信息显示组件
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errors,
  onClear,
  onDismiss,
}) => {
  if (errors.length === 0) {
    return null;
  }

  const getErrorIcon = (type: AppError['type']) => {
    switch (type) {
      case 'upload':
        return '📁';
      case 'processing':
        return '⚙️';
      case 'export':
        return '💾';
      case 'system':
      default:
        return '⚠️';
    }
  };

  const getErrorColor = (type: AppError['type']) => {
    switch (type) {
      case 'upload':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'processing':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'export':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'system':
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* 头部 */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-500">⚠️</span>
          <h3 className="text-lg font-medium text-gray-900">
            错误信息 ({errors.length})
          </h3>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClear}
        >
          清空全部
        </Button>
      </div>

      {/* 错误列表 */}
      <div className="p-4 space-y-3">
        {errors.map((error) => (
          <div
            key={error.id}
            className={`p-4 rounded-lg border ${getErrorColor(error.type)} relative group`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span>{getErrorIcon(error.type)}</span>
                  <span className="text-sm font-medium">
                    {error.message}
                  </span>
                </div>
                
                {error.details && (
                  <p className="text-sm opacity-80 mt-1">
                    {error.details}
                  </p>
                )}
                
                <p className="text-xs opacity-60 mt-2">
                  {new Date(error.timestamp).toLocaleString('zh-CN')}
                </p>
              </div>
              
              <button
                onClick={() => onDismiss(error.id)}
                className="ml-4 text-current opacity-50 hover:opacity-100 transition-opacity"
                title="关闭此错误"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};