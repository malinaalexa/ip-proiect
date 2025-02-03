import React, { useEffect, useState } from 'react';
import PlaylistService from '../../api/playlistService';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup, Spinner, Button } from 'react-bootstrap';
import './PlaylistDetails.css';

const PlaylistDetailsPage = () => {
  const { id } = useParams(); // Retrieve playlist ID from the URL
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const data = await PlaylistService.getPlaylistDetails(id);
        setPlaylist(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch playlist details', error);
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center futuristic-bg">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="d-flex justify-content-center align-items-center futuristic-bg">
        <h4 className="futuristic-subtext">Playlist not found.</h4>
      </div>
    );
  }

  return (
    <Container className="futuristic-bg mt-4">
      <Card className="playlist-details-card shadow-lg">
        <Card.Body>
          <h2 className="futuristic-text">{playlist.name}</h2>
          <p className="futuristic-subtext">
            This playlist contains <strong>{playlist.songs.length}</strong> songs.
          </p>
          <ListGroup variant="flush">
            {playlist.songs.map((song, index) => (
              <ListGroup.Item key={index} className="song-item bg-dark text-light">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{song.name}</h5>
                    <p className="text-muted mb-0">Artist: {song.artist}</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => window.open(song.link, '_blank')}
                  >
                    Play
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PlaylistDetailsPage;
