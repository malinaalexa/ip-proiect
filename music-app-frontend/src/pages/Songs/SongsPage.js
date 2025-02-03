// src/pages/SongsPage.js
import React, { useEffect, useState } from 'react';
import SongService from '../../api/songService';
import SongCard from '../../components/SongCard';
import { Container, Row, Col, Spinner, InputGroup, FormControl } from 'react-bootstrap';

const SongsPage = ({ startAudio }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Using a default search term or however you want to load songs
        const data = await SongService.getSongs('popular songs');
        setSongs(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch songs', error);
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const searchSongs = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const data = await SongService.getSongs(search);
      setSongs(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch songs', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="futuristic-bg">
      <h2 className="mt-4 text-center">Browse Songs</h2>
      <InputGroup className="mb-4 mt-3">
        <FormControl
          placeholder="Search by song or artist..."
          value={search}
          onChange={handleSearchChange}
          onKeyPress={(e) => e.key === 'Enter' && searchSongs()}
        />
      </InputGroup>
      <Row>
        {songs.length > 0 ? (
          songs.map((song) => (
            <Col md={4} sm={6} xs={12} key={song.id} className="mb-4">
              <SongCard song={song} onPlay={startAudio} />
            </Col>
          ))
        ) : (
          <p className="text-center mt-5">No songs found!</p>
        )}
      </Row>
    </Container>
  );
};

export default SongsPage;
