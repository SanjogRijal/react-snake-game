/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file: utility file for snake game.
 * @function: drawBlock, drawRectangle
 * @author: Sanjog Rijal
 */

 export const drawSnake = (context: any, snake: {x: number, y: number}[]) => {
      const gradientColors = [
        "#FF5733",
        "#FFC300",
        "#DAF7A6",
        "#33FF57",
        "#33D4FF",
        "#6F33FF",
      ];
      const colorCount = gradientColors.length;

      snake.forEach((segment: {x: number, y: number}, index: any) => {
        if (context) {
          context.beginPath();
          const gradient = context.createRadialGradient(
            segment.x + 8,
            segment.y + 8,
            2,
            segment.x + 8,
            segment.y + 8,
            8
          );
          gradient.addColorStop(0, gradientColors[index % colorCount]);
          gradient.addColorStop(1, gradientColors[(index + 1) % colorCount]);

          context.fillStyle = gradient;
          const radius = index === 0 ? 12 : 8;
          context.arc(segment.x + 8, segment.y + 8, radius, 0, Math.PI * 2);
          context.fill();
          context.closePath();

          if (index === 0) {
            context.beginPath();
            context.fillStyle = "white";
            context.arc(segment.x + 4, segment.y + 6, 2, 0, Math.PI * 2);
            context.arc(segment.x + 12, segment.y + 6, 2, 0, Math.PI * 2);
            context.fill();
            context.closePath();
          }
        }
      });
 };
    
 export const drawFood = (context: any, food: {x: number, y: number}) => {
      if (context) {
        context.beginPath();
        context.arc(food.x + 8, food.y + 8, 8, 0, Math.PI * 2);
        context.fillStyle = "#00a860";
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc(food.x + 8, food.y + 8, 6, 0, Math.PI * 2);
        context.fillStyle = "#ff7184";
        context.fill();
        context.closePath();

        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const seedX = food.x + 8 + Math.cos(angle) * 4;
          const seedY = food.y + 8 + Math.sin(angle) * 4;
          context.beginPath();
          context.arc(seedX, seedY, 1, 0, Math.PI * 2);
          context.fillStyle = "#ffffff";
          context.fill();
          context.closePath();
        }
      }
 };