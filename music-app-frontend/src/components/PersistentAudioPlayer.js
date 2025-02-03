import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import ReactPlayer from 'react-player/youtube';
import { Button } from 'react-bootstrap';

const PersistentAudioPlayer = ({ videoUrl, playing, onClose }) => {
  // Create a reference to the draggable element
  const playerRef = useRef(null);

  return (
    <Draggable nodeRef={playerRef}>
      <div 
        ref={playerRef}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '320px',
          backgroundColor: '#333',
          padding: '10px',
          borderRadius: '8px',
          zIndex: 1000,
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}
      >
        <ReactPlayer
          url={videoUrl}
          playing={playing}
          controls
          width="100%"
          height="180px"
        />
        <div className="mt-2 text-center">
          <Button variant="outline-light" size="sm" onClick={onClose}>
            Close Player
          </Button>
        </div>
      </div>
    </Draggable>
  );
};

export default PersistentAudioPlayer;
