import React from "react";

const GameCompletionScreen: React.FC<{ results: {
  roundsStats: { round: number; budget: number; spent: number; reach: number; roi: number; goalAchieved: boolean; }[];
  overall: {
    totalBudgetSpent: number;
    totalReach: number;
    totalROI: number;
    roundsCompleted: number;
    goalsAchieved: number;
    finalScore: number;
    performanceRating: string;
    feedback: string;
  };
} }> = ({ results }) => {
  const { overall } = results;
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Campaign Complete!</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6">
          You are a <span className="text-blue-600">{overall.performanceRating}</span>!
        </h2>
        
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-blue-800 mb-2">{overall.finalScore}</div>
          <div className="text-xl">Final Score</div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded">
            <div className="text-lg font-semibold mb-1">Total ROI</div>
            <div className="text-3xl font-bold">{overall.totalROI.toLocaleString()}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded">
            <div className="text-lg font-semibold mb-1">Goals Achieved</div>
            <div className="text-3xl font-bold">{overall.goalsAchieved}/{overall.roundsCompleted}</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded">
            <div className="text-lg font-semibold mb-1">Total Reach</div>
            <div className="text-3xl font-bold">{overall.totalReach.toLocaleString()}</div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded">
            <div className="text-lg font-semibold mb-1">Budget Spent</div>
            <div className="text-3xl font-bold">${overall.totalBudgetSpent.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">Performance Analysis</h3>
          <p className="text-lg">{overall.feedback}</p>
        </div>
        
        <div className="flex justify-center">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCompletionScreen; 