import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../query/mutations';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

interface CreateUserResponse {
  createUser: {
    id: string;
  };
}

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser, { loading, error }] = useMutation<CreateUserResponse>(CREATE_USER);

  const handleRegister = async () => {
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            username,
            email,
            password,
          },
        },
      });
      if (result.data?.createUser.id) {
        alert('Registration successful!');
      }
    } catch (err) {
      console.error('Registration error', err);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 4, offset: 4 }}>
          <div className="border p-4 shadow rounded bg-white">
            <h2 className="text-center mb-4">Register</h2>
            <Form>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
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
              <Button variant="primary" type="button" onClick={handleRegister} disabled={loading} className="w-100">
                {loading ? 'Registering...' : 'Register'}
              </Button>
              {error && <Alert variant="danger" className="mt-3">{error.message}</Alert>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;