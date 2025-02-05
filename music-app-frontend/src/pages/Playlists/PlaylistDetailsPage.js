import React, { useEffect, useState, useContext } from 'react';
import PlaylistService from '../../api/playlistService';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup, Spinner, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import PersistentAudioPlayer from '../../components/PersistentAudioPlayer'; // Import PersistentAudioPlayer
import { UserContext } from '../../context/UserContext';  // If needed for user context
import './PlaylistDetails.css';

const PlaylistDetailsPage = () => {
  const { id } = useParams(); // Retrieve playlist ID from the URL
  const { userId } = useContext(UserContext); // Get userId if needed
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);  // State to hold the video URL to play
  const [isPlaying, setIsPlaying] = useState(false);  // Manage whether the player is playing or not
  const [search, setSearch] = useState('');  // Search term for filtering songs

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

  // Handle playing a video (this will trigger the PersistentAudioPlayer)
  const handlePlay = (videoUrl) => {
    setVideoUrl(videoUrl); // Set the video URL that we will play in the player
    setIsPlaying(true); // Start playing the player
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredSongs = playlist
    ? playlist.songs.filter((song) => song.toLowerCase().includes(search.toLowerCase()))
    : [];

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
          <p className="futuristic-subtext">This playlist contains <strong>{playlist.songs.length}</strong> songs.</p>
          
          <InputGroup className="mb-4 mt-3">
            <FormControl
              placeholder="Search for a song..."
              value={search}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Row>
            {filteredSongs.length > 0 ? (
              filteredSongs.map((videoUrl, index) => (
                <Col md={4} sm={6} xs={12} key={index} className="mb-4">
                  <Card className="song-card bg-dark text-light">
                    <Card.Body>
                      <h5>YouTube Video {index + 1}</h5>
                      <p className="text-muted mb-2">{videoUrl}</p>
                      <Button variant="primary" size="sm" onClick={() => handlePlay(videoUrl)}>
                        Play
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center mt-5">No songs found!</p>
            )}
          </Row>
        </Card.Body>
      </Card>

      {/* Persistent Audio Player */}
      {isPlaying && videoUrl && (
        <PersistentAudioPlayer
          videoUrl={videoUrl}
          playing={isPlaying}
          onClose={() => setIsPlaying(false)} // Close the player on close button
        />
      )}
    </Container>
  );
};

export default PlaylistDetailsPage;
