import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
    headerRight?: React.ReactNode;
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    bottomBar?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    title = "SimpleMemo",
    headerRight,
    showBack,
    onBack,
    bottomBar,
}) => {
    return (
        <div className="w-full h-full text-white selection:bg-accent/30 selection:text-white overflow-hidden relative bg-[#13111C]">
            {/* Background handled in global CSS */}

            <div className="layout-container relative z-10 mx-auto h-full flex flex-col max-w-[480px] bg-black/20 backdrop-blur-3xl shadow-2xl border-x border-white/5">
                {/* Dashboard Header */}
                <header className="px-6 pt-12 pb-6 flex items-center justify-between z-50">
                    <div className="flex items-center gap-3">
                        {showBack ? (
                            <button
                                onClick={onBack}
                                className="group flex items-center gap-2 pl-2 pr-4 py-2 -ml-2 rounded-full hover:bg-white/10 transition-all"
                                aria-label="Go Back"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-bold tracking-tight text-white">{title === "SimpleMemo" ? "SimpleMemo" : title}</span>
                                {title === "SimpleMemo" && <span className="text-sm font-medium text-gray-400">Good morning, Julian</span>}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {headerRight}
                        {!showBack && <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFB88C] to-[#DE6262] border-2 border-surface shadow-lg" />}
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden relative w-full scroll-smooth no-scrollbar p-0">
                    {children}
                </main>

                {/* Bottom Bar / FAB container */}
                {bottomBar && bottomBar}
            </div>
        </div>
    );
};
