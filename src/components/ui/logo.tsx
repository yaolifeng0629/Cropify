'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'white';
    showText?: boolean;
    className?: string;
}

/**
 * Cropify Logo —— DESIGN.md「Peec 式极简」品牌标识
 * 炭黑（#171717）圆角托板 + 白色裁剪角框 + 叠卡（批量）+ 中心定位点（精度）
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
        sm: 'text-[17px]',
        md: 'text-xl',
        lg: 'text-2xl'
    };

    const palette = variant === 'white'
        ? { tile: '#ffffff', glyph: '#171717', text: 'text-white' }
        : { tile: '#171717', glyph: '#ffffff', text: 'text-ink' };

    return (
        <div className={cn("flex items-center gap-2.5", className)}>
            {/* Logo 图标 */}
            <svg
                className={cn(sizeClasses[size], "flex-shrink-0")}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Cropify"
            >
                {/* 圆角托板（7px @32 / 22%） */}
                <rect width="32" height="32" rx="7" fill={palette.tile} />
                {/* 批量：错位叠放的图卡 */}
                <rect x="13" y="5.5" width="12.5" height="12.5" rx="2.5" fill={palette.glyph} opacity="0.32" />
                {/* 裁剪角框 */}
                <g stroke={palette.glyph} strokeWidth="2" strokeLinecap="round" fill="none">
                    <path d="M13.25 10.5H10.5V13.25" />
                    <path d="M18.75 10.5H21.5V13.25" />
                    <path d="M13.25 21.5H10.5V18.75" />
                    <path d="M18.75 21.5H21.5V18.75" />
                </g>
                {/* 中心定位点 */}
                <circle cx="16" cy="16" r="1.3" fill={palette.glyph} />
            </svg>

            {/* 品牌字标：Geist / 600 / -0.02em */}
            {showText && (
                <span className={cn(
                    "font-display font-semibold tracking-[-0.02em] leading-none",
                    textSizeClasses[size],
                    palette.text
                )}>
                    Cropify
                </span>
            )}
        </div>
    );
};

export default Logo;
