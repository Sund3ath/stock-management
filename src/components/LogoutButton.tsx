// src/components/LogoutButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout} variant="danger" className="mt-3">
      Logout
    </Button>
  );
};

export default LogoutButton;