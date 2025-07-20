import { describe, it, expect, vi, beforeEach } from 'vitest';
import { stocksService } from './stocksService';
import type { StockQueryParams } from '../types/consult-assets';

vi.mock('./api', () => {
  const mockGet = vi.fn();
  return {
    default: {
      get: mockGet,
    },
  };
});

describe('stocksService', () => {
  let mockGet: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const apiModule = await import('./api');
    mockGet = apiModule.default.get as ReturnType<typeof vi.fn>;
  });

  it('should call API with correct parameters', async () => {
    const mockResponse = {
      data: {
        PETR4: [
          { date: '2024-01-01', close: 30.50 },
          { date: '2024-01-02', close: 31.00 },
        ],
      },
    };

    mockGet.mockResolvedValue(mockResponse);

    const params: StockQueryParams = {
      symbols: ['PETR4', 'VALE3'],
      from: '2024-01-01',
      to: '2024-01-31',
    };

    const result = await stocksService.getStockQuotes(params);

    expect(mockGet).toHaveBeenCalledWith('/stocks', {
      params: {
        symbols: 'PETR4,VALE3',
        from: '2024-01-01',
        to: '2024-01-31',
      },
    });

    expect(result).toEqual(mockResponse.data);
  });

  it('should handle API errors with response data', async () => {
    const mockError = {
      response: {
        status: 400,
        data: {
          error: 'Parâmetros inválidos',
        },
      },
    };

    mockGet.mockRejectedValue(mockError);

    const params: StockQueryParams = {
      symbols: ['INVALID'],
      from: '2024-01-01',
      to: '2024-01-31',
    };

    await expect(stocksService.getStockQuotes(params)).rejects.toThrow('Parâmetros inválidos');
  });

  it('should handle 404 errors', async () => {
    const mockError = {
      response: {
        status: 404,
      },
    };

    mockGet.mockRejectedValue(mockError);

    const params: StockQueryParams = {
      symbols: ['NOTFOUND'],
      from: '2024-01-01',
      to: '2024-01-31',
    };

    await expect(stocksService.getStockQuotes(params)).rejects.toThrow(
      'Recurso não encontrado.'
    );
  });

  it('should handle 400 errors', async () => {
    const mockError = {
      response: {
        status: 400,
      },
    };

    mockGet.mockRejectedValue(mockError);

    const params: StockQueryParams = {
      symbols: ['INVALID'],
      from: '2024-01-01',
      to: '2024-01-31',
    };

    await expect(stocksService.getStockQuotes(params)).rejects.toThrow(
      'Parâmetros inválidos. Verifique os dados informados.'
    );
  });

  it('should handle network errors', async () => {
    const mockError = {
      code: 'NETWORK_ERROR',
    };

    mockGet.mockRejectedValue(mockError);

    const params: StockQueryParams = {
      symbols: ['PETR4'],
      from: '2024-01-01',
      to: '2024-01-31',
    };

    await expect(stocksService.getStockQuotes(params)).rejects.toThrow(
      'Erro de conexão. Verifique sua internet e tente novamente.'
    );
  });

  it('should handle generic errors', async () => {
    const mockError = new Error('Unknown error');

    mockGet.mockRejectedValue(mockError);

    const params: StockQueryParams = {
      symbols: ['PETR4'],
      from: '2024-01-01',
      to: '2024-01-31',
    };

    await expect(stocksService.getStockQuotes(params)).rejects.toThrow(
      'Unknown error'
    );
  });

  it('should handle empty symbols array', async () => {
    const mockResponse = {
      data: {},
    };

    mockGet.mockResolvedValue(mockResponse);

    const params: StockQueryParams = {
      symbols: [],
      from: '2024-01-01',
      to: '2024-01-31',
    };

    const result = await stocksService.getStockQuotes(params);

    expect(mockGet).toHaveBeenCalledWith('/stocks', {
      params: {
        symbols: '',
        from: '2024-01-01',
        to: '2024-01-31',
      },
    });

    expect(result).toEqual({});
  });
}); 