// src/components/Header.tsx
import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    <header className="p-4 text-text">
      <div className="flex justify-between items-center">
        <div
          className=
          "px-2 text-2xl border rounded-lg bg-primary font-bold">
          My Website
        </div>
        <IconButton
          color="primary"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="theme-toggle">
          {isDark ?
            <DarkModeIcon /> :
            <LightModeIcon />
          }
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
