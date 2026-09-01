// AI Services Layer Abstraction for Market Healers Ecosystem

export interface IRuzhaaService {
  askConcept(question: string, courseContext?: string): Promise<{ answer: string; relatedConcepts: string[] }>;
}

export interface IDhaleoService {
  filterStocks(criteria: { minPe?: number; maxPe?: number; minRoe?: number; sector?: string }): Promise<any[]>;
}

export interface IDetermindService {
  calculateProfile(answers: Record<string, any>): Promise<{
    archetype: string;
    riskUnderstanding: number;
    financialDiscipline: number;
    marketKnowledge: number;
    recommendedPath: string;
  }>;
}

export interface IJaroService {
  analyzeCompany(symbol: string): Promise<{
    symbol: string;
    valuationScore: number;
    technicalStructure: string;
    fundamentalHealth: string;
    keyRisks: string[];
  }>;
}

export interface IDhruvanService {
  getLstmProbabilities(symbol: string): Promise<{
    symbol: string;
    predictedDirection: "Upward Bias" | "Consolidation" | "Downward Bias";
    confidenceScore: number;
    disclaimer: string;
    historicalWindow: string;
  }>;
}

export const ruzhaaService: IRuzhaaService = {
  async askConcept(question: string) {
    return {
      answer:
        "A moving average is a technical analysis indicator that helps smooth out price data by creating a constantly updated average price over a specific period (e.g., 20-day, 50-day, or 200-day). It filters out short-term market noise to reveal the underlying trend direction.",
      relatedConcepts: ["Exponential Moving Average (EMA)", "Golden Cross", "Support and Resistance"],
    };
  },
};

export const dhaleoService: IDhaleoService = {
  async filterStocks(criteria) {
    return [
      { symbol: "TCS", sector: "IT", pe: 31.4, roe: 51.2, status: "Meets criteria" },
      { symbol: "HDFCBANK", sector: "Banking", pe: 18.9, roe: 17.1, status: "Meets criteria" },
    ];
  },
};

export const determindService: IDetermindService = {
  async calculateProfile(answers) {
    const isBeginner = answers.experience === "Beginner";
    return {
      archetype: isBeginner ? "Foundational Wealth Builder" : "Strategic Value Investor",
      riskUnderstanding: isBeginner ? 58 : 82,
      financialDiscipline: 81,
      marketKnowledge: isBeginner ? 45 : 74,
      recommendedPath: isBeginner ? "Level 01: Market Foundations" : "Level 03: Fundamental Valuation",
    };
  },
};

export const jaroService: IJaroService = {
  async analyzeCompany(symbol: string) {
    return {
      symbol,
      valuationScore: 78,
      technicalStructure: "Above 50-day SMA, consolidating in ascending channel",
      fundamentalHealth: "Low debt-to-equity, consistent operating margin expansion",
      keyRisks: ["Macro interest rate shifts", "Raw material price volatility"],
    };
  },
};

export const dhruvanService: IDhruvanService = {
  async getLstmProbabilities(symbol: string) {
    return {
      symbol,
      predictedDirection: "Upward Bias",
      confidenceScore: 68.4,
      historicalWindow: "1,250 Trading Sessions",
      disclaimer:
        "Model output is probabilistic and generated via historical sequential time-series patterns. This does NOT constitute financial advice or a guaranteed forecast.",
    };
  },
};
