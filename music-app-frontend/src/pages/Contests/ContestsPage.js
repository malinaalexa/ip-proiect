import React, { useEffect, useState } from 'react';
import ContestService from '../../api/contestService';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import './Contests.css';

const ContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const data = await ContestService.getAllContests();
        setContests(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch contests', error);
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center futuristic-bg">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <Container className="futuristic-bg">
      <h2 className="mt-4 futuristic-text text-center">Active Contests</h2>
      <p className="text-center futuristic-subtext">
        Compete with others and earn points by participating in these exciting contests!
      </p>
      <Row className="mt-4">
        {contests.length > 0 ? (
          contests.map((contest) => (
            <Col md={6} lg={4} key={contest.id} className="mb-4">
              <Card className="contest-card shadow-lg">
                <Card.Body>
                  <Card.Title className="text-light">{contest.name}</Card.Title>
                  <Card.Text>
                    <strong>Start:</strong> {new Date(contest.startTime).toLocaleString()} <br />
                    <strong>End:</strong> {new Date(contest.endTime).toLocaleString()}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => (window.location.href = `/contests/${contest.id}`)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center futuristic-subtext mt-5">No contests available at the moment.</p>
        )}
      </Row>
    </Container>
  );
};

export default ContestsPage;
