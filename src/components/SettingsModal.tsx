import React from 'react';
import { X, Check } from 'lucide-react';
import type { Theme } from '../hooks/useSettings';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTheme: Theme;
    onThemeChange: (theme: Theme) => void;
}

const themes: { id: Theme; name: string; color: string }[] = [
    { id: 'aurora', name: 'Aurora', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' },
    { id: 'minimal', name: 'Minimal', color: '#F5F5F7' },
    { id: 'midnight', name: 'Midnight', color: '#1C1C1E' },
    { id: 'paper', name: 'Paper', color: '#fdfbf7' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentTheme,
    onThemeChange
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="bg-white w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl pointer-events-auto transform transition-transform duration-300 ease-out animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Settings</h2>
                    <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Theme</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => onThemeChange(theme.id)}
                                    className={`group relative flex flex-col items-center gap-2 transition-transform active:scale-95 focus:outline-none`}
                                >
                                    <div
                                        className={`w-16 h-16 rounded-2xl shadow-sm border-2 transition-all ${currentTheme === theme.id
                                                ? 'border-blue-500 ring-2 ring-blue-500/20 scale-105'
                                                : 'border-transparent hover:border-gray-200'
                                            }`}
                                        style={{ background: theme.color }}
                                    >
                                        {currentTheme === theme.id && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-2xl">
                                                <Check size={24} className="text-white drop-shadow-md" strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>
                                    <span className={`text-xs font-medium ${currentTheme === theme.id ? 'text-blue-600' : 'text-gray-500'}`}>
                                        {theme.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Version 1.1.0</span>
                            <span>Made by Youngja</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
