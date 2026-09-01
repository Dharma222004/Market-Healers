// AI Service Architecture Layer for Phase 2 Shells (Ready for Phase 3 Model Integration)

export interface IChatMessage {
  id: string;
  sender: "user" | "ruzhaa";
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface IRuzhaaServiceExtended {
  getConversation(): Promise<IChatMessage[]>;
  sendMessage(text: string): Promise<IChatMessage>;
  clearConversation(): Promise<void>;
}

export interface IScreenerFilter {
  sector?: string;
  minMarketCapCr?: number;
  maxPe?: number;
  minRoe?: number;
  minRoce?: number;
  maxDebtToEquity?: number;
  min52wProximity?: number; // % of 52w high
}

export interface IDhaleoServiceExtended {
  screenStocks(filters: IScreenerFilter): Promise<any[]>;
  getSavedScreens(): Promise<any[]>;
}

export interface IJaroServiceExtended {
  analyzeCompany(symbol: string): Promise<any>;
  getFundamentals(symbol: string): Promise<any>;
  getTechnicalData(symbol: string): Promise<any>;
  getPeerComparison(symbol: string): Promise<any[]>;
}

export interface IDhruvanServiceExtended {
  getPrediction(symbol: string): Promise<{
    symbol: string;
    targetHorizon: string;
    predictedDirection: "Upward Bias" | "Consolidation" | "Downward Bias";
    confidenceScore: number;
    expectedRange: { low: number; high: number };
    historicalAccuracy: string;
    modelStatus: string;
    disclaimer: string;
  }>;
}

// 1. Ruzhaa Mock Service
class RuzhaaServiceExtended implements IRuzhaaServiceExtended {
  private messages: IChatMessage[] = [
    {
      id: "msg-1",
      sender: "ruzhaa",
      text: "Hello! I am Ruzhaa, your personal financial learning assistant. You can ask me to explain financial terms, deconstruct balance sheets, or guide your course progression.",
      timestamp: "Just now",
      suggestedFollowUps: [
        "What is a moving average?",
        "Explain PE ratio.",
        "How does a stock screener work?",
        "What should I learn after technical analysis?",
      ],
    },
  ];

  async getConversation(): Promise<IChatMessage[]> {
    return [...this.messages];
  }

  async sendMessage(text: string): Promise<IChatMessage> {
    const userMsg: IChatMessage = {
      id: "usr_" + Date.now(),
      sender: "user",
      text,
      timestamp: "Just now",
    };
    this.messages.push(userMsg);

    // Simulated pedagogical response
    let replyText = "A key principle in market mechanics is separating emotional noise from structural data. What specific aspect of this concept would you like to explore deeper?";
    const q = text.toLowerCase();

    if (q.includes("moving average")) {
      replyText = "A moving average (MA) calculates the average price of an equity over a defined sequence of intervals (e.g. 20, 50, or 200 days). It acts as a dynamic trendline: when the price trades above a rising 50-day moving average, institutional momentum is typically positive.";
    } else if (q.includes("pe ratio") || q.includes("p/e")) {
      replyText = "The Price-to-Earnings (P/E) ratio compares a company's market share price to its annual earnings per share (EPS). A high P/E implies that the market expects rapid growth or premium durability, while a low P/E may indicate either undervaluation or underlying structural problems.";
    } else if (q.includes("screener")) {
      replyText = "A stock screener filters thousands of listed companies by mathematical parameters such as ROCE > 15%, Debt-to-Equity < 0.5x, and market capitalization. Dhaleo AI helps you isolate high-quality businesses before opening a chart.";
    } else if (q.includes("after technical") || q.includes("next")) {
      replyText = "After mastering technical analysis (Level 02), we strongly advise progressing to Fundamental Valuation (Level 03). Technical analysis identifies *when* institutional accumulation occurs, while fundamental analysis clarifies *what* quality you are actually buying.";
    }

    const ruzhaaReply: IChatMessage = {
      id: "rzh_" + Date.now(),
      sender: "ruzhaa",
      text: replyText,
      timestamp: "Just now",
      suggestedFollowUps: ["Give a real Indian market example", "How do institutions analyze this?", "Show relevant course module"],
    };
    this.messages.push(ruzhaaReply);
    return ruzhaaReply;
  }

  async clearConversation(): Promise<void> {
    this.messages = [this.messages[0]];
  }
}

export const ruzhaaServiceExtended = new RuzhaaServiceExtended();

// 2. Dhaleo Screener Service
class DhaleoServiceExtended implements IDhaleoServiceExtended {
  private allStocks = [
    { symbol: "TCS", name: "Tata Consultancy Services", sector: "Information Technology", price: 4192.5, pe: 31.4, pb: 14.2, roe: 51.2, roce: 62.4, debtToEquity: 0.05, cap: 1516000, prox52w: 91.3 },
    { symbol: "RELIANCE", name: "Reliance Industries Ltd", sector: "Energy & Conglomerate", price: 3024.1, pe: 27.2, pb: 2.4, roe: 9.8, roce: 11.2, debtToEquity: 0.38, cap: 2045000, prox52w: 94.0 },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Banking & Financials", price: 1684.2, pe: 18.9, pb: 2.8, roe: 17.1, roce: 18.2, debtToEquity: 0.85, cap: 1282000, prox52w: 93.8 },
    { symbol: "INFY", name: "Infosys Ltd", sector: "Information Technology", price: 1845.8, pe: 28.1, pb: 7.8, roe: 32.4, roce: 41.2, debtToEquity: 0.08, cap: 765000, prox52w: 92.6 },
    { symbol: "LT", name: "Larsen & Toubro", sector: "Capital Goods & Infra", price: 3620.0, pe: 36.8, pb: 5.1, roe: 16.4, roce: 19.8, debtToEquity: 0.65, cap: 497000, prox52w: 92.3 },
    { symbol: "TITAN", name: "Titan Company Ltd", sector: "Consumer Discretionary", price: 3510.4, pe: 84.2, pb: 22.4, roe: 30.1, roce: 36.8, debtToEquity: 0.42, cap: 311000, prox52w: 90.5 },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Banking & Financials", price: 1245.5, pe: 17.5, pb: 3.1, roe: 18.6, roce: 19.4, debtToEquity: 0.78, cap: 874000, prox52w: 96.2 },
    { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", sector: "Telecommunications", price: 1590.0, pe: 54.2, pb: 8.9, roe: 15.2, roce: 17.4, debtToEquity: 1.12, cap: 910000, prox52w: 97.4 },
  ];

  async screenStocks(filters: IScreenerFilter): Promise<any[]> {
    return this.allStocks.filter((s) => {
      if (filters.sector && filters.sector !== "All" && s.sector !== filters.sector) return false;
      if (filters.maxPe && s.pe > filters.maxPe) return false;
      if (filters.minRoe && s.roe < filters.minRoe) return false;
      if (filters.minRoce && s.roce < filters.minRoce) return false;
      if (filters.maxDebtToEquity && s.debtToEquity > filters.maxDebtToEquity) return false;
      return true;
    });
  }

  async getSavedScreens(): Promise<any[]> {
    return [
      { id: "scr-1", name: "High ROCE Compounders", criteria: "ROCE > 25%, Debt < 0.5x" },
      { id: "scr-2", name: "Fair Value Financials", criteria: "P/E < 20, ROE > 15%" },
    ];
  }
}

export const dhaleoServiceExtended = new DhaleoServiceExtended();

// 3. Jaro Analyst Terminal Service
class JaroServiceExtended implements IJaroServiceExtended {
  async analyzeCompany(symbol: string): Promise<any> {
    const sym = symbol.toUpperCase().trim() || "RELIANCE";
    return {
      symbol: sym,
      name: sym === "TCS" ? "Tata Consultancy Services" : sym === "HDFCBANK" ? "HDFC Bank Ltd" : "Reliance Industries Ltd",
      sector: sym === "TCS" ? "Information Technology" : sym === "HDFCBANK" ? "Banking & Financials" : "Energy & Retail Conglomerate",
      price: sym === "TCS" ? 4192.5 : sym === "HDFCBANK" ? 1684.2 : 3024.1,
      changePercent: 0.85,
      overallHealthScore: 8.4, // out of 10
      valuationAssessment: "Fair to Mild Premium",
      technicalRegime: "Ascending Channel with 50 EMA Support",
      fundamentals: {
        pe: sym === "TCS" ? 31.4 : 27.2,
        pb: sym === "TCS" ? 14.2 : 2.4,
        roe: sym === "TCS" ? 51.2 : 9.8,
        roce: sym === "TCS" ? 62.4 : 11.2,
        debtToEquity: sym === "TCS" ? 0.05 : 0.38,
        dividendYield: 1.15,
        operatingCashFlowCr: 124000,
        fcfYield: 3.4,
      },
      risks: [
        "Global macroeconomic growth slowdown affecting export revenues",
        "Raw material volatility and currency fluctuations against USD",
        "High capital expenditure timeline in alternative energy transitions",
      ],
      peers: [
        { symbol: "TCS", pe: 31.4, roe: 51.2, mcap: "₹15,16,000 Cr" },
        { symbol: "INFY", pe: 28.1, roe: 32.4, mcap: "₹7,65,000 Cr" },
        { symbol: "WIPRO", pe: 22.4, roe: 15.8, mcap: "₹2,84,000 Cr" },
      ],
    };
  }

  async getFundamentals(symbol: string) {
    const res = await this.analyzeCompany(symbol);
    return res.fundamentals;
  }

  async getTechnicalData(_symbol: string) {
    return {
      trend: "Bullish Accumulation",
      ema20: 2990.5,
      ema50: 2940.2,
      ema200: 2780.0,
      rsi14: 61.4,
      macdSignal: "Positive Crossover",
    };
  }

  async getPeerComparison(symbol: string) {
    const res = await this.analyzeCompany(symbol);
    return res.peers;
  }
}

export const jaroServiceExtended = new JaroServiceExtended();

// 4. Dhruvan LSTM Research Service
class DhruvanServiceExtended implements IDhruvanServiceExtended {
  async getPrediction(symbol: string) {
    const sym = symbol.toUpperCase().trim() || "NIFTY 50";
    return {
      symbol: sym,
      targetHorizon: "Next Trading Session (1D)",
      predictedDirection: "Upward Bias" as const,
      confidenceScore: 68.4,
      expectedRange: { low: 24780.0, high: 24950.0 },
      historicalAccuracy: "64.2% across 1,250 validation sessions",
      modelStatus: "CALIBRATED // LSTM-MULTI-LAYER",
      disclaimer:
        "Model output is probabilistic and generated through sequential historical time-series patterns. This is NOT a guarantee of return, and must NEVER be treated as personal investment advice.",
    };
  }
}

export const dhruvanServiceExtended = new DhruvanServiceExtended();
