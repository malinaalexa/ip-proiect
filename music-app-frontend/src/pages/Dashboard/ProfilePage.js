import React, { useEffect, useState } from 'react';
import UserService from '../../api/userService';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import './Dashboard.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState('');
  const [artists, setArtists] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await UserService.getProfile();
        setProfile(data);
        setGenres(data.favoriteGenres.join(', '));
        setArtists(data.favoriteArtists.join(', '));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await UserService.updateProfile({ favoriteGenres: genres.split(', '), favoriteArtists: artists.split(', ') });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center futuristic-bg">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <Container className="futuristic-bg page">
      <h2 className="mt-4 futuristic-text text-center">Your Profile</h2>
      <Card className="futuristic-card shadow-lg mt-4">
        <Card.Body>
          <h4>{profile?.name}</h4>
          <p>Email: {profile?.email}</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Favorite Genres</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Pop, Rock"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Favorite Artists</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Artist A, Artist B"
                value={artists}
                onChange={(e) => setArtists(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
