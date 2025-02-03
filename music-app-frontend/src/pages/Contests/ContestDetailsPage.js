import React, { useEffect, useState } from 'react';
import ContestService from '../../api/contestService';
import { Container, Card, Button, Spinner, ListGroup } from 'react-bootstrap';
import './Contests.css';

const ContestDetailsPage = ({ match }) => {
  const contestId = match.params.id;
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const data = await ContestService.getContestDetails(contestId);
        setContest(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch contest details', error);
        setLoading(false);
      }
    };
    fetchContestDetails();
  }, [contestId]);

  const handleJoin = () => {
    alert('You have successfully joined the contest!');
    // Add API integration here for joining the contest.
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center futuristic-bg">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <Container className="futuristic-bg">
      <h2 className="mt-4 futuristic-text text-center">{contest.name}</h2>
      <Card className="futuristic-card shadow-lg mt-4">
        <Card.Body>
          <Card.Text>
            <strong>Start:</strong> {new Date(contest.startTime).toLocaleString()} <br />
            <strong>End:</strong> {new Date(contest.endTime).toLocaleString()}
          </Card.Text>
          <h5 className="mt-3 futuristic-highlight">Participating Songs</h5>
          <ListGroup variant="flush" className="mb-3">
            {contest.songs.map((song, index) => (
              <ListGroup.Item key={index} className="bg-dark text-light">
                {song}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="success" size="lg" className="w-100" onClick={handleJoin}>
            Join Contest
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContestDetailsPage;
