import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PlaylistService from '../../api/playlistService';
import PlaylistCard from '../../components/PlaylistCard';

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate(); // Use the hook here inside the component

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
    navigate(`/playlists/${playlistId}`); // Use navigate directly
  };

  return (
    <div className="container futuristic-bg">
      <h2 className="futuristic-text text-center">Playlists</h2>
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
