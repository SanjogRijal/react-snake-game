/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ScoreComponent({
  score,
  highScore,
}: {
  score: number;
  highScore: number;
}) {
  return (
    <>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
    </>
  );
}
