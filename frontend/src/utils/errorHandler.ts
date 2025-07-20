import type { ApiError } from '../types/common';

export const handleApiError = (error: ApiError): string => {

  if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
    return 'Erro de conexão. Verifique sua internet e tente novamente.';
  }

  if (error.code === 'ECONNABORTED') {
    return 'Tempo limite excedido. Tente novamente.';
  }

  if (error.response?.status) {
    switch (error.response.status) {
      case 400:
        return error.response.data?.error || 'Parâmetros inválidos. Verifique os dados informados.';
      
      case 401:
        return 'Não autorizado. Verifique suas credenciais.';
      
      case 403:
        return 'Acesso negado. Você não tem permissão para esta operação.';
      
      case 404:
        return error.response.data?.error || 'Recurso não encontrado.';
      
      case 408:
        return 'Tempo limite da requisição excedido.';
      
      case 429:
        return 'Muitas requisições. Tente novamente em alguns minutos.';
      
      case 500:
        return error.response.data?.error || 'Erro interno do servidor. Tente novamente.';
      
      case 502:
        return 'Servidor temporariamente indisponível. Tente novamente.';
      
      case 503:
        return 'Serviço temporariamente indisponível. Tente novamente.';
      
      case 504:
        return 'Tempo limite do gateway excedido. Tente novamente.';
      
      default:
        return error.response.data?.error || 'Erro inesperado. Tente novamente.';
    }
  }

  return error.message || 'Erro desconhecido. Tente novamente.';
}; 