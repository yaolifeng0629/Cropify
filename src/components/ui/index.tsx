import React from 'react';
import { Button as ShadcnButton } from './button';
import { Card as ShadcnCard, CardHeader, CardTitle, CardContent } from './card';
import { Progress as ShadcnProgress } from './progress';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
