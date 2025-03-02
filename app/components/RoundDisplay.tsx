
const RoundDisplay: React.FC<{ round: number; onComplete: () => void }> = ({ round, onComplete }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl text-black">Round {round}</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={onComplete}
      >
        Next Round
      </button>
    </div>
  );
};

export default RoundDisplay; 