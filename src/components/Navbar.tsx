// src/components/Navbar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { colors } from '../theme/color';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  backgroundColor: colors.primary,
});

const NavigationBar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" style={{ color: 'red' }} />
              </ListItemIcon>
              <Typography style={{ color: 'red' }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default NavigationBar;