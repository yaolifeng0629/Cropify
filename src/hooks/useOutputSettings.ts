'use client';

import { useState, useCallback } from 'react';
import { OutputSettings } from '@/types';
import { APP_CONFIG } from '@/constants';

interface UseOutputSettingsReturn {
  outputSettings: OutputSettings;
  setOutputSettings: (settings: OutputSettings) => void;
  updateOutputSettings: (updates: Partial<OutputSettings>) => void;
  resetOutputSettings: () => void;
}

/**
 * 输出设置管理 Hook
 */
export function useOutputSettings(): UseOutputSettingsReturn {
  const [outputSettings, setOutputSettingsState] = useState<OutputSettings>(() => ({
    format: APP_CONFIG.SUPPORTED_OUTPUT_FORMATS[0] as 'jpg',
    quality: APP_CONFIG.DEFAULT_QUALITY,
    maintainOriginalName: true,
    filenamePrefix: '',
    filenameSuffix: '',
  }));

  // 设置输出配置
  const setOutputSettings = useCallback((settings: OutputSettings) => {
    setOutputSettingsState(settings);
  }, []);

  // 更新部分输出配置
  const updateOutputSettings = useCallback((updates: Partial<OutputSettings>) => {
    setOutputSettingsState(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // 重置输出配置
  const resetOutputSettings = useCallback(() => {
    setOutputSettingsState({
      format: 'jpg',
      quality: APP_CONFIG.DEFAULT_QUALITY,
      maintainOriginalName: true,
      filenamePrefix: '',
      filenameSuffix: '',
    });
  }, []);

  return {
    outputSettings,
    setOutputSettings,
    updateOutputSettings,
    resetOutputSettings,
  };
}