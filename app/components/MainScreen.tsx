import React, { useState } from "react";
import Button from "./button";
import Image from "next/image";
import MarketSelection from "./MarketSelection";
import RoundDisplay from "./RoundDisplay";

const MainScreen = () => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [showMarketSelection, setShowMarketSelection] =
    useState<boolean>(false);
  const [showRoundDisplay, setShowRoundDisplay] = useState<boolean>(false);

  const handleStartClick = () => {
    setShowMarketSelection(true);
  };

  const handleMarketSelect = (market: string) => {
    setSelectedMarket(market);
    startRounds();
  };

  const startRounds = () => {
    setCurrentRound(1);
    setShowRoundDisplay(true);
  };

  const handleRoundComplete = () => {
    if (currentRound < 3) {
      setCurrentRound(currentRound + 1);
    } else {
      setShowRoundDisplay(false);
      console.log("All rounds completed.");
    }
  };

  return (
    <main className="flex flex-col gap-8 justify-center items-center">
      {!showMarketSelection ? (
        <>
          <Image
            className=""
            src="/logo.gif"
            alt="Game Logo"
            width={800}
            height={38}
          />
          <Button label="START" onClick={handleStartClick} />
        </>
      ) : !selectedMarket ? (
        <MarketSelection onMarketSelect={handleMarketSelect} />
      ) : showRoundDisplay ? (
        <RoundDisplay round={currentRound} onComplete={handleRoundComplete} />
      ) : null}
    </main>
  );
};

export default MainScreen;
