-- Terminate all active connections and recreate the database
USE master;
GO
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'MusicAppDB')
BEGIN
    ALTER DATABASE MusicAppDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE MusicAppDB;
END
GO
CREATE DATABASE MusicAppDB;
GO
USE MusicAppDB;
GO

-- Users Table
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    name NVARCHAR(100) NOT NULL,
    favorite_genres NVARCHAR(MAX),
    favorite_artists NVARCHAR(MAX),
    favorite_songs NVARCHAR(MAX),
    points INT DEFAULT 0,
    badges NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Songs Table
CREATE TABLE Songs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    artist NVARCHAR(100) NOT NULL,
    genres NVARCHAR(MAX),
    link NVARCHAR(MAX),
    popularity INT DEFAULT 0
);

-- Playlists Table
CREATE TABLE Playlists (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    name NVARCHAR(100) NOT NULL,
    songs NVARCHAR(MAX), -- Store as a JSON array of song IDs
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Streaming Rooms Table
CREATE TABLE StreamingRooms (
    id INT IDENTITY(1,1) PRIMARY KEY,
    host_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    playlist_id INT NOT NULL REFERENCES Playlists(id) ON DELETE NO ACTION,
    active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);

-- Reactions Table (Updated)
CREATE TABLE Reactions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    room_id INT NOT NULL REFERENCES StreamingRooms(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES Users(id) ON DELETE NO ACTION,
    type NVARCHAR(50), -- e.g., "like", "love", "text"
    message NVARCHAR(MAX)
);

-- Contests Table
CREATE TABLE Contests (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    songs NVARCHAR(MAX), -- JSON array of song IDs
    participants NVARCHAR(MAX) -- JSON array of user IDs
);

-- Rewards Table
CREATE TABLE Rewards (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    image NVARCHAR(MAX),
    points_required INT NOT NULL,
    stock INT NOT NULL
);

-- Insert Mock Users
INSERT INTO Users (email, password, name, favorite_genres, favorite_artists, favorite_songs, points, badges) VALUES
('user1@example.com', 'password1', 'User One', '["Pop", "Rock"]', '["Artist A", "Artist B"]', '["1", "2"]', 120, '["First Listener"]'),
('user2@example.com', 'password2', 'User Two', '["Hip-Hop", "Classical"]', '["Artist C", "Artist D"]', '["3", "4"]', 250, '["Top Listener"]'),
('admin@example.com', 'adminpassword', 'Admin User', NULL, NULL, NULL, 0, NULL);

-- Insert Mock Songs
INSERT INTO Songs (name, artist, genres, link, popularity) VALUES
('Song 1', 'Artist A', '["Pop"]', 'https://example.com/song1', 100),
('Song 2', 'Artist B', '["Rock"]', 'https://example.com/song2', 75),
('Song 3', 'Artist C', '["Hip-Hop"]', 'https://example.com/song3', 50),
('Song 4', 'Artist D', '["Classical"]', 'https://example.com/song4', 25);

-- Insert Mock Playlists
INSERT INTO Playlists (user_id, name, songs) VALUES
(1, 'My Favorites', '["1", "2"]'),
(2, 'Chill Vibes', '["3", "4"]');

-- Insert Mock Streaming Rooms
INSERT INTO StreamingRooms (host_id, playlist_id) VALUES
(1, 1),
(2, 2);

-- Insert Mock Reactions
INSERT INTO Reactions (room_id, user_id, type, message) VALUES
(1, 1, 'like', NULL),
(1, 2, 'text', 'This is awesome!'),
(2, 1, 'love', NULL);

-- Insert Mock Contests
INSERT INTO Contests (name, start_time, end_time, songs, participants) VALUES
('Top Listener Contest', '2024-12-01 00:00:00', '2024-12-07 23:59:59', '["1", "2"]', '["1", "2"]'),
('Best Playlist Contest', '2024-12-10 00:00:00', '2024-12-20 23:59:59', '["3", "4"]', '["2"]');

-- Insert Mock Rewards
INSERT INTO Rewards (name, image, points_required, stock) VALUES
('Concert Ticket', 'https://example.com/concert.jpg', 200, 10),
('VIP Backstage Pass', 'https://example.com/vip.jpg', 500, 5);

-- Verify Data
SELECT * FROM Users;
SELECT * FROM Songs;
SELECT * FROM Playlists;
SELECT * FROM StreamingRooms;
SELECT * FROM Reactions;
SELECT * FROM Contests;
SELECT * FROM Rewards;
