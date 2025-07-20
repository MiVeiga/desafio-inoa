import { useState } from 'react';
import { handleApiError } from '../utils/errorHandler';
import type { ApiError, UseApiReturn, ApiFunction } from '../types';

export const useApi = <TArgs extends unknown[], TReturn>(
  apiFunction: ApiFunction<TArgs, TReturn>
): UseApiReturn<TReturn, TArgs> => {
  const [data, setData] = useState<TReturn | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (...args: TArgs): Promise<TReturn> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (error: unknown) {
      const errorMessage = handleApiError(error as ApiError);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearData = () => setData(null);

  return {
    data,
    loading,
    error,
    execute,
    clearError,
    clearData,
  };
}; 