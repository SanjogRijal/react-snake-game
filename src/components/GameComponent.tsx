import { useEffect, useState } from "react";
import ScoreComponent from "./Score";
import GameSubComponents from "./GameSubComponents";
import { useDeviceType } from "@/hooks/useDeviceType";
// import { useDeviceType } from "@/hooks/useDeviceType";

export default function GameComponent() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [collisionType, setCollisionType] = useState("");
  const isMobile = useDeviceType();
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
    const handleTap = () => {
      if (gameOver) {
        handleResetGame();
      }
    };
    window.addEventListener("keydown", handleKeyPressed);
    if (isMobile) {
      window.addEventListener("click", handleTap);
    }
  }, [gameOver, isMobile]);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ScoreComponent score={score} highScore={highScore} />
      {gameOver ? (
        <div className="flex flex-col items-center bg-red-500 text-white p-6 rounded-lg shadow-lg mt-8">
          <p className="text-2xl font-bold">
            Game Over!{" "}
            <span className="italic text-yellow-200">
              {collisionType === "wall"
                ? "You hit the wall"
                : "You ate yourself"}
            </span>
          </p>
          <p className="mt-4 text-lg">
            Press <span className="font-semibold text-yellow-300">Enter</span>{" "}
            to restart the game
          </p>
        </div>
      ) : (
        <GameSubComponents
          score={score}
          setScore={setScore}
          onGameOver={(type: string) => handleGameOver(type)}
        />
      )}
    </div>
  );
}
