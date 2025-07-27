'use client';

import React from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        </div>
    );
};
