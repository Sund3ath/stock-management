// src/auth-pages/Home.tsx
import React from 'react';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <h1>Welcome to the Home Page</h1>
        <p>You are logged in as {user ? user.email : 'Guest'}.</p>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;