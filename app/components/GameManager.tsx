import React, { useState } from "react";
import RoundDisplay from "./RoundDisplay";
import GameCompletionScreen from "./GameCompletionScreen";

// Function to handle game completion after all rounds
const handleGameCompletion = (
  roundResults: {
    round: number;
    budget: number;
    spent: number;
    reach: number;
    roi: number;
    goalAchieved: boolean;
  }[]
) => {
  // Calculate overall game stats
  const totalBudgetSpent = roundResults.reduce((sum, result) => sum + result.spent, 0);
  const totalReach = roundResults.reduce((sum, result) => sum + result.reach, 0);
  const totalROI = roundResults.reduce((sum, result) => sum + result.roi, 0);
  const roundsCompleted = roundResults.length;
  const goalsAchieved = roundResults.filter(result => result.goalAchieved).length;
  
  // Calculate score based on performance
  const baseScore = totalROI / 1000; // Base score from total ROI
  const budgetEfficiencyBonus = totalReach / totalBudgetSpent * 100; // Bonus for efficient spending
  const goalBonus = goalsAchieved * 500; // Bonus per goal achieved
  
  const finalScore = Math.floor(baseScore + budgetEfficiencyBonus + goalBonus);
  
  // Determine performance rating
  let performanceRating = "";
  if (finalScore > 4000) {
    performanceRating = "Marketing Genius";
  } else if (finalScore > 3000) {
    performanceRating = "Campaign Expert";
  } else if (finalScore > 2000) {
    performanceRating = "Skilled Strategist";
  } else if (finalScore > 1000) {
    performanceRating = "Marketing Professional";
  } else {
    performanceRating = "Marketing Intern";
  }
  
  // Generate personalized feedback based on performance
  let feedback = "";
  if (goalsAchieved === roundsCompleted) {
    feedback = "Outstanding work! You achieved all campaign goals while optimizing your budget and reach.";
  } else if (goalsAchieved > roundsCompleted / 2) {
    feedback = "Good job! You achieved most of your campaign goals, but there's room for improvement in audience targeting.";
  } else if (totalROI > 10000) {
    feedback = "Your overall ROI was impressive, but you struggled to meet specific campaign goals. Focus on balancing overall performance with targeted objectives.";
  } else {
    feedback = "You've learned the basics of campaign management. Next time, focus on matching audiences with their most effective channels to improve ROI.";
  }
  
  // Return comprehensive game results
  return {
    roundsStats: roundResults,
    overall: {
      totalBudgetSpent,
      totalReach,
      totalROI,
      roundsCompleted,
      goalsAchieved,
      finalScore,
      performanceRating,
      feedback
    }
  };
};

const GameManager: React.FC = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [roundResults, setRoundResults] = useState<{ round: number; budget: number; spent: number; reach: number; roi: number; goalAchieved: boolean; }[]>([]);
  const [gameResults, setGameResults] = useState<{
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
  } | null>(null);
  
  // Total number of rounds in the game
  const TOTAL_ROUNDS = 3;
  
  // Handle individual round completion
  const handleRoundComplete = (roundResult: any) => {
    // Save the results from this round
    setRoundResults(prev => [...prev, roundResult]);
    
    // Check if all rounds are complete
    if (currentRound >= TOTAL_ROUNDS) {
      // All rounds are complete, trigger game completion
      const results = handleGameCompletion([...roundResults, roundResult]);
      setGameResults(results);
      setIsGameComplete(true);
    } else {
      // Move to the next round
      setCurrentRound(prev => prev + 1);
    }
  };
  
  return (
    <div>
      {!isGameComplete ? (
        <RoundDisplay 
          round={currentRound} 
          onComplete={(roundStats) => handleRoundComplete({
            round: currentRound,
            ...roundStats
          })} 
        />
      ) : (
        <GameCompletionScreen results={gameResults} />
      )}
    </div>
  );
};

export default GameManager; 