import React, { useState, useEffect } from "react";
import Button from "./button";
import Image from "next/image";
import MarketSelection from "./MarketSelection";
import RoundDisplay from "./RoundDisplay";

const MainScreen = () => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [gameState, setGameState] = useState<"start" | "market" | "playing" | "completed">("start");
  const [droppedItems, setDroppedItems] = useState<{ id: string; name: string; type: string; zoneId: number }[]>([]);

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
      setDroppedItems([]);
    } else {
      setGameState("completed");
    }
  };

  const handleRestart = () => {
    setSelectedMarket(null);
    setCurrentRound(0);
    setGameState("start");
    setDroppedItems([]);
  };

  // Ensure that the component only renders after the first mount
  useEffect(() => {
    if (gameState === "playing" && currentRound === 1) {
      // Any client-specific logic can go here
    }
  }, [gameState, currentRound]);

  return (
    <main className="flex flex-col gap-8 justify-center items-center min-h-[920px] w-full">
      {gameState === "start" && (
        <div className="rounded-lg bg-white/60 flex justify-center items-center flex-col p-12 gap-20">
          <Image
            src="/logo.gif"
            className="rounded-lg"
            alt="Game Logo"
            width={800}
            height={38}
          />
          <Button label="START" onClick={handleStartClick} />
        </div>
      )}

      {gameState === "market" && (
        <div className="bg-white/60 px-32 py-20 rounded-lg">
          <MarketSelection onMarketSelect={handleMarketSelect} />
        </div>
      )}

      {gameState === "playing" && (
        <RoundDisplay
          round={currentRound}
          onComplete={handleRoundComplete}
          droppedItems={droppedItems}
          setDroppedItems={setDroppedItems}
        />
      )}

      {gameState === "completed" && (
        <div className="flex flex-col items-center gap-12 p-8 bg-white rounded-lg ">
          <h1 className="text-4xl text-black">Campaign Completed!</h1>
          <p className="text-xl text-black">
            Congratulations! You&apos;ve successfully completed all 3 rounds of the {selectedMarket} marketing campaign.
          </p>
          <Button label="Start New Game" onClick={handleRestart} />
        </div>
      )}
    </main>
  );
};

export default MainScreen;