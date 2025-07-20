// Tipos para consulta de stocks
export interface StockQueryParams {
  symbols: string[];
  from: string;
  to: string;
}

export interface StockDataPoint {
  date: string;
  close: number;
}

export interface StockApiResponse {
  [symbol: string]: StockDataPoint[];
}

// Tipos para Yahoo Finance API
export interface YahooFinanceResponse {
  chart: {
    result: Array<{
      timestamp: number[];
      indicators: {
        quote: Array<{
          close: number[];
        }>;
      };
    }>;
  };
} 