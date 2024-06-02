// src/components/SidebarStyles.ts
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  drawerPaper: {
    width: 250,
    background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
    borderRight: '1px solid #ddd',
  },
  listItem: {
    padding: '15px 20px',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '4px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
    },
  },
});

export default useStyles;