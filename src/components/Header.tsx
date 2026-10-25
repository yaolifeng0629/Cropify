'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ImageFile, CropParams, OutputSettings, ProcessTask, ProcessStatus } from '@/types';
import { Button, Logo } from '@/components/ui';
import { ExportModal } from '@/components/modules';
import { Menu, X, Github, Pause, Play, Download, Trash2, RotateCcw, Images, Loader2 } from 'lucide-react';

interface HeaderProps {
    images?: ImageFile[];
    onClearImages: () => void;
    isEditMode?: boolean;
    // 批处理相关props
    cropParams?: CropParams;
    outputSettings?: OutputSettings;
    tasks?: ProcessTask[];
    isProcessing?: boolean;
    onStartBatch?: () => void;
    onPauseBatch?: () => void;
    onCancelBatch?: () => void;
    onRetryFailed?: () => void;
    // 导出相关props
    onSingleDownload?: (task: ProcessTask) => void;
    onBatchDownload?: (tasks: ProcessTask[]) => void;
    onZipDownload?: (tasks: ProcessTask[]) => void;
}

const NAV_LINKS = [
    { href: '/features', label: '功能特性' },
    { href: '/user-guide', label: '使用指南' },
    { href: '/faq', label: '常见问题' },
    { href: '/about', label: '关于我们' },
];

/**
 * 应用头部 —— DESIGN.md 7.1：36px 黑色公告栏 + 60px 浅灰吸顶导航
 * 导航文字 Inter 14px；右侧 CTA 高 36px（主：炭黑 / 次：外壳按钮）
 */
export const Header: React.FC<HeaderProps> = ({
    images,
    onClearImages,
    isEditMode = false,
    cropParams,
    outputSettings,
    tasks = [],
    isProcessing,
    onStartBatch,
    onPauseBatch,
    onCancelBatch,
    onRetryFailed,
    onSingleDownload,
    onBatchDownload,
    onZipDownload
}) => {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 移动菜单展开时锁定背景滚动
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    // 计算统计信息
    const stats = {
        total: images?.length || 0,
        completed: tasks.filter(t => t.status === ProcessStatus.COMPLETED).length,
        failed: tasks.filter(t => t.status === ProcessStatus.FAILED).length,
    };

    const hasErrors = stats.failed > 0;
    const canExport = stats.completed > 0 && onSingleDownload && onBatchDownload && onZipDownload;

    // 落地页主 CTA：若导入控件已在页面中，直接唤起文件选择
    const triggerFileInput = () => {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
        if (fileInput) {
            fileInput.click();
        } else {
            window.location.href = '/';
        }
    };

    /** 编辑模式操作区 */
    const editActions = (
        <>
            {images && images.length > 0 && (
                <>
                    {/* 图片计数 Badge（指标 Badge 规范） */}
                    <div className="flex h-9 items-center gap-1.5 rounded-[7px] bg-surface px-3 shadow-[0_2px_6px_rgba(12,10,9,0.08),0_0_0_1px_rgba(23,23,23,0.08)]">
                        <Images className="size-4 text-ink-muted" />
                        <span className="font-display text-sm font-medium tracking-[-0.01em] text-ink whitespace-nowrap">
                            {images.length} 张图片
                        </span>
                    </div>

                    <Button variant="outline" onClick={onClearImages}>
                        <Trash2 />
                        <span className="hidden sm:inline">清空全部</span>
                        <span className="sm:hidden">清空</span>
                    </Button>

                    {onStartBatch && !isProcessing && (
                        <Button onClick={onStartBatch}>
                            <Play />
                            <span className="hidden sm:inline">开始批处理</span>
                            <span className="sm:hidden">处理</span>
                        </Button>
                    )}

                    {isProcessing && (
                        <>
                            {onPauseBatch && (
                                <Button variant="outline" onClick={onPauseBatch}>
                                    <Pause />
                                    <span className="hidden sm:inline">暂停</span>
                                </Button>
                            )}
                            <div className="flex h-9 items-center gap-2 rounded-[7px] bg-surface px-3 shadow-[0_2px_6px_rgba(12,10,9,0.08),0_0_0_1px_rgba(23,23,23,0.08)]">
                                <Loader2 className="size-4 animate-spin text-ink" />
                                <span className="font-display text-sm font-medium text-ink">处理中...</span>
                            </div>
                        </>
                    )}

                    {hasErrors && onRetryFailed && (
                        <Button variant="danger" onClick={onRetryFailed}>
                            <RotateCcw />
                            <span className="hidden sm:inline">重试失败 ({stats.failed})</span>
                            <span className="sm:hidden">重试</span>
                        </Button>
                    )}

                    {canExport && (
                        <Button onClick={() => setIsExportModalOpen(true)}>
                            <Download />
                            <span className="hidden sm:inline">导出 ({stats.completed})</span>
                            <span className="sm:hidden">导出</span>
                        </Button>
                    )}
                </>
            )}
        </>
    );

    return (
        <div className="sticky top-0 z-50">
            {/* 公告栏 36px（编辑模式隐藏，保持工作台密度） */}
            {!isEditMode && (
                <div className="flex h-9 items-center justify-center bg-footer px-4 text-center">
                    <p className="truncate text-[13px] leading-none text-white/70">
                        <span className="hidden sm:inline">Cropify 已开源 —— 完全免费，所有图片处理均在浏览器本地完成</span>
                        <span className="sm:hidden">完全免费 · 图片处理 100% 本地完成</span>
                        <a
                            href="https://github.com/yaolifeng0629/Cropify"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 font-medium text-white underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white"
                        >
                            GitHub
                        </a>
                    </p>
                </div>
            )}

            {/* 主导航 60px */}
            <header className="border-b border-line bg-canvas/95 backdrop-blur-sm">
                <div className="mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between px-[10px] xl:px-[5px]">
                    {/* 左侧：Logo + 导航链接 */}
                    <div className="flex items-center gap-8">
                        <Link href="/" aria-label="Cropify 首页">
                            <Logo size="sm" />
                        </Link>
                        <nav className="hidden items-center gap-6 lg:flex">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm leading-none text-nav-text transition-colors hover:text-ink"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* 右侧：操作区 */}
                    <div className="flex items-center gap-2">
                        {isEditMode ? (
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                {editActions}
                            </div>
                        ) : (
                            <div className="hidden items-center gap-2 lg:flex">
                                <Button variant="outline" asChild>
                                    <a
                                        href="https://github.com/yaolifeng0629/Cropify"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github />
                                        Star
                                    </a>
                                </Button>
                                <Button onClick={triggerFileInput}>
                                    开始使用
                                </Button>
                            </div>
                        )}

                        {/* 移动端菜单按钮（三横线图标） */}
                        <button
                            type="button"
                            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
                            onClick={() => setIsMobileMenuOpen(v => !v)}
                            className="inline-flex size-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-brand-tint lg:hidden"
                        >
                            {isMobileMenuOpen ? <X className="size-[22px]" /> : <Menu className="size-[22px]" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* 移动端全屏菜单（顶部 Logo + 关闭，纵向链接，底部整行按钮） */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] flex flex-col bg-canvas lg:hidden">
                    <div className="flex h-[60px] items-center justify-between border-b border-line px-[10px]">
                        <Logo size="sm" />
                        <button
                            type="button"
                            aria-label="关闭菜单"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="inline-flex size-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-brand-tint"
                        >
                            <X className="size-6" />
                        </button>
                    </div>
                    <nav className="flex-1 overflow-y-auto px-[10px] py-6">
                        <ul className="flex flex-col">
                            {NAV_LINKS.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center border-b border-line py-4 font-display text-lg font-medium text-ink"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="flex flex-col gap-3 border-t border-line p-[10px] pb-8">
                        {!isEditMode && (
                            <>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={() => { setIsMobileMenuOpen(false); triggerFileInput(); }}
                                >
                                    开始使用
                                </Button>
                                <Button variant="outline" size="lg" className="w-full" asChild>
                                    <a
                                        href="https://github.com/yaolifeng0629/Cropify"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github />
                                        GitHub Star
                                    </a>
                                </Button>
                            </>
                        )}
                        {isEditMode && (
                            <Button variant="outline" size="lg" className="w-full" asChild>
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>返回首页</Link>
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* 导出模态框 */}
            {canExport && outputSettings && (
                <ExportModal
                    isOpen={isExportModalOpen}
                    onClose={() => setIsExportModalOpen(false)}
                    tasks={tasks}
                    outputSettings={outputSettings}
                    onSingleDownload={onSingleDownload}
                    onBatchDownload={onBatchDownload}
                    onZipDownload={onZipDownload}
                />
            )}
        </div>
    );
};
