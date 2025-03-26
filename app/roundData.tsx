// Game data for Round 2 and 3 with increased difficulty

// Round 2: Expanded audiences and channels with more nuanced effectiveness
export const ROUND_2_DATA = {
    initialBudget: 45000,
    targetROI: 7500,
    timeLimit: 100, // 1:40 minutes
    audienceTypes: {
      "Young Professionals": {
        reach: 800000,
        description: "Age 25-35, career-focused, tech-savvy"
      },
      "Parents": {
        reach: 1400000,
        description: "Adults with children, family-oriented"
      },
      "Students": {
        reach: 600000,
        description: "College and university students"
      },
      "Business Owners": {
        reach: 350000,
        description: "Entrepreneurs and small business leaders"
      }
    },
    channelTypes: {
      "Social Media": {
        cost: 7000,
        description: "Instagram, TikTok, Twitter campaigns"
      },
      "Search Ads": {
        cost: 12000,
        description: "Google and Bing paid search results"
      },
      "Email Marketing": {
        cost: 5000,
        description: "Targeted email campaigns to existing lists"
      },
      "Podcast Sponsorships": {
        cost: 15000,
        description: "Ads on popular podcast networks"
      }
    },
    // Effectiveness scores (match percentages)
    effectiveness: {
      "Young Professionals": {
        "Social Media": 80,
        "Search Ads": 75,
        "Email Marketing": 60,
        "Podcast Sponsorships": 85
      },
      "Parents": {
        "Social Media": 65,
        "Search Ads": 80,
        "Email Marketing": 70,
        "Podcast Sponsorships": 50
      },
      "Students": {
        "Social Media": 90,
        "Search Ads": 60,
        "Email Marketing": 40,
        "Podcast Sponsorships": 75
      },
      "Business Owners": {
        "Social Media": 55,
        "Search Ads": 85,
        "Email Marketing": 80,
        "Podcast Sponsorships": 60
      }
    },
    // Extra rules
    rules: {
      requiredCombinations: 4, // Must fill all 4 slots
      channelLimits: {
        "Social Media": 2,  // Can only use Social Media twice
        "Podcast Sponsorships": 1  // Can only use Podcasts once
      }
    },
  };
  
  // Round 3: Complex targeting with specific segments, budget constraints, and ROI multipliers
  export const ROUND_3_DATA = {
    initialBudget: 60000,
    targetROI: 10000,
    timeLimit: 90, // 1:30 minutes
    audienceTypes: {
      "Urban Millennials": {
        reach: 750000,
        description: "City dwellers, age 25-40, high disposable income",
        engagementMultiplier: 1.2 // Engaged audiences produce 20% higher ROI
      },
      "Suburban Families": {
        reach: 1200000,
        description: "Married with children, homeowners, value-conscious",
        engagementMultiplier: 0.9
      },
      "Gen Z": {
        reach: 900000,
        description: "Age 18-24, tech-native, trend-focused",
        engagementMultiplier: 1.3
      },
      "Remote Workers": {
        reach: 600000,
        description: "WFH professionals, flexible schedules",
        engagementMultiplier: 1.1
      },
      "Retirees": {
        reach: 450000,
        description: "Age 65+, leisure-focused, higher brand loyalty",
        engagementMultiplier: 0.8
      }
    },
    channelTypes: {
      "Influencer Marketing": {
        cost: 18000,
        description: "Partnerships with relevant content creators",
        budgetMultiplier: 0.9 // 10% discount when combining certain channels
      },
      "Video Streaming": {
        cost: 25000,
        description: "Ads on YouTube, Hulu, and other platforms",
        budgetMultiplier: 1.0
      },
      "Print Media": {
        cost: 12000,
        description: "Magazine and newspaper placements",
        budgetMultiplier: 1.1 // 10% premium for traditional media
      },
      "Mobile Apps": {
        cost: 15000,
        description: "In-app advertising and promotions",
        budgetMultiplier: 0.9
      },
      "Outdoor Digital": {
        cost: 20000,
        description: "Digital billboards and interactive displays",
        budgetMultiplier: 1.0
      }
    },
    // Effectiveness scores (match percentages)
    effectiveness: {
      "Urban Millennials": {
        "Influencer Marketing": 90,
        "Video Streaming": 80,
        "Print Media": 30,
        "Mobile Apps": 85,
        "Outdoor Digital": 70
      },
      "Suburban Families": {
        "Influencer Marketing": 55,
        "Video Streaming": 75,
        "Print Media": 65,
        "Mobile Apps": 60,
        "Outdoor Digital": 50
      },
      "Gen Z": {
        "Influencer Marketing": 95,
        "Video Streaming": 85,
        "Print Media": 20,
        "Mobile Apps": 90,
        "Outdoor Digital": 65
      },
      "Remote Workers": {
        "Influencer Marketing": 70,
        "Video Streaming": 75,
        "Print Media": 40,
        "Mobile Apps": 80,
        "Outdoor Digital": 30
      },
      "Retirees": {
        "Influencer Marketing": 30,
        "Video Streaming": 50,
        "Print Media": 85,
        "Mobile Apps": 40,
        "Outdoor Digital": 60
      }
    },
    // Extra rules and constraints
    rules: {
      requiredCombinations: 5, // Must fill all 5 slots
      channelLimits: {
        "Video Streaming": 2,
        "Influencer Marketing": 2
      },
      // Special rules
      specialEffects: [
        {
          name: "Digital Synergy",
          description: "Combining Mobile Apps and Video Streaming for the same audience gives +15% effectiveness",
          conditions: {
            channels: ["Mobile Apps", "Video Streaming"],
            sameAudience: true
          },
          bonus: {
            effectivenessBonus: 15
          }
        },
        {
          name: "Cross-Generation Reach",
          description: "Using Print Media for Retirees and Influencers for Gen Z reduces total cost by 10%",
          conditions: {
            combinations: [
              { audience: "Retirees", channel: "Print Media" },
              { audience: "Gen Z", channel: "Influencer Marketing" }
            ]
          },
          bonus: {
            budgetDiscount: 0.1
          }
        },
        {
          name: "Limited Media Budget",
          description: "Can only spend 40% of total budget on traditional media (Print, Outdoor)",
          conditions: {
            channelTypes: ["Print Media", "Outdoor Digital"],
            maxBudgetPercentage: 0.4
          }
        }
      ]
    },
  };