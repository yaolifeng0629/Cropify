'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
    const stats = [
        { label: '支持格式', value: '6+', icon: '🖼️' },
        { label: '批量处理', value: '100', icon: '⚡' },
        { label: '本地处理', value: '100%', icon: '🔒' },
        { label: '开源免费', value: '✓', icon: '💝' }
    ];

    const values = [
        {
            icon: '🔐',
            title: '隐私优先',
            description: '我们坚信数据隐私是基本权利。所有图片处理都在您的设备本地完成，永不上传到服务器。'
        },
        {
            icon: '🚀',
            title: '技术创新',
            description: '采用最新的Web技术，提供接近原生应用的性能体验，同时保持跨平台兼容性。'
        },
        {
            icon: '🎯',
            title: '用户体验',
            description: '简洁直观的界面设计，专业级的功能配置，让每个用户都能轻松上手。'
        },
        {
            icon: '🌐',
            title: '开放透明',
            description: '开源代码，社区驱动，接受所有人的审查和贡献，持续改进产品质量。'
        }
    ];

    const timeline = [
        {
            year: '2024',
            title: '项目启动',
            description: '基于用户对隐私安全图片处理工具的需求，Cropify 项目正式启动开发。'
        },
        {
            year: '2024.Q2',
            title: '核心功能开发',
            description: '完成基础裁剪功能、批量处理、多格式支持等核心功能的开发和测试。'
        },
        {
            year: '2024.Q3',
            title: '用户体验优化',
            description: '引入现代化UI设计，优化交互体验，添加实时预览和智能预设功能。'
        },
        {
            year: '2024.Q4',
            title: '开源发布',
            description: '正式开源发布，邀请社区贡献者参与项目开发和维护。'
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
                        <h1 className="text-2xl font-bold text-gray-900">关于我们</h1>
                        <div className="w-20"></div>
                    </div>
                </div>
            </div>

            {/* 主要内容 */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 项目介绍 */}
                <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Cropify</h2>
                        <p className="text-xl text-gray-600 mb-6">专业的在线图片批量裁剪工具</p>
                    </div>

                    <div className="prose prose-lg mx-auto text-gray-700">
                        <p className="text-center leading-relaxed">
                            Cropify 是一个专注于隐私保护的现代化图片处理工具。我们的使命是为用户提供简单、安全、
                            高效的图片裁剪体验，让每个人都能轻松处理图片，而无需担心数据安全问题。
                        </p>
                    </div>
                </div>

                {/* 数据统计 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">项目数据</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 核心价值观 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">核心价值观</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="text-3xl flex-shrink-0">{value.icon}</div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 发展历程 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">发展历程</h3>
                    <div className="space-y-6">
                        {timeline.map((item, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-16 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                                        {item.year}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 技术栈 */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">技术栈</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">前端框架</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-black rounded-full"></span>
                                    <span>Next.js 15.4.2</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>React 19.1.0</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                    <span>TypeScript 5.x</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">样式与UI</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                                    <span>Tailwind CSS 4</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                    <span>响应式设计</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                    <span>现代化组件</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">图像处理</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <span>Canvas API</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span>Blob API</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span>Web Workers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 开源信息 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6 mb-8">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">开源项目</h3>
                        <p className="text-gray-600 mb-4">
                            Cropify 是一个完全开源的项目。我们欢迎社区贡献者参与开发。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="https://github.com/yourusername/cropify"
                                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                                查看源码
                            </a>
                            <Link
                                href="/feedback"
                                className="inline-flex items-center px-4 py-2 bg-white text-green-600 text-sm font-medium rounded-lg border border-green-600 hover:bg-green-50 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                参与贡献
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 联系我们 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">联系我们</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">邮箱支持</h4>
                            <p className="text-sm text-gray-600">yaolifeng666@gmail.com</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">在线反馈</h4>
                            <Link href="/feedback" className="text-sm text-blue-600 hover:text-blue-800">
                                提交反馈
                            </Link>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">使用帮助</h4>
                            <Link href="/user-guide" className="text-sm text-blue-600 hover:text-blue-800">
                                查看指南
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
