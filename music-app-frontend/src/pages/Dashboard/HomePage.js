import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "../../context/UserContext";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import "./Dashboard.css";
import axiosInstance from "../../api/axiosInstance";
const HomePage = () => {
  const { user, loading } = useUser();
  const [listeningMetrics, setListeningMetrics] = useState(null);

  // Fetch listening metrics using userId from UserContext
  const fetchListeningMetrics = useCallback(async () => {

    try {
      const response = await axiosInstance.get(`http://localhost:3001/api/songs/metrics`);

      
      setListeningMetrics(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching listening metrics:", error);
    }
  }, [user]);

  // Fetch metrics when user is available
  useEffect(() => {
    fetchListeningMetrics();
  }, [fetchListeningMetrics]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center futuristic-bg">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <div className="container futuristic-bg">
      <h2 className="mt-4 futuristic-text text-center">Welcome, {user?.name}!</h2>
      <Row className="mt-5">
        <Col md={6}>
          <Card className="futuristic-card shadow-lg">
            <Card.Body>
              <h4>Your Points</h4>
              <h2 className="futuristic-highlight">{user?.points || 0}</h2>
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

      {/* Listening Metrics */}
      <Row className="mt-5">
        <Col md={12}>
          <Card className="futuristic-card shadow-lg">
            <Card.Body>
              <h4>Listening Metrics</h4>
              {listeningMetrics && listeningMetrics.length > 0 ? (
                      <ul>
                        {listeningMetrics.map((song, index) => (
                          <li key={index}>
                            <strong>{song.song_name}</strong> - 
                            ({song.total_seconds} seconds)
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No listening metrics available.</p>
                    )}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
