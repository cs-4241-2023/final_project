// src/components/Header.tsx
import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import { LightMode, DarkMode, Logout } from '@mui/icons-material';
import { AppBar, Avatar, Toolbar, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout');
      if (response.status === 200) {
        navigate('/');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar alt='Website Icon' src='/i-mama.png' />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Build your character
        </Typography>

        {location.pathname !== '/' && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}>
            <Logout />
          </IconButton>
        )}
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          aria-label='toggle-theme'
        >
          {isDark ?
            <LightMode /> :
            <DarkMode />
          }
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
