import React from 'react';
import { Button as ShadcnButton } from './button';
import { Card as ShadcnCard, CardHeader, CardTitle, CardContent, CardSeparator } from './card';
import { Progress as ShadcnProgress } from './progress';
import { Input as ShadcnInput, Label, InputGroup, InputWithLabel } from './input';
import { Checkbox } from './checkbox';
import { Switch } from './switch';
import { Slider } from './slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
import { Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

/**
 * 通用按钮组件 - 基于 shadcn/ui Button 的兼容层
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  // 映射变体到 shadcn/ui 变体
  const variantMap = {
    primary: 'default' as const,
    secondary: 'secondary' as const,
    outline: 'outline' as const,
    ghost: 'ghost' as const,
    danger: 'destructive' as const,
  };

  // 映射尺寸到 shadcn/ui 尺寸
  const sizeMap = {
    sm: 'sm' as const,
    md: 'default' as const,
    lg: 'lg' as const,
  };

  return (
    <ShadcnButton
      variant={variantMap[variant]}
      size={sizeMap[size]}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </ShadcnButton>
  );
};

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * 通用卡片组件 - 基于 shadcn/ui Card 的兼容层
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <ShadcnCard className={cn('bg-white', className)}>
      {title && (
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(paddingClasses[padding], title ? 'pt-6' : '')}>
        {children}
      </CardContent>
    </ShadcnCard>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * 通用模态框组件
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  // 处理ESC键关闭
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 模态框内容 */}
      <div className={cn(
        'relative bg-white rounded-lg shadow-xl w-full mx-4 max-h-[90vh] overflow-hidden',
        sizeClasses[size],
        className
      )}>
        {/* 头部 */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}

        {/* 内容区域 */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  value: number; // 0-100
  showPercentage?: boolean;
  className?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

/**
 * 进度条组件 - 基于 shadcn/ui Progress 的兼容层
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  showPercentage = true,
  className = '',
  color = 'blue',
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  // 颜色映射到 CSS 变量
  const colorClasses = {
    blue: '[&>div]:bg-blue-600',
    green: '[&>div]:bg-green-600',
    red: '[&>div]:bg-red-600',
    yellow: '[&>div]:bg-yellow-600',
  };

  return (
    <div className={cn('w-full', className)}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{clampedValue.toFixed(0)}%</span>
        </div>
      )}
      <ShadcnProgress
        value={clampedValue}
        className={cn('h-2', colorClasses[color])}
      />
    </div>
  );
};

// 导出所有 Radix UI 组件
export { Logo, Modal };

// 导出原始的 Radix UI 组件
export {
  ShadcnButton as RadixButton,
  ShadcnCard as RadixCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardSeparator,
  ShadcnProgress as RadixProgress,
  ShadcnInput as Input,
  Label,
  InputGroup,
  InputWithLabel,
  Checkbox,
  Switch,
  Slider,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
