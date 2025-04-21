"use client"; // Required for Next.js App Router

import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Button from "./button";
import DragItem from "./DragItem";
import DropZone from "./DropZone";
// import { FaPiggyBank, FaUsers } from 'react-icons/fa';
import { ROUND_1_DATA, ROUND_2_DATA, ROUND_3_DATA } from '../roundData'; // Import round data

// Define item types
const ITEM_TYPES = {
  AUDIENCE: "audience",
  CHANNEL: "channel",
};

// Round 1 data (original game data)
// const ROUND_1_DATA = {
//   initialBudget: 30000,
//   targetROI: 5000,
//   timeLimit: 120, // 2 minutes
//   audienceTypes: {
//     Teenagers: {
//       reach: 500000,
//       description: "Young people age 13-19",
//     },
//     Adults: {
//       reach: 1200000,
//       description: "Working adults age 20-64",
//     },
//     Seniors: {
//       reach: 700000,
//       description: "Older adults age 65+",
//     },
//   },
//   channelTypes: {
//     "Social Media": {
//       cost: 5000,
//       description: "Facebook, Instagram, TikTok",
//     },
//     "TV Ads": {
//       cost: 15000,
//       description: "Television commercials",
//     },
//     Billboards: {
//       cost: 8000,
//       description: "Physical advertising displays",
//     },
//   },
//   // Effectiveness scores (match percentages)
//   effectiveness: {
//     Teenagers: {
//       "Social Media": 85,
//       "TV Ads": 45,
//       Billboards: 30,
//     },
//     Adults: {
//       "Social Media": 60,
//       "TV Ads": 75,
//       Billboards: 55,
//     },
//     Seniors: {
//       "Social Media": 30,
//       "TV Ads": 80,
//       Billboards: 65,
//     },
//   },
//   // Extra rules
//   rules: {
//     requiredCombinations: 3, // Must fill all 3 slots
//   },
// };

// Round 2 data
// const ROUND_2_DATA = {
//   initialBudget: 45000,
//   targetROI: 7500,
//   timeLimit: 100, // 1:40 minutes
//   audienceTypes: {
//     "Young Professionals": {
//       reach: 800000,
//       description: "Age 25-35, career-focused, tech-savvy",
//     },
//     Parents: {
//       reach: 1400000,
//       description: "Adults with children, family-oriented",
//     },
//     Students: {
//       reach: 600000,
//       description: "College and university students",
//     },
//     "Business Owners": {
//       reach: 350000,
//       description: "Entrepreneurs and small business leaders",
//     },
//   },
//   channelTypes: {
//     "Social Media": {
//       cost: 7000,
//       description: "Instagram, TikTok, Twitter campaigns",
//     },
//     "Search Ads": {
//       cost: 12000,
//       description: "Google and Bing paid search results",
//     },
//     "Email Marketing": {
//       cost: 5000,
//       description: "Targeted email campaigns to existing lists",
//     },
//     "Podcast Sponsorships": {
//       cost: 15000,
//       description: "Ads on popular podcast networks",
//     },
//   },
//   // Effectiveness scores (match percentages)
//   effectiveness: {
//     "Young Professionals": {
//       "Social Media": 80,
//       "Search Ads": 75,
//       "Email Marketing": 60,
//       "Podcast Sponsorships": 85,
//     },
//     Parents: {
//       "Social Media": 65,
//       "Search Ads": 80,
//       "Email Marketing": 70,
//       "Podcast Sponsorships": 50,
//     },
//     Students: {
//       "Social Media": 90,
//       "Search Ads": 60,
//       "Email Marketing": 40,
//       "Podcast Sponsorships": 75,
//     },
//     "Business Owners": {
//       "Social Media": 55,
//       "Search Ads": 85,
//       "Email Marketing": 80,
//       "Podcast Sponsorships": 60,
//     },
//   },
//   // Extra rules
//   rules: {
//     requiredCombinations: 4, // Must fill all 4 slots
//     channelLimits: {
//       "Social Media": 2, // Can only use Social Media twice
//       "Podcast Sponsorships": 1, // Can only use Podcasts once
//     },
//   },
// };

// // Round 3 data
// const ROUND_3_DATA = {
//   initialBudget: 60000,
//   targetROI: 10000,
//   timeLimit: 90, // 1:30 minutes
//   audienceTypes: {
//     "Urban Millennials": {
//       reach: 750000,
//       description: "City dwellers, age 25-40, high disposable income",
//       engagementMultiplier: 1.2, // Engaged audiences produce 20% higher ROI
//     },
//     "Suburban Families": {
//       reach: 1200000,
//       description: "Married with children, homeowners, value-conscious",
//       engagementMultiplier: 0.9,
//     },
//     "Gen Z": {
//       reach: 900000,
//       description: "Age 18-24, tech-native, trend-focused",
//       engagementMultiplier: 1.3,
//     },
//     "Remote Workers": {
//       reach: 600000,
//       description: "WFH professionals, flexible schedules",
//       engagementMultiplier: 1.1,
//     },
//     Retirees: {
//       reach: 450000,
//       description: "Age 65+, leisure-focused, higher brand loyalty",
//       engagementMultiplier: 0.8,
//     },
//   },
//   channelTypes: {
//     "Influencer Marketing": {
//       cost: 18000,
//       description: "Partnerships with relevant content creators",
//       budgetMultiplier: 0.9, // 10% discount when combining certain channels
//     },
//     "Video Streaming": {
//       cost: 25000,
//       description: "Ads on YouTube, Hulu, and other platforms",
//       budgetMultiplier: 1.0,
//     },
//     "Print Media": {
//       cost: 12000,
//       description: "Magazine and newspaper placements",
//       budgetMultiplier: 1.1, // 10% premium for traditional media
//     },
//     "Mobile Apps": {
//       cost: 15000,
//       description: "In-app advertising and promotions",
//       budgetMultiplier: 0.9,
//     },
//     "Outdoor Digital": {
//       cost: 20000,
//       description: "Digital billboards and interactive displays",
//       budgetMultiplier: 1.0,
//     },
//   },
//   // Effectiveness scores (match percentages)
//   effectiveness: {
//     "Urban Millennials": {
//       "Influencer Marketing": 90,
//       "Video Streaming": 80,
//       "Print Media": 30,
//       "Mobile Apps": 85,
//       "Outdoor Digital": 70,
//     },
//     "Suburban Families": {
//       "Influencer Marketing": 55,
//       "Video Streaming": 75,
//       "Print Media": 65,
//       "Mobile Apps": 60,
//       "Outdoor Digital": 50,
//     },
//     "Gen Z": {
//       "Influencer Marketing": 95,
//       "Video Streaming": 85,
//       "Print Media": 20,
//       "Mobile Apps": 90,
//       "Outdoor Digital": 65,
//     },
//     "Remote Workers": {
//       "Influencer Marketing": 70,
//       "Video Streaming": 75,
//       "Print Media": 40,
//       "Mobile Apps": 80,
//       "Outdoor Digital": 30,
//     },
//     Retirees: {
//       "Influencer Marketing": 30,
//       "Video Streaming": 50,
//       "Print Media": 85,
//       "Mobile Apps": 40,
//       "Outdoor Digital": 60,
//     },
//   },
//   // Extra rules and constraints
//   rules: {
//     requiredCombinations: 5, // Must fill all 5 slots
//     channelLimits: {
//       "Video Streaming": 2,
//       "Influencer Marketing": 2,
//     },
//     // Special rules
//     specialEffects: [
//       {
//         name: "Digital Synergy",
//         description:
//           "Combining Mobile Apps and Video Streaming for the same audience gives +15% effectiveness",
//         conditions: {
//           channels: ["Mobile Apps", "Video Streaming"],
//           sameAudience: true,
//         },
//         bonus: {
//           effectivenessBonus: 15,
//         },
//       },
//       {
//         name: "Cross-Generation Reach",
//         description:
//           "Using Print Media for Retirees and Influencers for Gen Z reduces total cost by 10%",
//         conditions: {
//           combinations: [
//             { audience: "Retirees", channel: "Print Media" },
//             { audience: "Gen Z", channel: "Influencer Marketing" },
//           ],
//         },
//         bonus: {
//           budgetDiscount: 0.1,
//         },
//       },
//       {
//         name: "Limited Media Budget",
//         description:
//           "Can only spend 40% of total budget on traditional media (Print, Outdoor)",
//         conditions: {
//           channelTypes: ["Print Media", "Outdoor Digital"],
//           maxBudgetPercentage: 0.4,
//         },
//       },
//     ],
//   },
// };

// Get round data based on round number
const getRoundData = (round: number) => {
  switch (round) {
    case 1:
      return ROUND_1_DATA;
    case 2:
      return ROUND_2_DATA; // Use ROUND_2_DATA for round 2
    case 3:
      return ROUND_3_DATA;
    default:
      return ROUND_1_DATA;
  }
};

// Calculate effectiveness now uses the round data
const calculateEffectiveness = (
  audience: string,
  channel: string,
  roundData: any
): number => {
  // Check if audience and channel exist in the round data
  if (!roundData.effectiveness[audience]) {
    console.error(`Audience "${audience}" not found in effectiveness data.`);
    return 0; // Return 0 if audience is not found
  }
  if (!roundData.effectiveness[audience][channel]) {
    console.error(`Channel "${channel}" not found for audience "${audience}".`);
    return 0; // Return 0 if channel is not found
  }
  return roundData.effectiveness[audience][channel];
};

// Apply special effects from Round 3 rules
const applySpecialEffects = (
  droppedItems: unknown[],
  scores: unknown[],
  roundData: any,
  budget: number,
  initialBudget: number
) => {
  // Only apply special effects if the round has them
  if (!roundData.rules.specialEffects) {
    return { scores, budget };
  }

  let updatedScores = [...scores];
  let updatedBudget = budget;

  // Create a map of audience to channels for quick lookup
  const audienceChannelMap = new Map();
  const combinationMap = new Map();

  droppedItems.forEach(item => {
    if (item.type === ITEM_TYPES.AUDIENCE) {
      combinationMap.set(item.zoneId, { audience: item.name });
    } else if (item.type === ITEM_TYPES.CHANNEL) {
      const audienceItem = droppedItems.find(
        dItem =>
          dItem.zoneId === item.zoneId - 1 && dItem.type === ITEM_TYPES.AUDIENCE
      );

      if (audienceItem) {
        // Keep track of which channels are used per audience
        if (!audienceChannelMap.has(audienceItem.name)) {
          audienceChannelMap.set(audienceItem.name, []);
        }
        audienceChannelMap.get(audienceItem.name).push(item.name);

        // Complete the combination map
        const combinationKey = item.zoneId - 1;
        const combination = combinationMap.get(combinationKey);
        if (combination) {
          combination.channel = item.name;
        }
      }
    }
  });

  // Process each special effect
  roundData.rules.specialEffects.forEach((effect: any) => {
    // Digital Synergy: Same audience using specific channels
    if (effect.conditions.sameAudience && effect.conditions.channels) {
      audienceChannelMap.forEach((channels, audience) => {
        const hasAllChannels = effect.conditions.channels.every(
          (channel: string) => channels.includes(channel)
        );

        if (hasAllChannels) {
          // Apply effectiveness bonus to all affected combinations
          updatedScores = updatedScores.map(score => {
            const combinationAudience = droppedItems.find(
              item =>
                Math.floor(item.zoneId / 2) === score.rowIndex &&
                item.type === ITEM_TYPES.AUDIENCE
            )?.name;

            if (combinationAudience === audience) {
              const channelItem = droppedItems.find(
                item =>
                  Math.floor(item.zoneId / 2) === score.rowIndex &&
                  item.type === ITEM_TYPES.CHANNEL
              );

              if (
                channelItem &&
                effect.conditions.channels.includes(channelItem.name)
              ) {
                return {
                  ...score,
                  score: Math.min(
                    score.score + effect.bonus.effectivenessBonus,
                    100
                  ),
                  // Recalculate reach and ROI with new effectiveness
                  reach: Math.floor(
                    ((score.score + effect.bonus.effectivenessBonus) / 100) *
                    roundData.audienceTypes[combinationAudience].reach
                  ),
                  roi: Math.floor(
                    ((((score.score + effect.bonus.effectivenessBonus) / 100) *
                      roundData.audienceTypes[combinationAudience].reach) /
                      roundData.channelTypes[channelItem.name].cost) *
                    100
                  ),
                };
              }
            }
            return score;
          });
        }
      });
    }

    // Cross-Generation Reach: Specific audience-channel combinations
    if (effect.conditions.combinations) {
      const allCombosPresent = effect.conditions.combinations.every(
        (combo: { audience: string; channel: string }) => {
          return Array.from(combinationMap.values()).some(
            (c: any) =>
              c.audience === combo.audience && c.channel === combo.channel
          );
        }
      );

      if (allCombosPresent && effect.bonus.budgetDiscount) {
        // Apply budget discount
        const totalSpent = initialBudget - budget;
        const discount = totalSpent * effect.bonus.budgetDiscount;
        updatedBudget = budget + discount;
      }
    }

    // Limited Media Budget: Check if traditional media exceeds cap
    if (
      effect.conditions.channelTypes &&
      effect.conditions.maxBudgetPercentage
    ) {
      const traditionalMediaCost = droppedItems
        .filter(
          item =>
            item.type === ITEM_TYPES.CHANNEL &&
            effect.conditions.channelTypes.includes(item.name)
        )
        .reduce((sum, item) => sum + roundData.channelTypes[item.name].cost, 0);

      const maxBudgetForTraditional =
        initialBudget * effect.conditions.maxBudgetPercentage;

      // This is just a check - we don't modify anything here
      // In a real game, this would prevent placing the item if it exceeds the limit
    }
  });

  return { scores: updatedScores, budget: updatedBudget };
};

const circularProgressStyle = `
  @keyframes fill {
    from { stroke-dasharray: 0 100; }
  }
  
  @keyframes piggyFill {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
  
  @keyframes countUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const RoundDisplay: React.FC<{ round: number; onComplete: () => void; droppedItems: any[]; setDroppedItems: (items: any[]) => void }> = ({
  round,
  onComplete,
  droppedItems,
  setDroppedItems,
}) => {
  const roundData = getRoundData(round);
  const initialBudget = roundData.initialBudget;
  const targetROI = roundData.targetROI;
  const timeLimit = roundData.timeLimit;

  const [budget, setBudget] = useState(initialBudget);
  const [scores, setScores] = useState<
    {
      rowIndex: number;
      score: number;
      cost: number;
      reach: number;
      roi: number;
    }[]
  >([]);
  const [goalReached, setGoalReached] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [allCombinationsFilled, setAllCombinationsFilled] = useState(false);
  const [specialEffectsApplied, setSpecialEffectsApplied] = useState<string[]>(
    []
  );
  const [channelCounts, setChannelCounts] = useState<Record<string, number>>(
    {}
  );

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !goalReached) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, goalReached]);

  // Calculate scores whenever items change
  useEffect(() => {
    const newScores = [];
    let totalROI = 0;
    let spentBudget = 0;
    let filledCombinations = 0;

    // Reset special effects and channel counts
    setSpecialEffectsApplied([]);

    // Count channels used (for limits)
    const newChannelCounts: Record<string, number> = {};
    droppedItems.forEach(item => {
      if (item.type === ITEM_TYPES.CHANNEL) {
        newChannelCounts[item.name] = (newChannelCounts[item.name] || 0) + 1;
      }
    });
    setChannelCounts(newChannelCounts);

    // The number of combinations is based on the round
    const combinationsNeeded = roundData.rules.requiredCombinations;

    // For each row (based on required combinations)
    for (let rowIndex = 0; rowIndex < combinationsNeeded * 2; rowIndex += 2) {
      const audienceItem = droppedItems.find(
        (item: { zoneId: number; type: string }) =>
          item.zoneId === rowIndex && item.type === ITEM_TYPES.AUDIENCE
      );

      const channelItem = droppedItems.find(
        (item: { zoneId: number; type: string }) =>
          item.zoneId === rowIndex + 1 && item.type === ITEM_TYPES.CHANNEL
      );

      if (audienceItem && channelItem) {
        filledCombinations++;
        const effectivenessScore = calculateEffectiveness(
          audienceItem.name,
          channelItem.name,
          roundData
        );

        const cost = roundData.channelTypes[channelItem.name]?.cost; // Safeguard against undefined cost
        const audienceSize = roundData.audienceTypes[audienceItem.name]?.reach || 0; // Safeguard against undefined reach

        // Apply engagement multiplier if present (Round 3)
        const engagementMultiplier =
          roundData.audienceTypes[audienceItem.name]?.engagementMultiplier || 1;

        // Apply budget multiplier if present (Round 3)
        const budgetMultiplier =
          roundData.channelTypes[channelItem.name]?.budgetMultiplier || 1;

        const adjustedCost = cost * budgetMultiplier;

        const reach = Math.floor((effectivenessScore / 100) * audienceSize);
        const roi = Math.floor(
          (reach / adjustedCost) * 100 * engagementMultiplier
        );

        spentBudget += adjustedCost;
        totalROI += roi;

        newScores.push({
          rowIndex: rowIndex / 2,
          score: effectivenessScore,
          cost: adjustedCost,
          reach,
          roi,
        });
      } else {
        newScores.push({
          rowIndex: rowIndex / 2,
          score: 0,
          cost: 0,
          reach: 0,
          roi: 0,
        });
      }
    }

    // Apply any special effects from Round 3
    const { scores: updatedScores, budget: updatedBudget } =
      applySpecialEffects(
        droppedItems,
        newScores,
        roundData,
        initialBudget - spentBudget,
        initialBudget
      );

    // Check if all combinations are filled
    setAllCombinationsFilled(
      filledCombinations === roundData.rules.requiredCombinations
    );

    // Recalculate total ROI with the updated scores
    const finalTotalROI = updatedScores.reduce(
      (sum, item) => sum + item.roi,
      0
    );

    // Check if goal is reached
    if (
      finalTotalROI > targetROI &&
      initialBudget - updatedBudget <= initialBudget &&
      filledCombinations === roundData.rules.requiredCombinations
    ) {
      setGoalReached(true);
    } else {
      setGoalReached(false);
    }

    setScores(updatedScores);
    setBudget(updatedBudget);
  }, [droppedItems, roundData, initialBudget, targetROI]);

  const handleDrop = (item: { name: string; type: string }, zoneId: number) => {
    // Check if this zone already has an item
    const zoneHasItem = droppedItems.some(
      (dItem: { zoneId: number }) => dItem.zoneId === zoneId
    );

    // Check if this is the correct column for this item type
    const isFirstColumn = zoneId % 2 === 0;
    const isValidColumn =
      (isFirstColumn && item.type === ITEM_TYPES.AUDIENCE) ||
      (!isFirstColumn && item.type === ITEM_TYPES.CHANNEL);

    // Check if we can afford this channel
    let canAfford = true;
    if (item.type === ITEM_TYPES.CHANNEL) {
      const itemCost = roundData.channelTypes[item.name]?.cost; // Safeguard against undefined cost
      if (itemCost === undefined) {
        console.error(`Channel "${item.name}" not found in channel types.`);
        return; // Prevent dropping invalid channel
      }
      const currentSpend = droppedItems
        .filter((dItem: { type: string }) => dItem.type === ITEM_TYPES.CHANNEL)
        .reduce(
          (sum: number, dItem: { name: string }) =>
            sum + roundData.channelTypes[dItem.name]?.cost || 0, // Safeguard against undefined cost
          0
        );

      canAfford = currentSpend + itemCost <= initialBudget;
    }

    // Check channel limits for Round 2 and 3
    let withinChannelLimits = true;
    if (item.type === ITEM_TYPES.CHANNEL && roundData.rules.channelLimits) {
      const currentCount = channelCounts[item.name] || 0;
      const limit = roundData.rules.channelLimits[item.name];

      if (limit !== undefined && currentCount >= limit) {
        withinChannelLimits = false;
      }
    }

    if (!zoneHasItem && isValidColumn && canAfford && withinChannelLimits) {
      // Ensure the audience name is valid for the current round
      if (item.type === ITEM_TYPES.AUDIENCE) {
        const audienceNames = Object.keys(roundData.audienceTypes);
        if (!audienceNames.includes(item.name)) {
          console.error(`Invalid audience name: ${item.name}`);
          return; // Prevent dropping invalid audience
        }
      }

      setDroppedItems(prevItems => [
        ...prevItems,
        {
          id: `${item.name}-${Date.now()}`,
          name: item.name,
          type: item.type,
          zoneId,
        },
      ]);
    }
  };

  // Remove an item from a drop zone
  const handleRemoveItem = (id: string) => {
    setDroppedItems(prevItems =>
      prevItems.filter((item: { id: string }) => item.id !== id)
    );
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const totalReach = scores.reduce((sum, item) => sum + item.reach, 0);
  const totalROI = scores.reduce((sum, item) => sum + item.roi, 0);

  // Call onComplete and reset dropped items when the round is completed
  const handleComplete = () => {
    onComplete();
    setDroppedItems([]); // Reset dropped items
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col w-full min-h-[920px] p-8">
        {/* Header with Campaign Brief */}
        {/* <div className="flex flex-col gap-4 justify-center items-center mb-6 w-full">

          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-full">
            <h2 className="text-2xl text-black mb-2">Campaign Brief</h2>
            <p className="text-black mb-2">
              Your marketing team has a budget of $
              {initialBudget.toLocaleString()} to launch a new ad campaign. Your
              goal is to maximize ROI by matching the right audiences with the
              right channels.
            </p>
            <p className="text-black mb-2">
              Target: Achieve total ROI above {targetROI.toLocaleString()} while
              staying within budget.
            </p>
            {roundData.rules.channelLimits && (
              <div className="text-black">
                <p className="font-medium">Special Rules:</p>
                <ul className="list-disc ml-6">
                  {Object.entries(roundData.rules.channelLimits).map(
                    ([channel, limit]) => (
                      <li key={channel}>
                        Can only use {channel} {limit}{" "}
                        {limit === 1 ? "time" : "times"}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            {roundData.rules.specialEffects && (
              <div className="text-black mt-2">
                <p className="font-medium">Bonus Effects:</p>
                <ul className="list-disc ml-6">
                  {roundData.rules.specialEffects.map(
                    (effect: any, index: number) => (
                      <li key={index}>{effect.description}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div> */}

        {/* Game Status Bar */}
        <div className="flex justify-between items-center mb-4 p-6 bg-gray-800/90 text-white rounded-xl shadow-lg ">
          <h1 className="text-2xl text-white">Round {round}</h1>

          {/* Budget Section with Piggy Bank */}
          <div className="flex items-center gap-4 bg-gray-700 p-4 rounded-lg w-100 h-25">
            <div className="relative w-16 h-16 ">
              {/* <FaPiggyBank className="w-16 h-16 text-pink-300" /> */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-green-400 opacity-60 transition-all duration-1000 origin-bottom"
                style={{
                  height: "100%",
                  transform: `scaleY(${budget / initialBudget})`,
                  animation: "piggyFill 1s ease-out",
                }}
              />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                ${Math.round((budget / initialBudget) * 100)}%
              </span>
            </div>
            <div>
              <div className="text-lg text-gray-300">Budget</div>
              <div className="text-2xl ">
                ${budget.toLocaleString()}
              </div>
            </div>
          </div>

          {/* ROI Circular Progress */}
          <div className="relative flex items-center gap-4 bg-gray-700 p-4 rounded-lg w-100 h-25">
            <div className="relative w-16 h-16">
              <svg className="transform -rotate-90 w-16 h-16">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-gray-600"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className={`text-${totalROI > targetROI ? "green" : "yellow"
                    }-500`}
                  strokeDasharray={`${Math.min(
                    (totalROI / targetROI) * 100,
                    100
                  )} 100`}
                  style={{ animation: "fill 1s ease-out" }}
                />
              </svg>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">
                {Math.min(Math.round((totalROI / targetROI) * 100), 100)}%
              </span>

            </div>
            <div>
              <div className="text-lg text-gray-300">ROI Progress</div>
              <div className="text-2xl ">
                {totalROI.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">
                Target: {targetROI.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Reach Section with People Scale */}
          <div className="flex items-center gap-4 bg-gray-700 p-4 rounded-lg w-100 h-25">
            <div className="relative w-16 h-16 flex items-end justify-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 mx-0.5 bg-blue-400 rounded-t transition-all duration-1000"
                  style={{
                    height: `${((totalReach / 1000000) * 100 * (i + 1)) / 5}%`,
                    maxHeight: "100%",
                    animation: "countUp 1s ease-out",
                  }}
                />
              ))}
              {/* <FaUsers className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-blue-300 w-8 h-8" /> */}
            </div>
            <div>
              <div className="text-lg text-gray-300">Total Reach</div>
              <div className="text-2xl ">
                {(totalReach / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-gray-400">people</div>
            </div>
          </div>

          {/* Timer with Circular Animation */}
          <div
            className={`flex items-center gap-8 bg-gray-700 p-4 rounded-lg w-100 h-25 ${timeLeft < 30 ? "text-red-400" : "text-white"
              }`}
          >
            <div>
              <div className="text-lg text-gray-300">Time Left</div>
              <div className="text-2xl ">{formatTime(timeLeft)}</div>
            </div>
          </div>
        </div>

        {/* Drag & Drop Section */}
        <div className="flex gap-8 mt-3 w-full ">
          {/* Left Column (Draggable Items) */}
          <div className="flex flex-col gap-8 w-1/4">
            {/* Audience Section */}
            <div className="bg-blue-300/90 p-4 rounded-lg border border-blue-900">
              <h2 className="text-2xl text-black mb-2">Target Audience</h2>
              <div className="flex flex-col gap-2">
                {Object.entries(roundData.audienceTypes).map(
                  ([name, data]: [string, any]) => (
                    <DragItem
                      key={name}
                      name={name}
                      type={ITEM_TYPES.AUDIENCE}
                      extraInfo={`${data.reach.toLocaleString()}${data.engagementMultiplier
                        ? ` | Engagement: ${data.engagementMultiplier}x`
                        : ""
                        }`}
                      tooltipText={data.description}
                    />
                  )
                )}
              </div>
            </div>

            {/* Channels Section */}
            <div className="bg-red-300/90 p-4 rounded-lg border border-red-900">
              <h2 className="text-2xl text-black mb-2">Ad Channels</h2>
              <div className="flex flex-col gap-2">
                {Object.entries(roundData.channelTypes).map(
                  ([name, data]: [string, any]) => {
                    const currentCount = channelCounts[name] || 0;
                    const limit = roundData.rules.channelLimits?.[name];
                    const isAtLimit =
                      limit !== undefined && currentCount >= limit;

                    return (
                      <DragItem
                        key={name}
                        name={name}
                        type={ITEM_TYPES.CHANNEL}
                        extraInfo={`₹${data.cost.toLocaleString()}${data.budgetMultiplier !== 1 && data.budgetMultiplier
                          ? ` | Modifier: ${data.budgetMultiplier < 1 ? "-" : "+"
                          }${Math.abs(1 - data.budgetMultiplier) * 100}%`
                          : ""
                          }`}
                        tooltipText={data.description}
                        disabled={budget < data.cost || isAtLimit}
                        warning={
                          isAtLimit ? `Limit: ${currentCount}/${limit}` : ""
                        }
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Middle Column (Drop Zones) */}
          <div className="w-1/2 bg-[#b684f6] border border-[#46751c] p-4 rounded-lg h-fit">
            {/* Column Headers */}
            <div className="grid grid-cols-2 mb-2 text-black">
              <div className="text-center">Target Audience</div>
              <div className="text-center">Ad Channel</div>
            </div>

            {/* Drop Zone Rows */}
            {Array.from({ length: roundData.rules.requiredCombinations }).map(
              (_, index) => {
                const rowStart = index * 2;
                const audienceItem = droppedItems.find(
                  item =>
                    item.zoneId === rowStart &&
                    item.type === ITEM_TYPES.AUDIENCE
                );
                const channelItem = droppedItems.find(
                  item =>
                    item.zoneId === rowStart + 1 &&
                    item.type === ITEM_TYPES.CHANNEL
                );
                const rowScore = scores.find(score => score.rowIndex === index);

                // Find if this combination is part of any special effects
                const hasSpecialEffect = roundData.rules.specialEffects?.some(
                  (effect: any) => {
                    if (effect.conditions.combinations) {
                      return effect.conditions.combinations.some(
                        (combo: any) =>
                          combo.audience === audienceItem?.name &&
                          combo.channel === channelItem?.name
                      );
                    }
                    if (
                      effect.conditions.sameAudience &&
                      effect.conditions.channels
                    ) {
                      return (
                        audienceItem &&
                        effect.conditions.channels.includes(channelItem?.name)
                      );
                    }
                    return false;
                  }
                );

                return (
                  <div key={index} className="mb-3">
                    <div className="text-lg text-black mb-2">
                      Campaign Strategy {index + 1}
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      {/* First column - Audience */}
                      <DropZone
                        id={rowStart}
                        onDrop={handleDrop}
                        onRemoveItem={handleRemoveItem}
                        droppedItems={droppedItems}
                        acceptType={ITEM_TYPES.AUDIENCE}
                        item={audienceItem}
                      />

                      {/* Second column - Channel */}
                      <DropZone
                        id={rowStart + 1}
                        onDrop={handleDrop}
                        onRemoveItem={handleRemoveItem}
                        droppedItems={droppedItems}
                        acceptType={ITEM_TYPES.CHANNEL}
                        item={channelItem}
                      />
                    </div>

                    {/* Effectiveness Score */}
                    {rowScore && rowScore.score > 0 && (
                      <div
                        className={`mt-2 px-2 pt-1 pb-2 rounded-lg ${hasSpecialEffect
                          ? "bg-purple-100 border border-purple-300"
                          : "bg-gray-100"
                          }`}
                      >
                        <div className="grid grid-cols-3 gap-2 text-lg text-black">
                          <div>
                            <span className="font-medium">Match:</span>{" "}
                            {rowScore.score}%
                            <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                              <div
                                className={`h-2 rounded-full ${rowScore.score > 75
                                  ? "bg-green-500"
                                  : rowScore.score > 50
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                  }`}
                                style={{ width: `${rowScore.score}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Cost:</span> $
                            {rowScore.cost.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Reach:</span>{" "}
                            {rowScore.reach.toLocaleString()}
                          </div>
                        </div>

                        {hasSpecialEffect && (
                          <div className="mt-2 text-xs text-purple-800 italic">
                            Special effect applied!
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}

            {/* Final results section */}
            <div className="mt-4 p-4 bg-gray-100/90 rounded-lg">
              <h3 className="text-xl font-medium text-black mb-2">
                Campaign Results
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-black">
                    <span className="font-medium">Budget Spent:</span> ₹
                    {(initialBudget - budget).toLocaleString()}
                  </p>
                  <p className="text-black">
                    <span className="font-medium">Total Reach:</span>{" "}
                    {totalReach.toLocaleString()} people
                  </p>
                </div>
                <div>
                  <p className="text-black">
                    <span className="font-medium">Total ROI:</span>{" "}
                    {totalROI.toLocaleString()}
                  </p>
                  <p className="text-black">
                    <span className="font-medium">Target ROI:</span>{" "}
                    {targetROI.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Special effects notifications */}
              {specialEffectsApplied.length > 0 && (
                <div className="mt-3 p-2 bg-purple-100 rounded border border-purple-300">
                  <p className="text-purple-800 font-medium">
                    Active Special Effects:
                  </p>
                  <ul className="list-disc ml-5 text-lg text-purple-700">
                    {specialEffectsApplied.map((effect, idx) => (
                      <li key={idx}>{effect}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Results & Controls) */}
          <div className="w-1/4 flex flex-col gap-4">
            {/* Round Status */}
            <div
              className={`p-4 rounded-lg border ${goalReached
                ? "bg-green-100 border-green-500"
                : timeLeft === 0
                  ? "bg-red-100/90 border-red-500"
                  : "bg-yellow-100/90 border-yellow-500"
                }`}
            >
              <h2 className="text-2xl text-black mb-2">Round Status</h2>
              {goalReached ? (
                <div className="text-green-700">
                  <p className="">Goal Reached!</p>
                  <p>You've successfully created an effective ad campaign.</p>
                </div>
              ) : timeLeft === 0 ? (
                <div className="text-red-700">
                  <p className="">Time's Up!</p>
                  <p>You didn't complete the campaign in time.</p>
                </div>
              ) : (
                <div className="text-yellow-700">
                  <p className="">In Progress</p>
                  <p>Complete your ad campaign before time runs out.</p>
                  <ul className="list-disc ml-5 mt-2">
                    {!allCombinationsFilled && (
                      <li>
                        Fill all {roundData.rules.requiredCombinations} campaign
                        slots
                      </li>
                    )}
                    {totalROI <= targetROI && (
                      <li>
                        Increase ROI to at least {targetROI.toLocaleString()}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Progress Tracking */}
            <div className="bg-white/95 p-4 rounded-lg border border-gray-300">
              <h2 className="text-2xl text-black mb-2">Progress</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-lg text-black mb-1">
                    <span>ROI Target ({targetROI.toLocaleString()})</span>
                    <span>
                      {Math.min(Math.round((totalROI / targetROI) * 100), 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (totalROI / targetROI) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-lg text-black mb-1">
                    <span>
                      Combinations (
                      {
                        droppedItems.filter(i => i.type === ITEM_TYPES.AUDIENCE)
                          .length
                      }
                      /{roundData.rules.requiredCombinations})
                    </span>
                    <span>
                      {Math.round(
                        (droppedItems.filter(
                          i => i.type === ITEM_TYPES.AUDIENCE
                        ).length /
                          roundData.rules.requiredCombinations) *
                        100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(droppedItems.filter(
                          i => i.type === ITEM_TYPES.AUDIENCE
                        ).length /
                          roundData.rules.requiredCombinations) *
                          100
                          }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-lg text-black mb-1">
                    <span>Budget Used</span>
                    <span>
                      {Math.round(
                        ((initialBudget - budget) / initialBudget) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${(initialBudget - budget) / initialBudget > 1
                        ? "bg-gray-800"
                        : initialBudget - budget > initialBudget * 0.9
                          ? "bg-red-500"
                          : initialBudget - budget > initialBudget * 0.7
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      style={{
                        width: `${((initialBudget - budget) / initialBudget) * 100 > 100
                          ? 100
                          : ((initialBudget - budget) / initialBudget) * 100
                          }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Tips */}
            <div className="bg-blue-50/90 p-4 rounded-lg border border-blue-200">
              <h2 className="text-2xl text-black mb-2">Strategy Tips</h2>
              <ul className="list-disc ml-5 text-lg text-blue-800">
                <li className="mb-1">
                  Match audiences with their most effective channels
                </li>
                <li className="mb-1">
                  Balance cost with effectiveness to maximize ROI
                </li>
                <li className="mb-1">
                  Fill all required slots to complete the campaign
                </li>
                {round >= 2 && (
                  <li className="mb-1">
                    Pay attention to channel usage limits
                  </li>
                )}
                {round >= 3 && (
                  <li className="mb-1">
                    Combine strategies to trigger special effects
                  </li>
                )}
              </ul>
            </div>

            {/* Next Round Button */}
            <Button
              onClick={handleComplete}
              disabled={!goalReached && timeLeft > 0}
              size="small"
              className={`mt-auto ${goalReached
                ? "bg-green-600 hover:bg-green-700"
                : timeLeft === 0
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-400 cursor-not-allowed"
                }`}
              label={
                goalReached
                  ? "Advance to Next Round"
                  : timeLeft === 0
                    ? "Retry Round"
                    : "Complete Campaign First"
              }
            />
          </div>
        </div>
      </div>
      <style>{circularProgressStyle}</style>
    </DndProvider>
  );
};

export default RoundDisplay;
