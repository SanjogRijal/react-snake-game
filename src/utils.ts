/**
 * @file: utility file for snake game.
 * @function: drawBlock, drawRectangle
 * @author: Sanjog Rijal
 */

const BLOCK_SIZE = 25; 
const toCoordinates = (gameCoordinate: number): number => {
    return gameCoordinate * BLOCK_SIZE;
};

export const drawBlock = (
    ctx: CanvasRenderingContext2D,
    color: string,
    x: number,
    y: number
) => {
    const guiX = toCoordinates(x);
    const guiY = toCoordinates(y);

    ctx.fillStyle = color;
    ctx.fillRect(guiX, guiY, BLOCK_SIZE, BLOCK_SIZE);
};

export const drawRectangle = (
    ctx: CanvasRenderingContext2D,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number
) => {
    const guiX = toCoordinates(x);
    const guiY = toCoordinates(y);

    ctx.fillStyle = color;
    ctx.fillRect(guiX, guiY, BLOCK_SIZE * width, BLOCK_SIZE * height);
};
