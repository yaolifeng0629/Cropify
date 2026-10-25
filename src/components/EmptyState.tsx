'use client';

import React from 'react';
import Link from 'next/link';
import { ImageImportManager } from '@/components/modules';
import { ImageFile, AppError } from '@/types';
import { Footer } from './Footer';
import {
    Layers,
    ShieldCheck,
    FileDown,
    Crosshair,
    ScanEye,
    SlidersHorizontal,
    Package,
    Lock,
} from 'lucide-react';

interface EmptyStateProps {
    images: ImageFile[];
    isUploading: boolean;
    errors: AppError[];
    selectedImageId: string | null;
    addImages: (files: File[]) => Promise<void>;
    removeImage: (id: string) => void;
    clearImages: () => void;
    clearErrors: () => void;
    dismissError: (id: string) => void;
    onSelectImage: (id: string) => void;
}

const METRIC_BADGES = [
    { icon: Layers, label: '批量处理 100+ 张' },
    { icon: ShieldCheck, label: '本地处理 · 零上传' },
    { icon: FileDown, label: 'JPG / PNG / WebP 导出' },
];

const FEATURES = [
    {
        icon: Layers,
        title: '智能批量导入',
        body: '拖拽上传、点击选择或 Ctrl+V 粘贴，一次导入多达 100 张图片，格式自动识别。',
    },
    {
        icon: Crosshair,
        title: '九点锚定裁剪',
        body: '九个锚点精确定位裁剪位置，配合旋转、翻转与圆角控制，实现像素级输出。',
    },
    {
        icon: ScanEye,
        title: '实时对比预览',
        body: '裁剪前后即时对照，支持缩放、平移与网格辅助线，所见即所得。',
    },
    {
        icon: SlidersHorizontal,
        title: '细粒度质量控制',
        body: 'JPG 质量 1-100%、WebP 高效压缩，实时估算文件大小，导出前心中有数。',
    },
    {
        icon: Package,
        title: '批量打包导出',
        body: '单张、批量顺序导出或 ZIP 一键打包，智能命名规则自动解决重名冲突。',
    },
    {
        icon: Lock,
        title: '100% 本地隐私',
        body: '所有处理在浏览器本地完成，图片永不上传服务器，关闭页面即自动清除。',
    },
];

const STEPS = [
    { n: '01', title: '上传图片', body: '拖入或粘贴，即刻开始' },
    { n: '02', title: '调整裁剪', body: '锚点定位，实时预览' },
    { n: '03', title: '批量导出', body: '一键打包，高效交付' },
];

/**
 * 空状态落地页 —— DESIGN.md：浅灰画布 / 黑灰标题 / 细线框架 / 外壳控件
 * Hero（胶囊 + 双色 H1 + 指标 Badge + 双 CTA）→ 工作台面板 → Bento 功能 → 深色行动卡片
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
    images,
    isUploading,
    errors,
    selectedImageId,
    addImages,
    removeImage,
    clearImages,
    clearErrors,
    dismissError,
    onSelectImage,
}) => {
    const triggerFileInput = () => {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
        fileInput?.click();
    };

    return (
        <div className="flex min-h-screen flex-col bg-canvas">
            <main className="flex-1">
                {/* ============ Hero ============ */}
                <section className="relative overflow-hidden">
                    {/* CTA 后方浅方格纹理，边缘消融进画布 */}
                    <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                    {/* 桌面端框架两侧 1px 渐变竖线 */}
                    <div className="frame-line pointer-events-none absolute top-0 bottom-0 left-[max(10px,calc(50%-600px))] hidden w-px md:block" aria-hidden="true" />
                    <div className="frame-line pointer-events-none absolute top-0 bottom-0 right-[max(10px,calc(50%-600px))] hidden w-px md:block" aria-hidden="true" />

                    <div className="relative mx-auto w-full max-w-[1200px] px-[10px] pt-10 pb-10 text-center md:pt-[60px] xl:px-[5px]">
                        {/* 开源状态胶囊（30px，状态绿点） */}
                        <div className="mx-auto inline-flex h-[30px] items-center gap-2 rounded-full bg-surface px-3.5 shadow-[0_2px_6px_rgba(12,10,9,0.08),0_0_0_1px_rgba(23,23,23,0.08)]">
                            <span className="size-1.5 rounded-full bg-status" />
                            <span className="font-display text-[13px] font-medium tracking-[-0.01em] text-ink">
                                开源免费 · 本地处理 · 无需注册
                            </span>
                        </div>

                        {/* H1：前半句 Charcoal，后半句 rgba(23,23,23,.5)；400 / -0.02em / 1em */}
                        <h1 className="mx-auto mt-6 max-w-[600px] font-display text-[32px] leading-[1em] font-normal tracking-[-0.02em] text-ink md:text-[48px] xl:text-[64px]">
                            智能图片裁剪
                            <span className="block text-ink-dim">一键批量处理</span>
                        </h1>

                        {/* 说明正文：Inter，桌面 16 / 手机 17，1.4em，-0.2px */}
                        <p className="mx-auto mt-4 max-w-[600px] text-[17px] leading-[1.4] tracking-[-0.2px] text-ink-muted xl:text-[16px]">
                            专业的在线图片裁剪工具 —— 批量导入、像素级对齐、多格式导出，
                            全部在浏览器本地完成，数据永不离开你的设备。
                        </p>

                        {/* 指标 Badge 组 */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                            {METRIC_BADGES.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex h-8 items-center gap-1.5 rounded-md bg-surface px-2.5 shadow-[0_2px_6px_rgba(12,10,9,0.08),0_0_0_1px_rgba(23,23,23,0.08)]"
                                >
                                    <Icon className="size-3.5 text-ink-muted" strokeWidth={2.2} />
                                    <span className="font-display text-sm font-medium tracking-[-0.01em] text-ink">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* 双 CTA：高 44px / 间隔 16px；手机保持并排 */}
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 font-display text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
                            >
                                免费开始使用
                            </button>
                            {/* 次按钮：外壳 7px 圆角 + 1px padding + 内层白面 6px 圆角 */}
                            <span className="shell inline-flex">
                                <Link
                                    href="/user-guide"
                                    className="shell-inner inline-flex h-[42px] items-center gap-2 px-5 font-display text-[15px] font-medium text-ink transition-colors hover:bg-surface-soft"
                                >
                                    <span className="size-[9px] rounded-[2px] bg-ink-muted/60" aria-hidden="true" />
                                    查看使用指南
                                </Link>
                            </span>
                        </div>

                        {/* ============ 工作台演示面板 ============ */}
                        <div className="mt-12 md:mt-16">
                            <div className="shell-card text-left">
                                <div className="shell-card-inner overflow-hidden">
                                    {/* 面板顶栏：仪表板式紧凑结构 */}
                                    <div className="flex h-11 items-center justify-between border-b border-line px-4">
                                        <div className="flex items-center gap-1.5" aria-hidden="true">
                                            <span className="size-2.5 rounded-full bg-[#e5e5e5]" />
                                            <span className="size-2.5 rounded-full bg-[#d4d4d4]" />
                                            <span className="size-2.5 rounded-full bg-[#c4c4c4]" />
                                        </div>
                                        <span className="font-display text-[13px] font-medium tracking-[-0.01em] text-ink-muted">
                                            Cropify 本地工作台
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                                            <span className="size-1.5 rounded-full bg-status" />
                                            本地
                                        </span>
                                    </div>
                                    <div className="p-3 sm:p-5">
                                        <ImageImportManager
                                            images={images}
                                            isUploading={isUploading}
                                            errors={errors}
                                            selectedImageId={selectedImageId}
                                            addImages={addImages}
                                            removeImage={removeImage}
                                            clearImages={clearImages}
                                            clearErrors={clearErrors}
                                            dismissError={dismissError}
                                            onSelectImage={onSelectImage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ Bento 功能区 ============ */}
                <section className="border-t border-line">
                    <div className="mx-auto w-full max-w-[1200px] px-[10px] py-[60px] md:py-24 xl:px-[5px]">
                        <div className="mx-auto max-w-[600px] text-center">
                            <h2 className="font-display text-[26px] font-medium tracking-[-0.02em] text-ink md:text-[32px] xl:text-[39px]">
                                为什么选择 Cropify
                            </h2>
                            <p className="mt-4 text-[16px] leading-[1.4] text-ink-muted">
                                强大的功能，简单的操作 —— 每个细节都为批量精度裁剪而设计
                            </p>
                        </div>

                        <div className="mt-12 grid gap-[10px] md:grid-cols-2 xl:grid-cols-3">
                            {FEATURES.map(({ icon: Icon, title, body }) => (
                                <div key={title} className="shell-card group">
                                    <div className="shell-card-inner h-full p-6">
                                        <div className="flex size-9 items-center justify-center rounded-md bg-wash transition-colors group-hover:bg-surface-tint">
                                            <Icon className="size-[18px] text-ink" strokeWidth={1.8} />
                                        </div>
                                        <h3 className="mt-4 font-display text-[16px] leading-[1.2] font-semibold text-ink xl:text-[18px]">
                                            {title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                                            {body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 三步上手 */}
                        <div className="mx-auto mt-16 max-w-[860px]">
                            <div className="grid gap-8 md:grid-cols-3 md:gap-4">
                                {STEPS.map((step, i) => (
                                    <div key={step.n} className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
                                        {/* 桌面端步骤间虚线 */}
                                        {i < STEPS.length - 1 && (
                                            <div
                                                className="absolute top-[18px] left-[calc(50%+32px)] hidden h-px w-[calc(100%-64px)] border-t border-dashed border-line-strong md:block"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <div className="relative flex size-9 flex-shrink-0 items-center justify-center rounded-md bg-brand font-display text-[13px] font-medium text-white">
                                            {step.n}
                                        </div>
                                        <div>
                                            <h4 className="font-display text-[15px] font-semibold text-ink">{step.title}</h4>
                                            <p className="mt-1 text-sm text-ink-muted">{step.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ 深色行动卡片 ============ */}
                <section className="border-t border-line">
                    <div className="mx-auto w-full max-w-[1200px] px-[10px] py-[60px] md:py-24 xl:px-[5px]">
                        <div className="overflow-hidden rounded-[16px] bg-footer">
                            <div className="grid items-center gap-10 px-6 py-12 md:grid-cols-[1fr_auto] md:px-14 md:py-16">
                                <div>
                                    <h2 className="font-display text-[32px] leading-[1.1] font-medium tracking-[-0.02em] text-white md:text-[38px] xl:text-[48px]">
                                        准备好开始了吗？
                                    </h2>
                                    <p className="mt-4 max-w-[520px] text-[16px] leading-[1.4] text-white/60">
                                        上传第一张图片，体验专业级的批量裁剪 —— 完全免费，数据始终留在本地。
                                    </p>
                                    <div className="mt-8 flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={triggerFileInput}
                                            className="inline-flex h-11 items-center justify-center rounded-md bg-white px-5 font-display text-[15px] font-medium text-ink transition-colors hover:bg-white/90"
                                        >
                                            免费开始使用
                                        </button>
                                        <a
                                            href="https://github.com/yaolifeng0629/Cropify"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex h-11 items-center justify-center rounded-md px-5 font-display text-[15px] font-medium text-white ring-1 ring-white/25 transition-colors hover:bg-white/10"
                                        >
                                            GitHub
                                        </a>
                                    </div>
                                </div>

                                {/* 右侧装饰：倾斜的裁剪标记面板（呼应品牌标识） */}
                                <div className="hidden md:block" aria-hidden="true">
                                    <div className="rotate-3 rounded-[12px] ring-1 ring-white/15">
                                        <div className="flex size-[168px] items-center justify-center rounded-[11px] bg-white/[0.06]">
                                            <svg viewBox="0 0 32 32" className="size-24">
                                                <g stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.9">
                                                    <path d="M11.25 8.5H8.5V11.25" />
                                                    <path d="M20.75 8.5H23.5V11.25" />
                                                    <path d="M11.25 23.5H8.5V20.75" />
                                                    <path d="M20.75 23.5H23.5V20.75" />
                                                </g>
                                                <circle cx="16" cy="16" r="1.2" fill="#ffffff" opacity="0.9" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};
