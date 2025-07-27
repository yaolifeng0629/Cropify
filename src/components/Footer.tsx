'use client';

import React from 'react';

/**
 * 应用底部组件
 */
export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="text-center text-sm text-gray-500">
                    <p>© 2024 Cropify. 所有处理均在本地完成，确保您的图片数据完全私密安全。</p>
                </div>
            </div>
        </footer>
    );
};
