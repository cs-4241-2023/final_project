import React, { useEffect, useState } from 'react';
import Header from './components/header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DashboardPage from "./pages/Dashboard"
import CreatePage from "./pages/Create"
import AuthPage from './pages/Auth';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './styles/theme';
import { ThemeType } from './types/app.type';

const themeKey = 'theme';

const App: React.FC = () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useState(
    localStorage.getItem(themeKey) === null ?
      prefersDarkScheme :
      localStorage.getItem(themeKey) === ThemeType.DARK
  );
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', ThemeType.DARK);
    } else {
      document.documentElement.setAttribute('data-theme', ThemeType.LIGHT);
    }
    localStorage.setItem(themeKey, isDark ? ThemeType.DARK : ThemeType.LIGHT);
  }, [isDark]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/create' element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
