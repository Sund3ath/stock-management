import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/auth-pages/Login';
import { Container } from '@mui/material';

function App() {
  return (
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </Container>
  );
}

export default App;