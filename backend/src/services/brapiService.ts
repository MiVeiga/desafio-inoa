import axios from 'axios';
import type { StockApiResponse, YahooFinanceResponse } from '../types';

export async function getStockQuotes(symbols: string[], from: string, to: string): Promise<StockApiResponse> {
  const results: StockApiResponse = {};

  for (const symbol of symbols) {
    try {
      // Usando Yahoo Finance API (gratuita e sem autenticação)
      const response = await axios.get<YahooFinanceResponse>(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.SA?period1=${Math.floor(new Date(from).getTime() / 1000)}&period2=${Math.floor(new Date(to).getTime() / 1000)}&interval=1d`
      );
      
      const data = response.data?.chart?.result?.[0];
      if (data) {
        const timestamps = data.timestamp || [];
        const quotes = data.indicators?.quote?.[0] || {};
        const closes = quotes.close || [];
        
        const historicalData = timestamps.map((timestamp: number, index: number) => ({
          date: new Date(timestamp * 1000).toISOString().split('T')[0],
          close: closes[index] || 0
        })).filter((item) => item.close !== 0);
        
        results[symbol] = historicalData;
      } else {
        results[symbol] = [];
      }
    } catch (error) {
      console.error(`Erro ao buscar dados para ${symbol}:`, error);
      results[symbol] = [];
    }
  }

  return results;
} 