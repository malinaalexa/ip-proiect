import React, { useEffect, useState } from 'react';
import RoomService from '../../api/roomService';
import { Container, Spinner, Card, Button, Form, Row, Col } from 'react-bootstrap';

const RoomDetailsPage = ({ match }) => {
  const roomId = match.params.id;
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomData = await RoomService.getRoomDetails(roomId); // Add this method in `roomService`
        setRoom(roomData);
        setChat(roomData.chat || []); // Chat feature (optional)
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch room details', error);
        setLoading(false);
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMessage = { user: 'You', text: message };
    setChat([...chat, newMessage]); // Update chat locally
    setMessage('');
    // Here, you can add logic to send the message to the backend
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container>
      <h2 className="mt-4 futuristic-text">Room #{room.id}</h2>
      <p className="text-center futuristic-subtext">Playlist: {room.playlistId}</p>
      <Card className="mt-4 shadow-lg">
        <Card.Body>
          <h5>Host: {room.hostId}</h5>
          <p>Status: {room.active ? 'Active' : 'Inactive'}</p>
        </Card.Body>
      </Card>
      <div className="mt-5">
        <h4>Chat</h4>
        <div className="chat-box border rounded p-3 mb-3" style={{ height: '300px', overflowY: 'auto' }}>
          {chat.length > 0 ? (
            chat.map((msg, index) => (
              <p key={index}>
                <strong>{msg.user}:</strong> {msg.text}
              </p>
            ))
          ) : (
            <p className="text-muted">No messages yet.</p>
          )}
        </div>
        <Form>
          <Row>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Col>
            <Col sm={3}>
              <Button variant="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default RoomDetailsPage;
