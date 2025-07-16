'use client';

import { useEffect } from 'react';

export function ClientTheme({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(savedTheme);
    }, []);

    return <>{children}</>;
}