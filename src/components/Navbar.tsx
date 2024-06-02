// src/components/Navbar.tsx
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">K&E Stock Genie</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
          <Navbar.Text className="me-3">
            Signed in as: <a href="#login">User</a>
          </Navbar.Text>
          <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;