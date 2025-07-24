'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface AppLayoutProps {
    children: React.ReactNode;
}
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
            <Footer />
        </div>
    );
};
