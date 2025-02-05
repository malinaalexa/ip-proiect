import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import PlaylistService from '../../api/playlistService';
import PlaylistCard from '../../components/PlaylistCard';
import AuthService from '../../api/authService'; // Import the AuthService to get user data

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userId, setUserId] = useState(null); // State to store the user's ID
  const navigate = useNavigate();

  // Fetch the current user on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AuthService.getProfile(); // Get user profile from AuthService
        if (user) {
          setUserId(user.id); // Store the user's ID
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await PlaylistService.getAllPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error('Failed to fetch playlists', error);
      }
    };
    fetchPlaylists();
  }, []);

  const handleSelect = (playlistId) => {
    console.log('Navigating to playlist:', playlistId);
    navigate(`/playlists/${playlistId}`);
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim() || !userId) {
      console.error('Invalid userId or playlist name:', { userId, newPlaylistName });
      return;  // Prevent empty playlist creation or invalid user
    }
  
    try {
      // Ensure user_id and name are correctly passed
      const newPlaylist = await PlaylistService.createPlaylist({
        user_id: userId,  // Use the userId fetched from AuthService
        name: newPlaylistName,
        songs: []  // Empty playlist for now
      });
  
      setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
      setNewPlaylistName('m');
      setShowCreateForm(false); 
    } catch (error) {
      console.error('Failed to create playlist', error);
    }
  };
  

  return (
    <div className="container futuristic-bg">
      <h2 className="futuristic-text text-center">Playlists</h2>

      {/* Button to toggle the create playlist form */}
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Playlist'}
        </button>
      </div>

      {/* Form for creating a playlist */}
      {showCreateForm && (
        <div className="text-center mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button
            className="btn btn-success mt-2"
            onClick={handleCreatePlaylist}
          >
            Create Playlist
          </button>
        </div>
      )}

      <div className="row">
        {playlists.map((playlist) => (
          <div className="col-md-4 mb-4" key={playlist.id}>
            <PlaylistCard playlist={playlist} onSelect={handleSelect} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsPage;
