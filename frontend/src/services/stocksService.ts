import api from './api';
import { handleApiError } from '../utils/errorHandler';
import type { StockQueryParams, StockApiResponse, ApiError } from '../types';

export const stocksService = {
  async getStockQuotes(params: StockQueryParams): Promise<StockApiResponse> {
    const { symbols, from, to } = params;
    
    try {
      const response = await api.get<StockApiResponse>('/stocks', {
        params: {
          symbols: symbols.join(','),
          from,
          to,
        },
      });
      
      return response.data;
    } catch (error: unknown) {
      const errorMessage = handleApiError(error as ApiError);
      throw new Error(errorMessage);
    }
  },
}; 