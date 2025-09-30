# Source Start Online Chess Platform

Welcome to the Source Start Online Chess Platform repository! We're excited to have you as a potential contributor to our real-time multiplayer chess game built with React, TypeScript, Node.js, and WebSockets.

![Chess Platform Demo](https://via.placeholder.com/800x400/1e293b/ffffff?text=Chess+Platform+Demo)

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Features](#features)
- [API Documentation](#api-documentation)
- [How to Contribute](#how-to-contribute)
- [Issues and Feature Requests](#issues-and-feature-requests)

## Introduction

This repository contains a full-stack online chess platform featuring real-time multiplayer gameplay. The project consists of a React TypeScript frontend with a beautiful UI and a Node.js WebSocket backend for real-time game communication. As part of "Source Start," an open source event organized by CSI SPIT, we invite developers, game enthusiasts, and chess lovers to contribute to this project by adding new features, improving gameplay mechanics, enhancing the UI/UX, or optimizing the code.

## Project Structure

The project is organized into two main directories:

```
chess/
├── frontend/          # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   └── Chessboard.tsx
│   │   ├── pages/         # Page components
│   │   │   ├── Landing.tsx
│   │   │   └── Game.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   └── vite.config.ts
│
└── backend-v1/        # Node.js + TypeScript + WebSocket backend
    ├── src/
    │   ├── index.ts       # WebSocket server setup
    │   ├── GameManager.ts # Game room management
    │   ├── Game.ts        # Chess game logic
    │   └── messages.ts    # WebSocket message types
    ├── package.json
    └── tsconfig.json
```

## Getting Started

To get started with the project, follow these steps:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Basic knowledge of TypeScript, React, and WebSockets

### 1. Fork and Clone

1. **Fork the Repository:** Click the "Fork" button on the top right corner of this repository.

2. **Clone Your Fork:**
   ```bash
   git clone https://github.com/your-username/chess.git
   cd chess
   ```

### 2. Setup Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend-v1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the TypeScript code:**
   ```bash
   npm run build
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   The WebSocket server will start on `ws://localhost:8080`

### 3. Setup Frontend

1. **Navigate to frontend directory (in a new terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

### 4. Play Chess!

1. Open two browser tabs/windows at `http://localhost:5173`
2. Click "Play Online" on both tabs
3. The game will automatically match players and start!

## Features

### ✅ Currently Implemented
- **Real-time Multiplayer:** WebSocket-based real-time chess gameplay
- **Modern UI:** Beautiful, responsive React frontend with Tailwind CSS
- **Chess Logic:** Complete chess game logic using chess.js library
- **Player Matching:** Automatic player pairing system
- **Interactive Chessboard:** Drag-and-drop piece movement
- **Game State Management:** Proper game state synchronization

### 🚧 In Development
- User authentication system
- Game history and statistics
- Spectator mode
- Chat functionality

## API Documentation

### WebSocket Messages

The backend uses WebSocket for real-time communication:

#### Client to Server Messages
```typescript
// Initialize a new game
{
  type: "init_game"
}

// Make a move
{
  type: "move",
  move: {
    from: "e2",
    to: "e4"
  }
}
```

#### Server to Client Messages
```typescript
// Game started
{
  type: "game_started",
  color: "white" | "black"
}

// Move made
{
  type: "move",
  move: Move
}

// Game over
{
  type: "game_over",
  winner: "white" | "black" | "draw"
}
```

## How to Contribute

We welcome and encourage contributions from the community! To contribute:

1. **Create a New Branch:**
   ```bash
   git checkout -b feature/my-awesome-feature
   ```

2. **Make Your Changes:** Work on your contribution and test thoroughly.

3. **Commit Your Changes:**
   ```bash
   git commit -m "Add: Description of your feature"
   ```

4. **Push to Your Fork:**
   ```bash
   git push origin feature/my-awesome-feature
   ```

5. **Create a Pull Request:** Submit a PR with a detailed description of your changes.

## Issues and Feature Requests

### 🐛 Known Issues
1. **Play Game Feature Not Working** - The main gameplay functionality is currently broken and needs fixing
2. **Player Disconnection Handling** - Game doesn't handle player disconnections gracefully
3. **Move Validation** - Frontend doesn't validate moves before sending to server
4. **Game Timer** - No timer implementation for timed games
5. **Mobile Responsiveness** - Chessboard needs better mobile optimization
6. **Game History** - No move history or game replay functionality

### 🆕 Feature Requests

#### 🎯 Beginner-Friendly Features
- **User Registration/Login System** - Add authentication with JWT
- **Player Profiles** - Create user profiles with avatars and stats
- **Game Timer** - Add chess clock functionality with different time controls
- **Move History Panel** - Display game moves in algebraic notation
- **Captured Pieces Display** - Show captured pieces for each player
- **Game Settings** - Allow players to choose time controls and game variants

#### 🔥 Intermediate Features
- **Spectator Mode** - Allow users to watch ongoing games
- **Private Games** - Create private game rooms with invites
- **Chat System** - Real-time chat during games
- **Game Analysis** - Post-game analysis with best moves
- **Rating System** - ELO rating system for players
- **Tournament Mode** - Organize tournaments with brackets

#### 🚀 Advanced Features
- **AI Opponent** - Integrate Stockfish or similar chess engine
- **Puzzle Mode** - Daily chess puzzles with solutions
- **Video Streaming** - Allow players to stream their games
- **Mobile App** - React Native mobile application
- **Advanced Analytics** - Game statistics and performance tracking
- **Live Commentary** - Allow commentators for tournament games

### 🔧 Technical Improvements
- **Database Integration** - Add PostgreSQL/MongoDB for data persistence
- **Redis Caching** - Implement caching for better performance
- **Docker Support** - Containerize the application
- **CI/CD Pipeline** - Set up automated testing and deployment
- **Unit Testing** - Add comprehensive test coverage
- **Error Handling** - Improve error handling and user feedback
- **Security** - Add rate limiting, input validation, and security headers
- **Performance** - Optimize WebSocket connections and game state management

### 🎨 UI/UX Improvements
- **Dark/Light Theme** - Add theme switching capability
- **Sound Effects** - Add chess piece movement sounds
- **Animations** - Smooth piece movement animations
- **Board Themes** - Multiple chessboard and piece themes
- **Accessibility** - Improve keyboard navigation and screen reader support
- **Loading States** - Better loading indicators and error states

## Quick Start for Contributors

### For Frontend Developers
1. Focus on `frontend/src/components/` and `frontend/src/pages/`
2. Use Tailwind CSS for styling
3. Implement responsive design patterns
4. Follow React best practices and hooks

### For Backend Developers
1. Work in `backend-v1/src/`
2. Extend the GameManager and Game classes
3. Add new WebSocket message types in `messages.ts`
4. Focus on scalability and performance

### For Full-Stack Developers
1. Work on features that require both frontend and backend changes
2. Ensure proper WebSocket communication
3. Implement end-to-end functionality

---

Thank you for participating in "Source Start" organized by CSI SPIT! We look forward to your contributions to help make this chess platform the best online chess experience. Whether you're a beginner learning web development or an experienced developer, there's something for everyone to contribute. Let's build something amazing together! ♟️👑

**Happy coding and happy chess playing!** 🎯♟️