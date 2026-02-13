import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
    onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Start exit animation slightly before the full 2 seconds
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 1800);

        // Complete finish callback
        const finishTimer = setTimeout(() => {
            onFinish();
        }, 2200); // Allow exit animation to complete

        return () => {
            clearTimeout(timer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#13111C] transition-opacity duration-500 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className={`relative flex items-center justify-center transition-transform duration-700 ${isExiting ? 'scale-110' : 'scale-100'}`}>
                {/* Abstract Logo Shape */}
                <div className="absolute w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative z-10 w-20 h-20 bg-surface rounded-3xl shadow-2xl shadow-black/50 flex items-center justify-center border border-white/10 animate-bounce-gentle">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary" />
                </div>
            </div>

            <h1 className="mt-8 text-2xl font-bold tracking-tight text-white animate-slide-up">
                SimpleMemo
            </h1>
            <p className="mt-2 text-sm text-gray-400 font-medium tracking-widest uppercase animate-slide-up animation-delay-100">
                Capture Ideas
            </p>
        </div>
    );
};
