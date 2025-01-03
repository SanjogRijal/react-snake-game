# Snake Game

This is a classic **Snake Game** developed by **Sanjog Rijal** using **Next.js** and **HTML5 Canvas**. The game offers a simple, yet fun experience of controlling a snake that grows in size as it eats food while avoiding collisions with the walls and itself.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Gameplay](#gameplay)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can try out the Snake game here:  
**[Link to the demo](https://react-snake-game-eight.vercel.app/)**

## Features

- Classic Snake gameplay with a growing snake.
- Smooth and responsive controls using keyboard arrow keys or WASD keys.
- Random food generation to increase snake length.
- Game-over detection when the snake collides with the walls or itself.
- Score tracking with a simple scoreboard.

## Technologies Used

- **Next.js**: A React-based framework for building server-rendered or statically exported web applications.
- **HTML5 Canvas**: Used for rendering the game visuals and animating the snake and food.
- **JavaScript (ES6)**: Core language for game logic and interactivity.

## Installation

To run the Snake Game locally on your machine, follow the steps below:

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher). You can check if you have Node.js installed by running:

  ```bash
  node -v
npm (comes with Node.js) for managing dependencies.
Steps to Install and Run
Clone the repository to your local machine:

**Copy Code**
```bash
git clone https://github.com/your-username/snake-game.git```

**Navigate into the project directory**

```bash
Copy code
cd snake-game```

**Install the required dependencies**:

```bash
Copy code
npm install```

Start the development server:
```bash
Copy code
npm run dev```

Open your browser and go to http://localhost:3000 to play the game!

Gameplay
Use the arrow keys (←, ↑, ↓, →) or WASD keys to control the movement of the snake.
Your goal is to eat the randomly generated food to make the snake grow.
The game ends when the snake collides with the wall or itself.
Development
Folder Structure
The project follows a simple structure:

/pages: Contains the React components for the pages in your app.
/index.js: The main page with the game rendered using the <canvas> element.
/public: Static files like images, favicon, etc.
/styles: Contains CSS styles for the game layout and design.
Game Logic
The game uses Typescript/Javascript functions to control the snake's movement, generate food, detect collisions, and track the score. The game is rendered and animated using the HTML5 <canvas> API, with smooth animation using requestAnimationFrame.

License
This project is open-source and available under the MIT License.
