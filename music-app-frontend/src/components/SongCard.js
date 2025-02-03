import React from 'react';
import { Card, Button } from 'react-bootstrap';

const SongCard = ({ song, onPlay }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{song.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{song.artist}</Card.Subtitle>
        <Card.Text>
          <strong>Genres:</strong> {song.genres.join(', ')}
        </Card.Text>
        <Button variant="primary" onClick={() => onPlay(song.link)}>
          Play Song
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SongCard;
