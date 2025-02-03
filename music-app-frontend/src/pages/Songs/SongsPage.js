import React, { useState } from "react";
import SongService from "../../api/songService";
import SongCard from "../../components/SongCard";
import { InputGroup, FormControl, Row, Col, Spinner } from "react-bootstrap";

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => setSearch(e.target.value);

  const searchSongs = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const data = await SongService.getSongs(search);
      setSongs(data);
    } catch (error) {
      console.error("Failed to fetch songs", error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="mt-4 text-center">Search YouTube Songs</h2>
      <InputGroup className="mb-4 mt-3">
        <FormControl
          placeholder="Search for a song..."
          value={search}
          onChange={handleSearchChange}
          onKeyPress={(e) => e.key === "Enter" && searchSongs()}
        />
      </InputGroup>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {songs.length > 0 ? (
            songs.map((song) => (
              <Col md={4} sm={6} xs={12} key={song.id} className="mb-4">
                <SongCard song={song} onPlay={() => window.open(song.link, "_blank")} />
              </Col>
            ))
          ) : (
            <p className="text-center mt-5">No songs found!</p>
          )}
        </Row>
      )}
    </div>
  );
};

export default SongsPage;
