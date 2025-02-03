#!/bin/bash

# Define folders
folders=(
  "config"
  "routes"
  "controllers"
  "models"
)

# Define files
files=(
  ".env"
  "index.js"
  "config/db.js"
  "routes/auth.js"
  "routes/user.js"
  "routes/playlist.js"
  "routes/song.js"
  "routes/streamingRoom.js"
  "routes/contest.js"
  "routes/reward.js"
  "controllers/authController.js"
  "controllers/userController.js"
  "controllers/playlistController.js"
  "controllers/songController.js"
  "controllers/streamingRoomController.js"
  "controllers/contestController.js"
  "controllers/rewardController.js"
  "models/queries.js"
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
