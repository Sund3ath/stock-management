// src/components/Footer.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">© 2024 K&E Stock Genie. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;