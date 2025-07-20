import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useApi } from './useApi';

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const mockApiFunction = vi.fn();
    const { result } = renderHook(() => useApi(mockApiFunction));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.execute).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
    expect(typeof result.current.clearData).toBe('function');
  });

  it('should execute API function successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockApiFunction = vi.fn().mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useApi(mockApiFunction));

    await act(async () => {
      await result.current.execute('test-param');
    });

    expect(mockApiFunction).toHaveBeenCalledWith('test-param');
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should handle API errors', async () => {
    const mockError = new Error('API Error');
    const mockApiFunction = vi.fn().mockRejectedValue(mockError);
    
    const { result } = renderHook(() => useApi(mockApiFunction));

    await act(async () => {
      try {
        await result.current.execute('test-param');
      } catch {
        // Intentionally empty
      }
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('API Error');
    expect(result.current.loading).toBe(false);
  });

  it('should clear error when clearError is called', async () => {
    const mockError = new Error('API Error');
    const mockApiFunction = vi.fn().mockRejectedValue(mockError);
    
    const { result } = renderHook(() => useApi(mockApiFunction));

    await act(async () => {
      try {
        await result.current.execute('test-param');
      } catch {
        // Intentionally empty
      }
    });
    
    expect(result.current.error).toBe('API Error');

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should clear data when clearData is called', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockApiFunction = vi.fn().mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useApi(mockApiFunction));

    await act(async () => {
      await result.current.execute('test-param');
    });
    
    expect(result.current.data).toEqual(mockData);

    act(() => {
      result.current.clearData();
    });

    expect(result.current.data).toBeNull();
  });

  it('should handle multiple parameters', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockApiFunction = vi.fn().mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useApi(mockApiFunction));

    await act(async () => {
      await result.current.execute('param1', 'param2', 123);
    });

    expect(mockApiFunction).toHaveBeenCalledWith('param1', 'param2', 123);
    expect(result.current.data).toEqual(mockData);
  });

  it('should handle API errors with response data', async () => {
    const mockApiError = {
      response: {
        status: 400,
        data: {
          error: 'Bad Request'
        }
      }
    };
    const mockApiFunction = vi.fn().mockRejectedValue(mockApiError);
    
    const { result } = renderHook(() => useApi(mockApiFunction));

    await act(async () => {
      try {
        await result.current.execute('test-param');
      } catch {
        // Intentionally empty
      }
    });

    expect(result.current.error).toBe('Bad Request');
  });

  it('should handle network errors', async () => {
    const mockNetworkError = {
      code: 'NETWORK_ERROR',
      message: 'Network Error'
    };
    const mockApiFunction = vi.fn().mockRejectedValue(mockNetworkError);
    
    const { result } = renderHook(() => useApi(mockApiFunction));

    await act(async () => {
      try {
        await result.current.execute('test-param');
      } catch {
        // Intentionally empty
      }
    });

    expect(result.current.error).toBe('Erro de conexão. Verifique sua internet e tente novamente.');
  });
}); 