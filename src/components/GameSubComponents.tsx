import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { drawFood, drawSnake } from "@/utils";
import { useDeviceType } from "@/hooks/useDeviceType";

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
  const touchStartRef = useRef({ x: 0, y: 0 });

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

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          setDirection("right");
        } else {
          setDirection("left");
        }
      } else {
        if (deltaY > 0) {
          setDirection("down");
        } else {
          setDirection("up");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPressed);

    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyPressed);
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [direction, isMobile]);

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
