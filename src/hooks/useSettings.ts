import { useState, useEffect } from 'react';

export type Theme = 'aurora' | 'minimal' | 'midnight' | 'paper';

const STORAGE_KEY = 'simple-memo-settings';

interface Settings {
    theme: Theme;
}

export const useSettings = () => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : { theme: 'aurora' };
        } catch (e) {
            console.error("Failed to load settings", e);
            return { theme: 'aurora' };
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
            // Apply theme class to body for global styles if needed, 
            // but we will primarily handle it in Layout for the background.
        } catch (e) {
            console.error("Failed to save settings", e);
        }
    }, [settings]);

    const setTheme = (theme: Theme) => {
        setSettings(prev => ({ ...prev, theme }));
    };

    return {
        theme: settings.theme,
        setTheme
    };
};
