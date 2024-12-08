/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ScoreComponent({ score }: { score: number }) {
  return (
    <>
      <p>Score: {score}</p>
      <p>High Score: highScore</p>
    </>
  );
}
