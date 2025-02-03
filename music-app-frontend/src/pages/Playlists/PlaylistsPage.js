import React, { useEffect, useState } from 'react';
import PlaylistService from '../../api/playlistService';
import PlaylistCard from '../../components/PlaylistCard';

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);

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
    console.log(`Playlist selected: ${playlistId}`);
    window.location.href = `/playlists/${playlistId}`; // Navigate to Playlist Details Page
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
