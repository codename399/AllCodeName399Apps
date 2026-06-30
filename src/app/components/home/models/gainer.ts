export interface Gainer {
  // ---------- Instrument ----------

  symbol: string;

  companyName?: string;

  exchange?: string;

  token?: string;

  // ---------- Price ----------

  currentPrice: number;

  previousClose: number;

  open?: number;

  high?: number;

  low?: number;

  volume?: number;

  // ---------- Performance ----------

  change?: number;

  changePercent: number;

  // ---------- Indicators ----------

  vwap: number;

  emA9: number;

  emA21: number;

  rsi: number;

  volumeMultiplier: number;

  pullbackDistance: number;

  // ---------- Trading ----------

  signal: 'BUY' | 'SELL' | 'HOLD' | 'SETUP';

  risk: 'LOW' | 'MEDIUM' | 'HIGH';

  score: number;

  isOwned: boolean;

  // ---------- Trade Levels ----------

  stopLoss: number;

  targetPrice: number;

  // ---------- Explanation ----------

  reason: string;

  // ---------- Metadata ----------

  updatedAt?: string;
}
