import React, { useRef, useState, useEffect, useContext } from 'react';
import Draggable from 'react-draggable';
import ReactPlayer from 'react-player/youtube';
import { Button } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import { UserContext } from '../context/UserContext';  // Correct import for UserContext




const PersistentAudioPlayer = ({ videoUrl, playing, onClose }) => {
  const { userId } = useContext(UserContext); // Get userId from context
  const playerRef = useRef(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [songName, setSongName] = useState('');

  const { user } = useContext(UserContext); // Accessing the user from context

  console.log('Signed-in user:', user); // Log to verify if user is available
  // Extract song title from YouTube oEmbed API
  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!videoUrl) return; // Exit if no URL is provided

      // Ensure the URL has a protocol. If it doesn't, prepend "https://"
      const formattedUrl = videoUrl.startsWith('http')
        ? videoUrl
        : `https://${videoUrl}`;

      // Use the noembed endpoint to retrieve video details
      const noembedUrl = `https://noembed.com/embed?url=${encodeURIComponent(formattedUrl)}`;

      try {
        const response = await axios.get(noembedUrl);
        if (response.data && response.data.title) {
          setSongName(response.data.title);
          console.log('Fetched video title:', response.data.title);
        } else {
          console.error('No title found in response:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch video details:', error);
      }
    };

    fetchVideoDetails();
  }, [videoUrl, setSongName]);
     
  // Update played seconds as the song plays
  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds);
  };

  const logListeningHistory = async () => {
    if (playedSeconds < 5) return;
  
    console.log("Logging listening history:", { userId, videoUrl, songName, playedSeconds });
  
    try {
      await axiosInstance.post("http://localhost:3001/api/songs/log", {
        videoUrl, 
        songName,          
        secondsListened: Math.round(playedSeconds),
      });
      console.log("Listening history logged successfully");
    } catch (error) {
      console.error("Failed to log listening history", error);
    }
  };
  
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
          onProgress={handleProgress}
          onPause={logListeningHistory}
          onEnded={logListeningHistory}
        />
        <div className="mt-2 text-center">
          <Button variant="outline-light" size="sm" onClick={() => { logListeningHistory(); onClose(); }}>
            Close Player
          </Button>
        </div>
      </div>
    </Draggable>
  );
};

export default PersistentAudioPlayer;
