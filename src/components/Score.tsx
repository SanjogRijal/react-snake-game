export default function ScoreComponent({
  score,
  highScore,
}: {
  score: number;
  highScore: number;
}) {
  return (
    <div className="mb-2 flex flex-col items-center p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-lg animate-fadeIn">
      <p className="text-3xl font-bold text-white mb-2 transform transition duration-500 hover:scale-110">
        Score: {score}
      </p>
      <p className="text-xl text-white opacity-80 transform transition duration-500 hover:scale-110">
        High Score: {highScore}
      </p>
    </div>
  );
}
