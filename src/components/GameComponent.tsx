import { useEffect, useState } from "react";
import ScoreComponent from "./Score";
import GameSubComponents from "./GameSubComponents";

export default function GameComponent() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [collisionType, setCollisionType] = useState("");

  const handleGameOver = (type: string) => {
    setGameOver(true);

    if (score > highScore) {
      setHighScore(score);
    }
    setCollisionType(type);
  };

  const handleResetGame = () => {
    setScore(0);
    setGameOver(false);
  };
  useEffect(() => {
    const handleKeyPressed = (e: { key: string }) => {
      if (gameOver && e.key === "Enter") {
        handleResetGame();
      }
    };
    window.addEventListener("keydown", handleKeyPressed);
  }, [gameOver]);
  return (
    <div>
      <ScoreComponent score={score} highScore={highScore} />
      {gameOver && (
        <div>
          <p>
            Game Over!{" "}
            {collisionType === "wall" ? "You hit the wall" : "You ate yourself"}
            !
          </p>
          <p>Please press enter to reset the game</p>
        </div>
      )}
      {!gameOver && (
        <GameSubComponents
          score={score}
          setScore={setScore}
          onGameOver={(type: string) => handleGameOver(type)}
        />
      )}
    </div>
  );
}
