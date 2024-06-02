// src/auth-pages/Login.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../query/queries';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css'; // Ensure this is imported to apply global styles

interface LoginResponse {
  login: {
    accessToken: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation<LoginResponse>(LOGIN);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await login({ variables: { email, password } });
      const token = result.data?.login.accessToken;
      if (token) {
        authLogin(token);
        alert('Login successful!');
        navigate('/home'); // Redirect to home page after successful login
      }
    } catch (err) {
      console.error('Login error', err);
    }
  };

  return (
    <div className="animated-background">
      <Container fluid className="d-flex align-items-center justify-content-center vh-100 login-container">
        <Row className="w-100">
          <Col md={{ span: 4, offset: 4 }}>
            <div className="login-card">
              <h2 className="text-center mb-4">Login</h2>
              <Form>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="button" onClick={handleLogin} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
              </Form>
              <div className="register-link">
                <Link to="/register">Don't have an account? Register</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;