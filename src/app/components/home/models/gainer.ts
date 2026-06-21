export interface Gainer {
    symbol: string;
    companyName: string;
    exchange: string;
    token: string;

    currentPrice: number;
    previousClose: number;

    open: number;
    high: number;
    low: number;

    volume: number;

    change: number;
    changePercent: number;

    emA9: number;
    emA21: number;
    rsi: number;

    stopLoss: number;
    targetPrice: number;

    signal: 'BUY' | 'SELL' | 'HOLD';

    risk: 'LOW' | 'MEDIUM' | 'HIGH';

    reason: string;

    updatedAt: string;
}