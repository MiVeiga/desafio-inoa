import { describe, it, expect } from 'vitest';
import { handleApiError } from '../errorHandler';
import type { ApiError } from '../../types/common';

describe('handleApiError', () => {
  it('should handle network errors', () => {
    const networkError: ApiError = {
      code: 'NETWORK_ERROR',
      message: 'Network Error'
    };

    const result = handleApiError(networkError);
    expect(result).toBe('Erro de conexão. Verifique sua internet e tente novamente.');
  });

  it('should handle timeout errors', () => {
    const timeoutError: ApiError = {
      code: 'ECONNABORTED',
      message: 'timeout'
    };

    const result = handleApiError(timeoutError);
    expect(result).toBe('Tempo limite excedido. Tente novamente.');
  });

  it('should handle 400 status code', () => {
    const badRequestError: ApiError = {
      response: {
        status: 400,
        data: {
          error: 'Parâmetros inválidos'
        }
      }
    };

    const result = handleApiError(badRequestError);
    expect(result).toBe('Parâmetros inválidos');
  });

  it('should handle 404 status code', () => {
    const notFoundError: ApiError = {
      response: {
        status: 404,
        data: {
          error: 'Recurso não encontrado'
        }
      }
    };

    const result = handleApiError(notFoundError);
    expect(result).toBe('Recurso não encontrado');
  });

  it('should handle 500 status code', () => {
    const serverError: ApiError = {
      response: {
        status: 500,
        data: {
          error: 'Erro interno do servidor'
        }
      }
    };

    const result = handleApiError(serverError);
    expect(result).toBe('Erro interno do servidor');
  });

  it('should handle 500 status code without error message', () => {
    const serverError: ApiError = {
      response: {
        status: 500
      }
    };

    const result = handleApiError(serverError);
    expect(result).toBe('Erro interno do servidor. Tente novamente.');
  });

  it('should handle unknown status codes', () => {
    const unknownError: ApiError = {
      response: {
        status: 999
      }
    };

    const result = handleApiError(unknownError);
    expect(result).toBe('Erro inesperado. Tente novamente.');
  });

  it('should handle errors without response', () => {
    const genericError: ApiError = {
      message: 'Erro genérico'
    };

    const result = handleApiError(genericError);
    expect(result).toBe('Erro genérico');
  });

  it('should handle errors without message', () => {
    const emptyError: ApiError = {};

    const result = handleApiError(emptyError);
    expect(result).toBe('Erro desconhecido. Tente novamente.');
  });
}); 