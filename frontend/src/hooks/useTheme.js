import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme-preference';
const DARK_CLASS = 'dark';

const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return getSystemTheme();
};

const applyTheme = (theme) => {
    const root = document.documentElement;
    root.classList.toggle(DARK_CLASS, theme === 'dark');

    // smooth transition (one-time when theme changes)
    root.style.transition = 'background-color 0.25s ease, color 0.25s ease';
    window.setTimeout(() => {
        root.style.transition = '';
    }, 300);
};

export function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        applyTheme(theme);
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (event) => {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (stored) return;
            setTheme(event.matches ? 'dark' : 'light');
        };
        mq.addEventListener?.('change', onChange);
        return () => mq.removeEventListener?.('change', onChange);
    }, []);

    const setDark = useCallback(() => setTheme('dark'), []);
    const setLight = useCallback(() => setTheme('light'), []);
    const toggleTheme = useCallback(() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')), []);

    return {
        theme,
        isDark: theme === 'dark',
        isLight: theme === 'light',
        setDark,
        setLight,
        toggleTheme,
    };
}
export default useTheme;