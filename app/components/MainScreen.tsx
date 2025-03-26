import React, { useState } from "react";
import Button from "./button";
import Image from "next/image";
import MarketSelection from "./MarketSelection";
import RoundDisplay from "./RoundDisplay";

const MainScreen = () => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [gameState, setGameState] = useState<"start" | "market" | "playing" | "completed">("start");

  const handleStartClick = () => {
    setGameState("market");
  };

  const handleMarketSelect = (market: string) => {
    setSelectedMarket(market);
    setCurrentRound(1);
    setGameState("playing");
  };

  const handleRoundComplete = () => {
    if (currentRound < 3) {
      setCurrentRound(currentRound + 1);
    } else {
      setGameState("completed");
    }
  };

  const handleRestart = () => {
    setSelectedMarket(null);
    setCurrentRound(0);
    setGameState("start");
  };

  return (
    <main className="flex flex-col gap-8 justify-center items-center min-h-[920px] w-full">
      {gameState === "start" && (
        <>
          <Image
            src="/logo.gif"
            alt="Game Logo"
            width={800}
            height={38}
          />
          <Button label="START" onClick={handleStartClick} />
        </>
      )}

      {gameState === "market" && (
        <MarketSelection onMarketSelect={handleMarketSelect} />
      )}

      {gameState === "playing" && (
        <RoundDisplay 
          round={currentRound} 
          onComplete={handleRoundComplete} 
        />
      )}

      {gameState === "completed" && (
        <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl text-black">Campaign Completed!</h1>
          <p className="text-xl text-black">
            Congratulations! You've successfully completed all 3 rounds of the {selectedMarket} marketing campaign.
          </p>
          <Button label="Start New Game" onClick={handleRestart} />
        </div>
      )}
    </main>
  );
};

export default MainScreen;