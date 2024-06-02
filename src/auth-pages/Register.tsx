// src/auth-pages/Register.tsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css'; // Ensure this is imported to apply the background
import { colors } from '../theme/color';
import { styled } from '@mui/system';

const RegisterButton = styled(Button)({
  backgroundColor: colors.primary,
  borderColor: colors.primary,
  '&:hover': {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
});

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await register(email, password);
      navigate('/home'); // Redirect to home page after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="background">
      <Container fluid className="d-flex align-items-center justify-content-center vh-100 login-container">
        <Row className="w-100">
          <Col md={{ span: 4, offset: 4 }}>
            <div className="login-card">
              <h2 className="text-center mb-4">Register</h2>
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
                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <RegisterButton variant="primary" type="button" onClick={handleRegister}>
                  Register
                </RegisterButton>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              </Form>
              <div className="register-link">
                <Link to="/login">Already have an account? Login</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;