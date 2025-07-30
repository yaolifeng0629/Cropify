'use client';

import React from 'react';
import Link from 'next/link';

/**
 * 使用指南页面
 */
export default function UserGuidePage() {
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
                        <h1 className="text-2xl font-bold text-gray-900">使用指南</h1>
                        <div className="w-20"></div>
                    </div>
                </div>
            </div>

            {/* 主要内容 */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 简介 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">欢迎使用 Cropify</h2>
                            <p className="text-gray-600">专业的在线图片批量裁剪工具</p>
                        </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Cropify 是一个功能强大且易于使用的在线图片裁剪工具。所有处理都在您的浏览器本地完成，确保您的图片隐私安全。
                        本指南将帮助您快速掌握 Cropify 的所有功能。
                    </p>
                </div>

                {/* 快速开始 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">快速开始</span>
                        基本工作流程
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">1</div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">导入图片</h4>
                                <p className="text-gray-600 mb-3">支持多种导入方式：</p>
                                <ul className="space-y-2 text-sm text-gray-600 ml-4">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>拖拽图片文件到上传区域</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>点击"选择文件"按钮浏览文件</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>使用 Ctrl+V (或 Cmd+V) 粘贴剪贴板图片</li>
                                </ul>
                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-sm text-yellow-800">
                                        <strong>支持格式：</strong>JPEG、PNG、WebP、BMP、TIFF、GIF
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">2</div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">配置裁剪设置</h4>
                                <p className="text-gray-600 mb-3">从图片列表中选择要编辑的图片，然后：</p>
                                <ul className="space-y-2 text-sm text-gray-600 ml-4">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>选择预设尺寸或设置自定义尺寸</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>拖拽裁剪框角落调整大小</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>使用九点锚定系统精确定位</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>应用旋转、翻转等变换效果</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">3</div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">质量设置</h4>
                                <ul className="space-y-2 text-sm text-gray-600 ml-4">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>选择输出格式：JPG（通用）、PNG（无损）、WebP（高效）</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>调整压缩质量获得最佳文件大小</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>实时预览估算的输出大小</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">4</div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">批量处理</h4>
                                <ul className="space-y-2 text-sm text-gray-600 ml-4">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>点击"开始批处理"应用当前设置到所有图片</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>实时监控处理进度</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>随时暂停或取消处理</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">5</div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">导出结果</h4>
                                <ul className="space-y-2 text-sm text-gray-600 ml-4">
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>单张下载：处理完成后立即下载</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>批量导出：一次性下载所有处理的图片</li>
                                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>ZIP 打包：创建压缩包便于分享</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 高级功能 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">高级功能</span>
                        专业级控制
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">智能预设尺寸</h4>
                            <div className="space-y-2 text-sm">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <strong className="text-gray-900">证件照：</strong>
                                    <span className="text-gray-600">一寸照、二寸照、身份证照</span>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <strong className="text-gray-900">社交媒体：</strong>
                                    <span className="text-gray-600">微信封面、头像、朋友圈</span>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <strong className="text-gray-900">电商：</strong>
                                    <span className="text-gray-600">方图、产品图</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">高级变换</h4>
                            <div className="space-y-2 text-sm">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <strong className="text-gray-900">旋转：</strong>
                                    <span className="text-gray-600">0-360° 精细控制</span>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <strong className="text-gray-900">翻转：</strong>
                                    <span className="text-gray-600">水平/垂直翻转</span>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <strong className="text-gray-900">圆角：</strong>
                                    <span className="text-gray-600">可调节圆角半径</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 键盘快捷键 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">快捷键</span>
                        提高工作效率
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                            <div className="font-mono text-sm bg-white px-3 py-1 rounded border inline-block mb-2">Ctrl+V</div>
                            <p className="text-sm text-gray-600">粘贴图片</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                            <div className="font-mono text-sm bg-white px-3 py-1 rounded border inline-block mb-2">Delete</div>
                            <p className="text-sm text-gray-600">删除选中图片</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                            <div className="font-mono text-sm bg-white px-3 py-1 rounded border inline-block mb-2">Escape</div>
                            <p className="text-sm text-gray-600">取消当前操作</p>
                        </div>
                    </div>
                </div>

                {/* 技巧和提示 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">技巧</span>
                        专业提示
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">💡</div>
                            <div>
                                <h4 className="font-medium text-gray-900">最佳质量设置</h4>
                                <p className="text-sm text-gray-600">JPG 质量 85-95% 可在文件大小和质量间取得最佳平衡</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">🚀</div>
                            <div>
                                <h4 className="font-medium text-gray-900">批量处理技巧</h4>
                                <p className="text-sm text-gray-600">对于大批量图片，建议分批处理以确保浏览器稳定性</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">🔒</div>
                            <div>
                                <h4 className="font-medium text-gray-900">隐私保护</h4>
                                <p className="text-sm text-gray-600">所有处理都在本地完成，您的图片永不上传到服务器</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
