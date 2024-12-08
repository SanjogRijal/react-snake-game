import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { drawFood, drawSnake } from "@/utils";
import { useDeviceType } from "@/hooks/useDeviceType";
// import { useDeviceType } from "@/hooks/useDeviceType";

export default function GameSubComponents({
  score,
  setScore,
  onGameOver,
}: {
  onGameOver: any;
  score: number;
  setScore: any;
}) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const SNAKE_SPEED = 10;
  const [snake, setSnake] = useState([
    { x: 100, y: 50 },
    { x: 95, y: 50 },
  ]);
  const [food, setFood] = useState({
    x: 180,
    y: 50,
  });
  const [direction, setDirection] = useState<string | null>(null);
  const isMobile = useDeviceType();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const interval = setInterval(() => {
      (context as any)?.clearRect(0, 0, canvas?.width, canvas?.height);
      drawFood(context, food);
      drawSnake(context, snake);
      moveSnake();
    }, 100);

    const moveSnake = () => {
      if (direction) {
        setSnake((prevSnake: any) => {
          const newSnake = [...prevSnake];
          const head = { ...newSnake[0] };
          for (let i = newSnake.length - 1; i > 0; i--) {
            newSnake[i].x = newSnake[i - 1].x;
            newSnake[i].y = newSnake[i - 1].y;
          }

          switch (direction) {
            case "right":
              head.x += SNAKE_SPEED;
              break;
            case "left":
              head.x -= SNAKE_SPEED;
              break;
            case "up":
              head.y -= SNAKE_SPEED;
              break;
            case "down":
              head.y += SNAKE_SPEED;
              break;
            default:
              break;
          }

          newSnake[0] = head;
          handleCollisionWithFood(newSnake);
          handleWallCollision(head);
          handleBodyCollision(newSnake);

          return newSnake;
        });
      }
    };

    const handleCollisionWithFood = (newSnake: any[]) => {
      const head = newSnake[0];
      if (head.x === food.x && head.y === food.y) {
        setScore(score + 1);

        setFood({
          x:
            Math.floor(Math.random() * (canvas!.width / SNAKE_SPEED)) *
            SNAKE_SPEED,
          y:
            Math.floor(Math.random() * (canvas!.height / SNAKE_SPEED)) *
            SNAKE_SPEED,
        });
        const tail = newSnake[newSnake.length - 1];
        newSnake.push({
          x: tail.x,
          y: tail.y,
        });
      }
    };

    const handleWallCollision = (head: any) => {
      if (
        head.x + SNAKE_SPEED > (canvas as HTMLCanvasElement).width ||
        head.x < 0
      ) {
        onGameOver("wall");
      }
      if (
        head.y + SNAKE_SPEED > (canvas as HTMLCanvasElement).height ||
        head.y < 0
      ) {
        onGameOver("wall");
      }
    };

    const handleBodyCollision = (newSnake: any[]) => {
      const head = newSnake[0];
      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          onGameOver("self");
        }
      }
    };

    const handleKeyPressed = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          setDirection("right");
          break;
        case "ArrowLeft":
          setDirection("left");
          break;
        case "ArrowUp":
          setDirection("up");
          break;
        case "ArrowDown":
          setDirection("down");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPressed);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyPressed);
    };
  });

  const handleTouchControl = (newDirection: string) => {
    setDirection(newDirection);
  };

  return (
    <div>
      <canvas
        ref={canvasRef as any}
        width={600}
        height={300}
        className={styles.snakeGameCanvas}
      />
      {isMobile && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="control-button text-3xl mt-20 w-16 h-16 border-2 border-gray-400 bg-white text-gray-800 font-bold rounded-sm hover:bg-gray-100 focus:outline-none"
            onClick={() => handleTouchControl("left")}
          >
            ←
          </button>
          <div className="flex flex-col space-y-4">
            <button
              className="control-button text-3xl w-16 h-16 border-2 border-gray-400 bg-white text-gray-800 font-bold rounded-sm hover:bg-gray-100 focus:outline-none"
              onClick={() => handleTouchControl("up")}
            >
              ↑
            </button>
            <button
              className="control-button text-3xl w-16 h-16 border-2 border-gray-400 bg-white text-gray-800 font-bold rounded-sm hover:bg-gray-100 focus:outline-none"
              onClick={() => handleTouchControl("down")}
            >
              ↓
            </button>
          </div>
          <button
            className="control-button text-3xl w-16 mt-20 h-16 border-2 border-gray-400 bg-white text-gray-800 font-bold rounded-sm hover:bg-gray-100 focus:outline-none"
            onClick={() => handleTouchControl("right")}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
