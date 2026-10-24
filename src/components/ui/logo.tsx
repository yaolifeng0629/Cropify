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
 * Cropify Logo 组件 - 遵循 DESIGN.md 的扁平品牌标识
 * 主青（#00695c）底 + 白色裁剪标记；无渐变、无投影
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
                // 墨绿导航内保持品牌青托板，文字反白
                return {
                    container: 'bg-[#00695c]',
                    text: 'text-white'
                };
            case 'dark':
                return {
                    container: 'bg-ink',
                    text: 'text-white'
                };
            default:
                return {
                    container: 'bg-[#00695c]',
                    text: 'text-ink'
                };
        }
    };

    const variantClasses = getVariantClasses();

    return (
        <div className={cn("flex items-center space-x-3", className)}>
            {/* Logo Icon */}
            <div className="relative">
                <div className={cn(
                    "rounded-lg flex items-center justify-center transition-colors duration-200",
                    sizeClasses[size],
                    variantClasses.container
                )}>
                    {/* Cropify 专用图标 - 批量图卡 + 裁剪框标记 */}
                    <svg
                        className={logoIconSize[size]}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <rect x="11" y="5.5" width="14.5" height="14.5" rx="3" fill="#ffffff" opacity="0.32" />
                        <rect x="6.5" y="11.5" width="16.5" height="15" rx="3" fill="#ffffff" />
                        <g stroke="#00695c" strokeWidth="1.5" strokeLinecap="round" fill="none">
                            <path d="M12.4 14.4H10V16.8" />
                            <path d="M17.6 14.4H20V16.8" />
                            <path d="M12.4 23.4H10V21" />
                            <path d="M17.6 23.4H20V21" />
                        </g>
                        <circle cx="15" cy="18.9" r="1" fill="#00695c" />
                    </svg>
                </div>

            </div>

            {/* 品牌文字 */}
            {showText && (
                <div>
                    <h1 className={cn(
                        "font-bold tracking-tight leading-none",
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
