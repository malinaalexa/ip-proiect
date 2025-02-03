import React, { useEffect, useState } from 'react';
import SongService from '../../api/songService';
import SongCard from '../../components/SongCard';
import { Container, Row, Col, Spinner, InputGroup, FormControl } from 'react-bootstrap';

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await SongService.getAllSongs();
        setSongs(data);
        setFilteredSongs(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch songs', error);
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const searchResults = songs.filter((song) =>
      song.name.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSongs(searchResults);
  }, [search, songs]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container futuristic-bg">
      <h2 className="mt-4 text-center">Browse Songs</h2>
      <InputGroup className="mb-4 mt-3">
        <FormControl
          placeholder="Search by song or artist..."
          value={search}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <Row>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <Col md={4} sm={6} xs={12} key={song.id} className="mb-4">
              <SongCard song={song} onPlay={(link) => window.open(link, '_blank')} />
            </Col>
          ))
        ) : (
          <p className="text-center mt-5">No songs found!</p>
        )}
      </Row>
    </div>
  );
};

export default SongsPage;
