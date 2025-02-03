import React from "react";
import { Card, Button } from "react-bootstrap";

const SongCard = ({ song, onPlay }) => {
  return (
    <Card className="text-center">
      <Card.Img variant="top" src={song.thumbnail} alt={song.name} />
      <Card.Body>
        <Card.Title>{song.name}</Card.Title>
        <Card.Text>{song.artist}</Card.Text>
        <Button variant="primary" onClick={onPlay}>
          Play
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SongCard;
