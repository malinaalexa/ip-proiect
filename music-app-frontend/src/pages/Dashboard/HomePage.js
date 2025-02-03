import React, { useEffect, useState } from 'react';
import UserService from '../../api/userService';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import './Dashboard.css';

const HomePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await UserService.getProfile();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center futuristic-bg">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <div className="container futuristic-bg">
      <h2 className="mt-4 futuristic-text text-center">Welcome, {profile?.name}!</h2>
      <Row className="mt-5">
        <Col md={6}>
          <Card className="futuristic-card shadow-lg">
            <Card.Body>
              <h4>Your Points</h4>
              <h2 className="futuristic-highlight">{profile?.points || 0}</h2>
              <p>Redeem them for amazing rewards!</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="futuristic-card shadow-lg">
            <Card.Body>
              <h4>Get Started</h4>
              <ul>
                <li>Join a streaming room</li>
                <li>Create a playlist</li>
                <li>Explore trending songs</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
