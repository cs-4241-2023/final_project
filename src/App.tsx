// src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Router from './Router'

const App: React.FC = () => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className="bg-background min-h-screen text-text">
            <Header
                isDark={isDark}
                toggleTheme={toggleTheme}
            />
            <Router />
        </div>
    );
};

export default App;
