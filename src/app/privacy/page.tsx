'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>返回首页</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">隐私政策</h1>
                        <div className="w-20"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">隐私保护承诺</h2>
                            <p className="text-gray-600">我们如何保护您的数据安全</p>
                        </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Cropify 致力于保护用户隐私，确保您的图片和个人信息安全。本政策详细说明了我们如何收集、使用和保护您的信息。
                    </p>
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800 font-medium">最后更新时间：2024年1月1日</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">核心原则</span>
                        我们的隐私保护承诺
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">100% 本地处理</h4>
                                <p className="text-gray-600 text-sm">您的图片永远不会上传到我们的服务器，所有处理都在您的浏览器中完成。</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">自动清理</h4>
                                <p className="text-gray-600 text-sm">关闭浏览器标签页时，所有图片数据将自动从内存中清除。</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">无账户系统</h4>
                                <p className="text-gray-600 text-sm">无需注册或登录，不收集任何个人身份信息。</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">透明公开</h4>
                                <p className="text-gray-600 text-sm">开源代码，所有处理逻辑完全透明，可供审查。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">数据处理</span>
                        我们如何处理您的数据
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">图片数据</h4>
                            <ul className="space-y-2 text-gray-600 ml-4">
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                                    上传的图片仅存储在您的浏览器内存中
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                                    处理过程完全在客户端进行，无服务器传输
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                                    关闭标签页或刷新页面后，所有数据立即清除
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">使用统计</h4>
                            <ul className="space-y-2 text-gray-600 ml-4">
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                                    我们可能收集匿名的页面访问统计
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                                    不关联任何个人身份信息
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                                    仅用于改进产品功能和性能
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">安全措施</span>
                        技术安全保障
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                                ✓
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">HTTPS 加密</h4>
                                <p className="text-gray-600 text-sm">所有网站通信均通过 HTTPS 加密传输</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                                ✓
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">现代浏览器安全</h4>
                                <p className="text-gray-600 text-sm">依托现代浏览器的沙盒安全机制</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                                ✓
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">开源透明</h4>
                                <p className="text-gray-600 text-sm">源代码完全开放，接受社区安全审查</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">有隐私相关问题？</h3>
                        <p className="text-gray-600 mb-4">如果您对我们的隐私政策有任何疑问，请随时联系我们。</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/feedback" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                意见反馈
                            </Link>
                            <a href="mailto:privacy@cropify.com" className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                隐私邮箱
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
