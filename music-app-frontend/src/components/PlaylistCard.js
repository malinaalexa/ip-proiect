import React from 'react';

const PlaylistCard = ({ playlist, onSelect }) => {
  return (
    <div
      className="card playlist-card shadow-lg"
      onClick={() => onSelect && onSelect(playlist.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body">
        <h5 className="card-title text-primary">{playlist.name}</h5>
        <p className="card-text text-muted">
          {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;
