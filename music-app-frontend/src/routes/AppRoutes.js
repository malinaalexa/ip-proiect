import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import Auth Pages
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';

// Import Dashboard Pages
import HomePage from '../pages/Dashboard/HomePage';
import ProfilePage from '../pages/Dashboard/ProfilePage';
import LeaderboardPage from '../pages/Dashboard/LeaderboardPage';

// Import Playlists Pages
import PlaylistsPage from '../pages/Playlists/PlaylistsPage';
import PlaylistDetailsPage from '../pages/Playlists/PlaylistDetailsPage';

// Import Songs Pages
import SongsPage from '../pages/Songs/SongsPage';

// Import Rooms Pages
import RoomsPage from '../pages/Rooms/RoomsPage';
import RoomDetailsPage from '../pages/Rooms/RoomDetailsPage';

// Import Contests Pages
import ContestsPage from '../pages/Contests/ContestsPage';
import ContestDetailsPage from '../pages/Contests/ContestDetailsPage';

// Import Rewards Pages
import RewardsPage from '../pages/Rewards/RewardsPage';
import RewardDetailsPage from '../pages/Rewards/RewardDetailsPage';

// Authentication Wrapper for Protected Routes
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Replace with a proper auth check
  return isAuthenticated ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            }
          />

          {/* Playlist Routes */}
          <Route
            path="/playlists"
            element={
              <ProtectedRoute>
                <PlaylistsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlists/:id"
            element={
              <ProtectedRoute>
                <PlaylistDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* Songs Routes */}
          <Route
            path="/songs"
            element={
              <ProtectedRoute>
                <SongsPage />
              </ProtectedRoute>
            }
          />

          {/* Streaming Rooms Routes */}
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <RoomsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms/:id"
            element={
              <ProtectedRoute>
                <RoomDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* Contests Routes */}
          <Route
            path="/contests"
            element={
              <ProtectedRoute>
                <ContestsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contests/:id"
            element={
              <ProtectedRoute>
                <ContestDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* Rewards Routes */}
          <Route
            path="/rewards"
            element={
              <ProtectedRoute>
                <RewardsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rewards/:id"
            element={
              <ProtectedRoute>
                <RewardDetailsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
