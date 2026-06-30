export interface DashboardSummary {
  availableCash: number;

  strategy: string;

  autoTradingEnabled: boolean;

  paperTrading: boolean;

  dailyTrades: number;

  dailyLoss: number;

  killSwitch: boolean;

  marketStatus: string;

  maxDailyTrades: number;

  maxDailyLoss: number;
}
