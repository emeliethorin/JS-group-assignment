export default function GameStats({ moves, time }) {
    function formatTime(t) {
      const minutes = Math.floor(t / 60);
      const seconds = t % 60;
      const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
      return minutes + ':' + formattedSeconds;
    }
  
    return (
      <div className="flex justify-between mb-4 text-lg font-semibold">
        <span>Moves: {moves}</span>
        <span>Time: {formatTime(time)}</span>
      </div>
    );
  }
  