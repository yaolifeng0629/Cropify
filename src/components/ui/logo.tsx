'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'white' | 'dark';
    showText?: boolean;
    className?: string;
}

/**
 * Cropify Logo 组件 - 现代化设计的品牌标识
 */
export const Logo: React.FC<LogoProps> = ({
    size = 'md',
    variant = 'default',
    showText = true,
    className
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    const textSizeClasses = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl'
    };

    const logoIconSize = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-7 h-7'
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'white':
                return {
                    container: 'bg-white text-blue-600',
                    glow: 'bg-white',
                    text: 'text-white'
                };
            case 'dark':
                return {
                    container: 'bg-gray-900 text-white',
                    glow: 'bg-gray-900',
                    text: 'text-gray-900'
                };
            default:
                return {
                    container: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white',
                    glow: 'bg-gradient-to-br from-blue-500 to-purple-600',
                    text: 'text-blue-600'
                };
        }
    };

    const variantClasses = getVariantClasses();

    return (
        <div className={cn("flex items-center space-x-3", className)}>
            {/* Logo Icon */}
            <div className="relative">
                <div className={cn(
                    "rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105",
                    sizeClasses[size],
                    variantClasses.container
                )}>
                    {/* Cropify 专用图标 - 裁剪框和图像的组合 */}
                    <svg
                        className={logoIconSize[size]}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* 外层图像框架 */}
                        <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                        />

                        {/* 内层裁剪框 - 用虚线表示裁剪区域 */}
                        <rect
                            x="6"
                            y="6"
                            width="12"
                            height="8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeDasharray="2,2"
                            fill="none"
                        />

                        {/* 裁剪控制点 */}
                        <circle cx="6" cy="6" r="1" fill="currentColor" />
                        <circle cx="18" cy="6" r="1" fill="currentColor" />
                        <circle cx="6" cy="14" r="1" fill="currentColor" />
                        <circle cx="18" cy="14" r="1" fill="currentColor" />

                        {/* 图像内容示意 - 简化的山和太阳 */}
                        <path
                            d="M8 12l2-2 2 2 3-3 1 1v3H8v-1z"
                            fill="currentColor"
                            opacity="0.6"
                        />
                        <circle cx="14" cy="8.5" r="0.8" fill="currentColor" opacity="0.6" />
                    </svg>
                </div>

                {/* 发光效果 */}
                <div className={cn(
                    "absolute inset-0 rounded-xl blur-sm opacity-20 transition-opacity duration-300",
                    sizeClasses[size],
                    variantClasses.glow
                )}></div>
            </div>

            {/* 品牌文字 */}
            {showText && (
                <div>
                    <h1 className={cn(
                        "font-bold tracking-tight",
                        textSizeClasses[size],
                        variantClasses.text
                    )}>
                        Cropify
                        <span className={cn(
                            "ml-1.5 font-medium opacity-80",
                            size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
                        )}>
                            Pro
                        </span>
                    </h1>
                    {size !== 'sm' && (
                        <p className={cn(
                            "opacity-80 hidden sm:block font-medium",
                            size === 'md' ? 'text-xs' : 'text-sm',
                            variantClasses.text
                        )}>
                            智能图片批量裁剪工具
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Logo;
