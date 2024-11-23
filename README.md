# 🚢 Battleship Game

A browser-based implementation of the classic Battleship game, developed using modern JavaScript techniques. This project incorporates principles of Object-Oriented Programming (OOP) and Test-Driven Development (TDD) to build an interactive game.

## ✨ Features

- 🎮 **Dynamic Gameboards**: Two 10x10 grids per player (one for their ships and one for attacking the opponent)
- 🖱️ **Interactive Gameplay**: Players can attack their opponent's board using clicks
- 🤖 **AI Opponent**: A computer player generates random attacks on the player's board
- 🛥️ **Ship Placement**: Ships are placed on the board with validation for overlapping and boundary constraints
- ⚙️ **Game Logic**: Handles hits, misses, and checks for game end conditions (all ships sunk)
- 🧪 **Tests**: Comprehensive unit tests for core game mechanics, ensuring functionality and preventing regressions

## 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/battleship.git
```

2. Navigate to the project directory:

```bash
cd battleship
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run start
```

5. To run tests:

```bash
npm run test
```

## 🎮 Gameplay Overview

### 🚤 Ship Placement

Each player places their ships on their own board.

### 💥 Attacking

Players take turns attacking each other's boards.

### 🏁 Game End

The game ends when one player's ships are all sunk.

## 🛠️ Technologies Used

- 📝 **JavaScript**: Core game logic
- 🎨 **HTML & CSS**: User interface
- 📦 **Webpack**: Module bundler
- ✅ **Jest**: Unit testing framework

## 🧪 Tests

The game logic is thoroughly tested using Jest. Here's an overview of the tests:

### 🚢 Ship Tests (`ship.test.js`)

- Tests for the `Ship` class:
  - Verifies that a new ship is not sunk
  - Ensures a hit increments the ship's hit counter
  - Verifies that a ship is sunk after the correct number of hits

### 🎯 Gameboard Tests (`gameboard.test.js`)

- Tests for the `Gameboard` class:
  - Ensures invalid ship placements
  - Checks correct horizontal and vertical ship placement
  - Prevents overlapping ship placements
  - Verifies hit and miss recording
  - Prevents multiple attacks on the same cell
  - Ensures game end condition when all ships are sunk

### 👥 Player Tests (`player.test.js`)

- Tests for the `Player` class:
  - Ensures a player is initialized with a gameboard
  - Verifies that players can attack the opponent's gameboard
  - Ensures the computer player generates valid random attacks

## 🚀 Future Improvements

- 🎯 Drag-and-Drop Ship Placement
- 🤖 Enhanced AI
- 📱 Responsive Design
