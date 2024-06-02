// src/auth-pages/Login.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../query/mutations';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css'; // Make sure to import your CSS file

interface LoginResponse {
  login: {
    accessToken: string;
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation<LoginResponse>(LOGIN);

  const handleLogin = async () => {
    try {
      const result = await login({ variables: { email, password } });
      const token = result.data?.login.accessToken;
      if (token) {
        localStorage.setItem('token', token);
        alert('Login successful!');
      }
    } catch (err) {
      console.error('Login error', err);
    }
  };

  return (
    <div className="animated-background">
      <Container fluid className="d-flex align-items-center justify-content-center vh-100">
        <Row className="w-100">
          <Col md={{ span: 4, offset: 4 }}>
            <div className="border p-4 shadow rounded bg-white">
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
                <Button variant="primary" type="button" onClick={handleLogin} disabled={loading} className="w-100">
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
              </Form>
              <div className="text-center mt-3">
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