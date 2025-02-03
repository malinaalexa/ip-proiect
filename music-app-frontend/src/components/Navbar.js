import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          MusicApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/playlists">
                Playlists
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/songs">
                Songs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rooms">
                Streaming Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contests">
                Contests
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rewards">
                Rewards
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
