/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

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
  const SNAKE_SPEED = 20;
  const [snake, setSnake] = useState([
    { x: 100, y: 50 },
    { x: 95, y: 50 },
  ]);
  const [food, setFood] = useState({
    x: 100,
    y: 50,
  });

  const [direction, setDirection] = useState<string | null>(null);

  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  const handleWallCollision = (head: any) => {
    if (
      head.x + SNAKE_SPEED > (canvas as HTMLCanvasElement).width ||
      head.x + SNAKE_SPEED < 0
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

  useEffect(() => {
    const drawSnake = () => {
      snake.forEach((value) => {
        if (context) {
          context?.beginPath();
          (context as any)?.rect(value.x, value.y, 16, 16);
          if (context) (context as any).fillStyle = "green";
          context?.fill();
          context?.closePath();
        }
      });
    };

    const drawFood = () => {
      context?.beginPath();
      (context as any)?.rect(food.x, food.y, 16, 16);
      if (context) (context as any).fillStyle = "red";
      context?.fill();
      context?.closePath();
    };

    const handleKeyPressed = (e: any) => {
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
    const interval = setInterval(() => {
      (context as any)?.clearRect(0, 0, canvas?.width, canvas?.height);
      drawSnake();
      drawFood();
      moveSnake();
    }, 100);

    const moveSnake = () => {
      if (direction) {
        setSnake((prevSnake: any) => {
          const newSnake = [...prevSnake];
          const head = { x: newSnake[0].x, y: newSnake[0].y };

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

          return newSnake;
        });
      }
    };
    const handleCollisionWithFood = (newSnake: any[]) => {
      const head = newSnake[0];
      if (head.x === food.x && head.y === food.y) {
        setScore(score++);

        setFood({
          x:
            Math.floor(Math.random() * (canvas!.width / SNAKE_SPEED)) *
            SNAKE_SPEED,
          y:
            Math.floor(Math.random() * (canvas!.height / SNAKE_SPEED)) *
            SNAKE_SPEED,
        });

        newSnake.push({
          x: newSnake[newSnake.length - 1].x,
          y: newSnake[newSnake.length - 1].y,
        });
      }
    };

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div>
      <canvas
        ref={canvasRef as any}
        width={600}
        height={300}
        className={styles.snakeGameCanvas}
      />
    </div>
  );
}
