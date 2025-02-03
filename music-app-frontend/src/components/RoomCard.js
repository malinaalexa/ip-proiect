import React from 'react';

const RoomCard = ({ room, onJoin }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Room {room.id}</h5>
        <p className="card-text">
          <strong>Host:</strong> {room.hostId}
        </p>
        <p className="card-text">
          <strong>Playlist ID:</strong> {room.playlistId}
        </p>
        <button className="btn btn-success" onClick={() => onJoin(room.id)}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
