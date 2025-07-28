'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ImageFile } from '@/types';

interface HeaderProps {
    images?: ImageFile[];
    onClearImages: () => void;
}

/**
 * 应用头部组件 - 使用 Portal 渲染到 layout 中
 */
export const Header: React.FC<HeaderProps> = ({ images, onClearImages }) => {
    const [headerPortal, setHeaderPortal] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // 确保在客户端才查找 DOM 元素
        setHeaderPortal(document.getElementById('header-portal'));
    }, []);

    // 只有当有图片时才显示头部
    if (!images || images.length === 0) {
        return null;
    }

    const headerContent = (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">已导入 {images?.length || 0} 张图片</span>
                    <button
                        onClick={onClearImages}
                        className="text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                        清空
                    </button>
                </div>
            </div>
        </header>
    );

    // 使用 Portal 渲染到 layout 中的 header-portal 元素
    if (!headerPortal) {
        return null;
    }

    return createPortal(headerContent, headerPortal);
};
