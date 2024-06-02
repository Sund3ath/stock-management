// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './auth-pages/Login';
import Register from './auth-pages/Register';
import Home from './main-pages/Home';
import { useAuth } from './context/AuthContext';
import { Container } from 'react-bootstrap';

const PrivateRoute: React.FC = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Container fluid className="p-0">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;