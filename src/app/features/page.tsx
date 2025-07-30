'use client';

import React from 'react';
import Link from 'next/link';

export default function FeaturesPage() {
    const features = [
        {
            category: "图片管理",
            icon: "🖼️",
            color: "from-blue-500 to-blue-600",
            items: [
                {
                    title: "多种导入方式",
                    description: "拖拽上传、点击选择、剪贴板粘贴",
                    detail: "支持直接拖拽图片到上传区域，点击按钮浏览文件，或使用 Ctrl+V 粘贴剪贴板图片"
                },
                {
                    title: "格式支持",
                    description: "JPEG、PNG、WebP、BMP、TIFF、GIF",
                    detail: "支持主流图片格式输入，输出支持 JPG、PNG、WebP 三种格式"
                },
                {
                    title: "批量处理",
                    description: "同时处理多达 100 张图片",
                    detail: "智能队列管理和进度跟踪，支持大批量图片的高效处理"
                }
            ]
        },
        {
            category: "高级裁剪",
            icon: "✂️",
            color: "from-green-500 to-green-600",
            items: [
                {
                    title: "智能预设尺寸",
                    description: "证件照、社交媒体、电商等预设",
                    detail: "包含一寸照、微信封面、产品图等常用尺寸，满足各种使用场景"
                },
                {
                    title: "九点锚定系统",
                    description: "精确控制裁剪位置",
                    detail: "支持 TOP_LEFT、CENTER、BOTTOM_RIGHT 等九个锚点，实现精确定位"
                },
                {
                    title: "高级变换",
                    description: "旋转、翻转、圆角裁剪",
                    detail: "0-360° 旋转控制，水平垂直翻转，可调节圆角半径"
                }
            ]
        },
        {
            category: "用户体验",
            icon: "🎨",
            color: "from-purple-500 to-purple-600",
            items: [
                {
                    title: "实时预览",
                    description: "即时前后对比，无缝更新",
                    detail: "实时显示裁剪效果，支持缩放和平移导航，提供网格辅助线"
                },
                {
                    title: "响应式设计",
                    description: "桌面优化，移动端友好",
                    detail: "适配各种设备尺寸，专注生产力的现代化界面设计"
                },
                {
                    title: "键盘快捷键",
                    description: "快速操作，提高效率",
                    detail: "支持 Ctrl+V 粘贴、Delete 删除、Escape 取消等快捷键"
                }
            ]
        },
        {
            category: "质量控制",
            icon: "⚙️",
            color: "from-orange-500 to-orange-600",
            items: [
                {
                    title: "智能压缩",
                    description: "多格式输出，质量可控",
                    detail: "JPG 质量 1-100%，PNG 压缩级别 0-9，WebP 高效压缩"
                },
                {
                    title: "文件大小优化",
                    description: "实时大小估算和预览",
                    detail: "实时显示压缩后文件大小，帮助选择最佳质量设置"
                },
                {
                    title: "元数据管理",
                    description: "EXIF 数据保留或移除",
                    detail: "可选择保留或清除图片的元数据信息，保护隐私"
                }
            ]
        },
        {
            category: "导出系统",
            icon: "📦",
            color: "from-red-500 to-red-600",
            items: [
                {
                    title: "灵活下载",
                    description: "单张、批量、ZIP 打包",
                    detail: "支持即时单张下载、批量顺序导出、ZIP 压缩包下载"
                },
                {
                    title: "智能命名",
                    description: "自定义前缀后缀，冲突解决",
                    detail: "保留原始名称或自定义命名规则，自动处理文件名冲突"
                },
                {
                    title: "进度跟踪",
                    description: "实时处理进度和错误恢复",
                    detail: "显示详细处理进度，支持暂停、继续、错误重试"
                }
            ]
        },
        {
            category: "隐私安全",
            icon: "🔒",
            color: "from-emerald-500 to-emerald-600",
            items: [
                {
                    title: "100% 本地处理",
                    description: "图片永不上传服务器",
                    detail: "所有处理都在浏览器本地完成，确保完全的数据隐私"
                },
                {
                    title: "自动清理",
                    description: "关闭页面时自动清除数据",
                    detail: "浏览器标签页关闭后，所有图片数据立即从内存中清除"
                },
                {
                    title: "无账户系统",
                    description: "无需注册，即用即走",
                    detail: "不收集任何个人信息，完全免费使用所有功能"
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 页面头部 */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>返回首页</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">功能特性</h1>
                        <div className="w-20"></div>
                    </div>
                </div>
            </div>

            {/* 主要内容 */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 简介 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">强大的图片处理能力</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Cropify 提供专业级的图片裁剪功能，结合现代化的用户界面和完全的隐私保护。
                            无论是个人用户还是专业设计师，都能在这里找到满足需求的工具。
                        </p>
                    </div>
                </div>

                {/* 功能分类展示 */}
                <div className="space-y-8">
                    {features.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                            {/* 分类头部 */}
                            <div className={`bg-gradient-to-r ${category.color} px-6 py-4`}>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{category.icon}</span>
                                    <h3 className="text-xl font-bold text-white">{category.category}</h3>
                                </div>
                            </div>

                            {/* 功能列表 */}
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="group">
                                            <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                                                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-3">
                                                    {item.description}
                                                </p>
                                                <p className="text-xs text-gray-500 leading-relaxed">
                                                    {item.detail}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 技术优势 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">技术优势</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">Canvas API</h4>
                            <p className="text-sm text-gray-600">硬件加速的图像处理</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">Web Workers</h4>
                            <p className="text-sm text-gray-600">后台批量处理</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">Memory Safe</h4>
                            <p className="text-sm text-gray-600">智能内存管理</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">开源透明</h4>
                            <p className="text-sm text-gray-600">代码完全开放</p>
                        </div>
                    </div>
                </div>

                {/* 立即体验 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-8 mt-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">立即体验这些强大功能</h3>
                        <p className="text-gray-600 mb-6">
                            无需注册，无需下载，在浏览器中即可享受专业级的图片处理体验
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M12 12l.01.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                开始使用
                            </Link>
                            <Link
                                href="/user-guide"
                                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                查看指南
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
