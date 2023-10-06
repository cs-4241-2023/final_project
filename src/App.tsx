import React, { useEffect, useState } from 'react';
import Header from './components/header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DashboardPage from "./pages/Dashboard"
import CreatePage from "./pages/Create"
import AuthPage from './pages/Auth';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './styles/theme';



const App: React.FC = () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' ? true : prefersDarkScheme
  );
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
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
