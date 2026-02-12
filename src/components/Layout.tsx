import React from 'react';
import type { Theme } from '../hooks/useSettings';
import { Settings } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    headerRight?: React.ReactNode;
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    currentTheme?: Theme;
    onOpenSettings?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    title = "SimpleMemo",
    headerRight,
    showBack,
    onBack,
    currentTheme = 'aurora',
    onOpenSettings
}) => {
    // Explicitly mapping classes to avoid Tailwind purging dynamic strings
    const themeClasses: Record<Theme, string> = {
        'aurora': 'bg-aurora',
        'minimal': 'bg-minimal',
        'midnight': 'bg-midnight',
        'paper': 'bg-paper'
    };

    const activeThemeClass = themeClasses[currentTheme] || 'bg-aurora';

    return (
        <div className={`w-full h-full ${activeThemeClass} transition-colors duration-500`}>
            {/* Global Background */}
            <div className="mesh-bg fixed inset-0 pointer-events-none transition-all duration-500" />

            <div className="layout-container transition-colors duration-300">
                {/* Glassmorphism Header */}
                <header className="glass-header w-full px-6 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        {showBack ? (
                            <button onClick={onBack} className="btn-text -ml-2" aria-label="Go Back">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                                <span>Back</span>
                            </button>
                        ) : (
                            <h1 className="text-display tracking-tight text-gray-900 leading-none">
                                {title}
                            </h1>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {headerRight}
                        {!showBack && onOpenSettings && (
                            <button
                                onClick={onOpenSettings}
                                className="p-2 -mr-2 text-gray-500 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <Settings size={22} />
                            </button>
                        )}
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden relative w-full scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
};
