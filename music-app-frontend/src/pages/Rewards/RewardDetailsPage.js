import React, { useEffect, useState } from 'react';
import RewardService from '../../api/rewardService';
import { Container, Spinner, Card, Button } from 'react-bootstrap';

const RewardDetailsPage = ({ match }) => {
  const rewardId = match.params.id;
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewardDetails = async () => {
      try {
        const data = await RewardService.getRewardDetails(rewardId); // Add this method in `rewardService`
        setReward(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch reward details', error);
        setLoading(false);
      }
    };
    fetchRewardDetails();
  }, [rewardId]);

  const handleRedeem = () => {
    if (reward.stock === 0) {
      alert('This reward is out of stock.');
      return;
    }
    // Here, you can add logic to redeem the reward via backend
    alert('Reward Redeemed!');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container>
      <h2 className="mt-4 futuristic-text">Reward Details</h2>
      <Card className="mt-4 reward-details-card shadow-lg">
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
            onClick={handleRedeem}
          >
            {reward.stock === 0 ? 'Out of Stock' : 'Redeem'}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RewardDetailsPage;
