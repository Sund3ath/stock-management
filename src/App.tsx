// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './auth-pages/Login';
import Register from './auth-pages/Register';
import Home from './main-pages/Home';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';
import { Container } from 'react-bootstrap';
import Rezepturen from './main-pages/Receipts';
import Management from './main-pages/CompanyManagment';

const PrivateRoute: React.FC = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <Container fluid className="p-0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/rezepturen" element={<Rezepturen />} />
            <Route path="/companymanagement" element={<Management />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;