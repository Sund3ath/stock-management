// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { colors } from '../theme/color';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import enFlag from '../assets/flags/en.png';
import deFlag from '../assets/flags/de.png';
import trFlag from '../assets/flags/tr.png';

const StyledAppBar = styled(AppBar)({
  backgroundColor: colors.primary,
});

const flagMap = {
  en: enFlag,
  de: deFlag,
  tr: trFlag,
};

const NavigationBar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [currentFlag, setCurrentFlag] = useState(enFlag);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setCurrentFlag(flagMap[i18n.language]);
  }, [i18n.language]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentFlag(flagMap[lng]);
    handleLangMenuClose();
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            E&K Stock Genie
          </Typography>
          <IconButton color="inherit" onClick={handleLangMenuOpen}>
            <Avatar alt="Language" src={currentFlag} />
          </IconButton>
          <Menu anchorEl={langAnchorEl} open={Boolean(langAnchorEl)} onClose={handleLangMenuClose}>
            <MenuItem onClick={() => changeLanguage('en')}>
              <ListItemIcon>
                <Avatar alt="English" src={enFlag} />
              </ListItemIcon>
              English
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('de')}>
              <ListItemIcon>
                <Avatar alt="German" src={deFlag} />
              </ListItemIcon>
              Deutsch
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('tr')}>
              <ListItemIcon>
                <Avatar alt="Turkish" src={trFlag} />
              </ListItemIcon>
              Türkçe
            </MenuItem>
          </Menu>
          {user && (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Avatar alt="Profile Picture" src="/path/to/profile-picture.jpg" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem>
                  <Typography variant="subtitle1">{user?.email}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  {t('navbar.settings')}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: 'red' }} />
                  </ListItemIcon>
                  <Typography style={{ color: 'red' }}>{t('navbar.logout')}</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </StyledAppBar>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default NavigationBar;
