import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../api/authService';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import './Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await AuthService.login(email, password);
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="auth-card shadow-lg">
          <Card.Body>
            <h2 className="futuristic-text text-center">Welcome Back</h2>
            <p className="text-center futuristic-subtext">Log in to your account</p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <p className="text-center mt-3 futuristic-subtext">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
