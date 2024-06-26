// src/components/Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { colors } from '../theme/color';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DrawerPaper = styled('div')({
  width: 250,
  background: colors.drawerBackground,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
  borderRight: '1px solid #ddd',
});

const ListItemStyled = styled(ListItem)({
  padding: '15px 20px',
  fontSize: '1.1rem',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: colors.primary,
    color: colors.text,
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
  },
});

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
      <DrawerPaper>
        <List>
          <ListItemStyled button onClick={() => { navigate('/home'); toggleSidebar(); }}>
            <ListItemText primary="Home" />
          </ListItemStyled>
          <ListItemStyled button onClick={() => { navigate('/profile'); toggleSidebar(); }}>
            <ListItemText primary="Profile" />
          </ListItemStyled>
          <ListItemStyled button onClick={() => { navigate('/settings'); toggleSidebar(); }}>
            <ListItemText primary="Settings" />
          </ListItemStyled>
          <ListItemStyled button onClick={() => { navigate('/rezepturen'); toggleSidebar(); }}>
            <ListItemText primary="Rezepturen" />
          </ListItemStyled>
        </List>
      </DrawerPaper>
    </Drawer>
  );
};

export default Sidebar;