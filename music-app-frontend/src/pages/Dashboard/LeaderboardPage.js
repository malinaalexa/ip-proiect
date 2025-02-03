import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import './Dashboard.css';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Simulating leaderboard data; replace with actual service call
        const mockLeaderboard = [
          { name: 'Alice', points: 1200 },
          { name: 'Bob', points: 1100 },
          { name: 'Charlie', points: 1000 },
        ];
        setLeaderboard(mockLeaderboard);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch leaderboard', error);
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center futuristic-bg">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <Container className="futuristic-bg page">
      <h2 className="mt-4 futuristic-text text-center">Leaderboard</h2>
      <Table striped bordered hover variant="dark" className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LeaderboardPage;
