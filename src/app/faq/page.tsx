'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/**
 * 常见问题页面
 */
export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            category: "基本使用",
            questions: [
                {
                    question: "Cropify 支持哪些图片格式？",
                    answer: "Cropify 支持主流的图片格式，包括：JPEG、PNG、WebP、BMP、TIFF、GIF。输出格式支持 JPG、PNG 和 WebP。"
                },
                {
                    question: "单次可以上传多少张图片？",
                    answer: "Cropify 支持批量处理，建议单次上传不超过 100 张图片以确保最佳性能。对于大批量处理，建议分批进行。"
                },
                {
                    question: "有文件大小限制吗？",
                    answer: "为了确保处理性能，建议单个文件大小不超过 50MB。超大文件可能会导致处理缓慢或浏览器响应迟缓。"
                },
                {
                                         question: "如何快速导入图片？",
                     answer: "您可以通过三种方式导入图片：1) 直接拖拽图片到上传区域；2) 点击\"选择文件\"按钮浏览文件；3) 使用 Ctrl+V (Mac 用户使用 Cmd+V) 粘贴剪贴板中的图片。"
                }
            ]
        },
        {
            category: "隐私安全",
            questions: [
                {
                    question: "我的图片会上传到服务器吗？",
                    answer: "不会！Cropify 的所有图片处理都在您的浏览器本地完成，您的图片永远不会离开您的设备，确保完全的隐私保护。"
                },
                {
                    question: "Cropify 会保存我的图片吗？",
                    answer: "不会。Cropify 不会在任何地方保存您的图片。当您关闭浏览器标签页时，所有图片数据都会被清除。"
                },
                {
                    question: "是否需要注册账户？",
                    answer: "不需要。Cropify 是完全免费的工具，无需注册账户即可使用所有功能。"
                }
            ]
        },
        {
            category: "裁剪功能",
            questions: [
                {
                    question: "如何精确控制裁剪位置？",
                    answer: "Cropify 提供九点锚定系统，您可以选择 TOP_LEFT（左上）、CENTER（居中）、BOTTOM_RIGHT（右下）等锚点来精确控制裁剪位置。同时支持手动拖拽调整。"
                },
                {
                    question: "预设尺寸包含哪些？",
                    answer: "Cropify 提供丰富的预设尺寸：证件照（一寸、二寸、身份证）、社交媒体（微信封面、头像、朋友圈）、打印规格（A4、自定义）、壁纸（桌面、手机）、电商（方图、产品图）等。"
                },
                {
                                         question: "能否同时对所有图片应用相同设置？",
                     answer: "可以！配置好一张图片的裁剪设置后，点击\"开始批处理\"即可将相同设置应用到所有图片，大大提高工作效率。"
                },
                {
                    question: "支持图片旋转和翻转吗？",
                    answer: "支持。Cropify 提供 0-360° 的精细旋转控制，以及水平、垂直翻转功能。还支持圆角裁剪，可调节圆角半径。"
                }
            ]
        },
        {
            category: "质量与格式",
            questions: [
                {
                    question: "如何选择最佳的输出格式？",
                    answer: "建议：JPG 适用于照片，文件小，兼容性好；PNG 适用于需要透明背景或无损质量的图片；WebP 提供最佳的压缩效率，但兼容性稍差。"
                },
                {
                    question: "JPG 质量设置多少比较好？",
                    answer: "对于大多数用途，85-95% 的质量设置可以在文件大小和图片质量间取得最佳平衡。网页使用建议 80-90%，打印使用建议 90-100%。"
                },
                {
                    question: "处理后的图片质量会下降吗？",
                    answer: "PNG 和 WebP 无损模式不会降低质量。JPG 会根据您设置的质量参数进行压缩，合理的质量设置（85%+）通常不会产生明显的质量损失。"
                }
            ]
        },
        {
            category: "性能与兼容性",
            questions: [
                {
                    question: "Cropify 对浏览器有要求吗？",
                    answer: "Cropify 使用现代网络技术，建议使用 Chrome 88+、Firefox 85+、Safari 14+、Edge 88+ 或其他支持 Canvas API 的现代浏览器。"
                },
                {
                    question: "处理大量图片时很慢怎么办？",
                    answer: "建议：1) 分批处理，每批不超过 50 张；2) 关闭其他不必要的浏览器标签；3) 确保设备有足够的内存；4) 适当降低输出质量以加快处理速度。"
                },
                {
                    question: "手机上可以使用 Cropify 吗？",
                    answer: "可以！Cropify 采用响应式设计，在手机和平板上也能正常使用，但为了最佳体验，建议在桌面端使用。"
                }
            ]
        },
        {
            category: "导出下载",
            questions: [
                {
                                         question: "如何批量下载所有处理的图片？",
                     answer: "处理完成后，您可以选择：1) 逐个下载单张图片；2) 点击\"批量导出\"按钮依次下载所有图片；3) 创建 ZIP 压缩包一次性下载所有图片。"
                },
                {
                    question: "下载的文件名是什么格式？",
                    answer: "默认保留原始文件名，您也可以设置自定义前缀或后缀。如果文件名冲突，系统会自动添加数字后缀避免覆盖。"
                },
                {
                    question: "ZIP 下载失败怎么办？",
                    answer: "ZIP 下载失败可能是因为文件过多或总大小过大。建议：1) 分批创建 ZIP；2) 降低输出质量减小文件大小；3) 使用单张下载方式。"
                }
            ]
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                        <h1 className="text-2xl font-bold text-gray-900">常见问题</h1>
                        <div className="w-20"></div>
                    </div>
                </div>
            </div>

            {/* 主要内容 */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 简介 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">常见问题解答</h2>
                            <p className="text-gray-600">快速找到您需要的答案</p>
                        </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        这里收集了用户最常遇到的问题和详细解答。如果您没有找到需要的答案，欢迎通过
                        <Link href="/feedback" className="text-blue-600 hover:text-blue-800 mx-1">意见反馈</Link>
                        联系我们。
                    </p>
                </div>

                {/* FAQ 内容 */}
                {faqs.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-8">
                        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-3">
                                        {category.category}
                                    </span>
                                    {category.questions.length} 个问题
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {category.questions.map((faq, questionIndex) => {
                                    const globalIndex = categoryIndex * 1000 + questionIndex;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div key={questionIndex} className="border-b border-gray-100 last:border-b-0">
                                            <button
                                                onClick={() => toggleFAQ(globalIndex)}
                                                className="w-full text-left px-6 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-gray-900 font-medium pr-4">{faq.question}</h4>
                                                    <svg
                                                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                                                            isOpen ? 'rotate-180' : ''
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 pb-4">
                                                    <div className="text-gray-600 leading-relaxed pl-4 border-l-2 border-blue-200">
                                                        {faq.answer}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}

                {/* 联系我们 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">没找到您要的答案？</h3>
                        <p className="text-gray-600 mb-4">
                            我们很乐意帮助您解决问题！请通过以下方式联系我们：
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/feedback"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                意见反馈
                            </Link>
                            <a
                                href="mailto:yaolifeng666@gmail.com"
                                className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                邮件联系
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
