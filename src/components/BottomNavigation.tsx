import React from 'react';
import { Home, Search, Plus, Settings } from 'lucide-react';
import type { ViewState } from '../types';

interface BottomNavigationProps {
    currentView: ViewState;
    onNavigate: (view: ViewState) => void;
    onCreateNote: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentView, onNavigate, onCreateNote }) => {
    return (
        <div className="absolute bottom-6 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none">
            <div className="flex items-center gap-2 p-2 bg-[#1E1B2E]/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20 rounded-full pointer-events-auto">
                <button
                    onClick={() => onNavigate('home')}
                    className={`p-3 rounded-full transition-colors ${currentView === 'home' ? 'text-white bg-primary/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/10'}`}
                >
                    <Home size={24} strokeWidth={2.5} />
                </button>
                <button
                    onClick={() => onNavigate('search')}
                    className={`p-3 rounded-full transition-colors ${currentView === 'search' ? 'text-white bg-primary/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/10'}`}
                >
                    <Search size={24} strokeWidth={2.5} />
                </button>

                {/* Floating Add Button in the center */}
                <button
                    onClick={onCreateNote}
                    className="mx-1 w-14 h-14 bg-gradient-to-tr from-accent to-primary rounded-full text-white shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center transform border border-white/20"
                >
                    <Plus size={28} strokeWidth={3} />
                </button>

                <button
                    onClick={() => onNavigate('settings')}
                    className={`p-3 rounded-full transition-colors ${currentView === 'settings' ? 'text-white bg-primary/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/10'}`}
                >
                    <Settings size={24} strokeWidth={2.5} />
                </button>
                <button className="p-3 rounded-full text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FFB88C] to-[#DE6262] opacity-80" />
                </button>
            </div>
        </div>
    );
};
