// src/auth-pages/Home.tsx
import React from 'react';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <h1>Welcome to the Home Page of your Stock Management</h1>
        <p>You are logged in.</p>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;