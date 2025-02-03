#!/bin/bash

# Define folders
folders=(
  "public"
  "src/api"
  "src/components"
  "src/models"
  "src/pages/Auth"
  "src/pages/Dashboard"
  "src/pages/Playlists"
  "src/pages/Songs"
  "src/pages/Rooms"
  "src/pages/Contests"
  "src/pages/Rewards"
  "src/routes"
  "src/styles"
)

# Define files
files=(
  "src/api/authService.js"
  "src/api/userService.js"
  "src/api/playlistService.js"
  "src/api/songService.js"
  "src/api/roomService.js"
  "src/api/contestService.js"
  "src/api/rewardService.js"
  "src/components/Navbar.js"
  "src/components/Footer.js"
  "src/components/PlaylistCard.js"
  "src/components/SongCard.js"
  "src/components/RoomCard.js"
  "src/components/UserCard.js"
  "src/models/UserModel.js"
  "src/models/PlaylistModel.js"
  "src/models/SongModel.js"
  "src/models/RoomModel.js"
  "src/models/ContestModel.js"
  "src/models/RewardModel.js"
  "src/pages/Auth/LoginPage.js"
  "src/pages/Auth/RegisterPage.js"
  "src/pages/Dashboard/HomePage.js"
  "src/pages/Dashboard/ProfilePage.js"
  "src/pages/Dashboard/LeaderboardPage.js"
  "src/pages/Playlists/PlaylistsPage.js"
  "src/pages/Playlists/PlaylistDetailsPage.js"
  "src/pages/Songs/SongsPage.js"
  "src/pages/Rooms/RoomsPage.js"
  "src/pages/Rooms/RoomDetailsPage.js"
  "src/pages/Contests/ContestsPage.js"
  "src/pages/Contests/ContestDetailsPage.js"
  "src/pages/Rewards/RewardsPage.js"
  "src/pages/Rewards/RewardDetailsPage.js"
  "src/App.js"
  "src/index.js"
  "src/routes/AppRoutes.js"
  "src/styles/main.css"
)

# Create folders
for folder in "${folders[@]}"; do
  if [ ! -d "$folder" ]; then
    mkdir -p "$folder"
    echo "Created folder: $folder"
  else
    echo "Folder already exists: $folder"
  fi
done

# Create files
for file in "${files[@]}"; do
  if [ ! -f "$file" ]; then
    touch "$file"
    echo "Created file: $file"
  else
    echo "File already exists: $file"
  fi
done

# Confirm structure creation
echo "Project structure created successfully."
