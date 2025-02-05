import React, { useEffect, useState } from 'react';
import SongService from '../../api/songService';
import SongCard from '../../components/SongCard';
import { 
  Container, 
  Row, 
  Col, 
  Spinner, 
  InputGroup, 
  FormControl, 
  Button, 
  Dropdown, 
  DropdownButton 
} from 'react-bootstrap';
import PlaylistService from '../../api/playlistService';

const SongsPage = ({ startAudio }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // State to store playlists and selected playlist
  const [playlistData, setPlaylistData] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await SongService.getSongs('popular songs');
        setSongs(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch songs', error);
        setLoading(false);
      }
    };

    const fetchPlaylists = async () => {
      try {
        const data = await PlaylistService.getAllPlaylists();
        setPlaylistData(data);
      } catch (error) {
        console.error('Failed to fetch playlists', error);
      }
    };

    fetchSongs();
    fetchPlaylists();
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

  // Handle playlist selection from dropdown
  const handlePlaylistSelection = (playlistId) => {
    const selected = playlistData.find((playlist) => playlist.id === parseInt(playlistId, 10));
    setSelectedPlaylist(selected);
  };

  // Handle adding song to the selected playlist
  const handleAddToPlaylist = async (song) => {
    if (!selectedPlaylist) {
      alert("Please select a playlist first.");
      return;
    }
  
    try {
      // Make sure song has necessary properties (id, name, url)
      const songData = {
        id: song.id, // Assuming the song object has an ID
        name: song.name, // Ensure name exists
        url: song.url, // Ensure URL exists
      };

      // Add song to playlist
      await PlaylistService.addSongToPlaylist(selectedPlaylist.id, songData); 
      alert("Song added to playlist successfully!");
    } catch (error) {
      console.error("Failed to add song to playlist", error);
      alert("Failed to add song to playlist");
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

      {/* Playlist Selection Dropdown */}
      <div className="mb-3">
        <h5>Select Playlist</h5>
        <DropdownButton
          id="dropdown-basic-button"
          title={selectedPlaylist ? selectedPlaylist.name : 'Select Playlist'}
          onSelect={handlePlaylistSelection}
          disabled={playlistData.length === 0}
        >
          {playlistData.length > 0 ? (
            playlistData.map((playlist) => (
              <Dropdown.Item key={playlist.id} eventKey={playlist.id}>
                {playlist.name}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No playlists available</Dropdown.Item>
          )}
        </DropdownButton>
      </div>

      {/* Search Bar */}
      <InputGroup className="mb-4 mt-3">
        <FormControl
          placeholder="Search by song or artist..."
          value={search}
          onChange={handleSearchChange}
          onKeyPress={(e) => e.key === 'Enter' && searchSongs()}
        />
      </InputGroup>

      {/* Song List */}
      <Row>
        {songs.length > 0 ? (
          songs.map((song) => (
            <Col md={4} sm={6} xs={12} key={song.id} className="mb-4">
              <SongCard song={song} onPlay={startAudio} />
              {/* Add to Playlist Button */}
              <Button
                variant="success"
                size="sm"
                className="mt-2"
                onClick={() => handleAddToPlaylist(song)} // Pass the entire song object
              >
                Add to Playlist
              </Button>
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
