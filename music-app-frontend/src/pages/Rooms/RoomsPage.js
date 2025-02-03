import React, { useEffect, useState } from 'react';
import RoomService from '../../api/roomService';
import RoomCard from '../../components/RoomCard';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await RoomService.getAllRooms(); // Add this method in `roomService`
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch rooms', error);
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className='futuristic-bg'>
      <h2 className="mt-4 text-center futuristic-text">Streaming Rooms</h2>
      <p className="text-center futuristic-subtext">
        Join a room to listen to music, chat, and experience shared playlists in real-time!
      </p>
      <Row className="mt-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Col md={4} sm={6} xs={12} key={room.id} className="mb-4">
              <RoomCard
                room={room}
                onJoin={(roomId) => (window.location.href = `/rooms/${roomId}`)}
              />
            </Col>
          ))
        ) : (
          <p className="text-center mt-5 futuristic-subtext">No active rooms at the moment!</p>
        )}
      </Row>
      <div className="text-center mt-5">
        <Button variant="success" size="lg" onClick={() => alert('Create Room Coming Soon!')}>
          Create New Room
        </Button>
      </div>
    </Container>
  );
};

export default RoomsPage;
