'use client';
import { useEffect, useState } from 'react';

export {};

declare global {
  interface Window {
    __setTheme: (theme: string) => void;
  }
}

export function ClientTheme({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        if (!theme) return;
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(theme);
    }, [theme]);

    useEffect(() => {
        window.__setTheme = (newTheme: string) => {
            localStorage.setItem('theme', newTheme);
            setTheme(newTheme);
        };
    }, []);

    return <>{children}</>;
}