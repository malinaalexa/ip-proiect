import React, { useEffect, useState } from 'react';
import RewardService from '../../api/rewardService';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';

const RewardsPage = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const data = await RewardService.getAllRewards();
        setRewards(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch rewards', error);
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className='futuristic-bg'>
      <h2 className="mt-4 futuristic-text">Rewards</h2>
      <p className="text-center futuristic-subtext">
        Redeem your points for exclusive rewards. Choose wisely!
      </p>
      <Row className="mt-4">
        {rewards.length > 0 ? (
          rewards.map((reward) => (
            <Col md={4} sm={6} xs={12} key={reward.id} className="mb-4">
              <Card className="reward-card shadow-lg">
                <Card.Img variant="top" src={reward.image} alt={reward.name} className="reward-image" />
                <Card.Body>
                  <Card.Title>{reward.name}</Card.Title>
                  <Card.Text>
                    <strong>Points Required:</strong> {reward.pointsRequired}
                  </Card.Text>
                  <Card.Text>
                    <strong>Stock:</strong> {reward.stock}
                  </Card.Text>
                  <Button
                    variant="primary"
                    disabled={reward.stock === 0}
                    onClick={() => alert('Reward Redeemed!')}
                  >
                    {reward.stock === 0 ? 'Out of Stock' : 'Redeem'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center futuristic-subtext">No rewards available at the moment.</p>
        )}
      </Row>
    </Container>
  );
};

export default RewardsPage;
