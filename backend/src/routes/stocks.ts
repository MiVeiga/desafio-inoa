import { Router } from 'express';
import { getStockQuotes } from '../services/brapiService';
import { getCachedData, setCache } from '../utils/cache';

export const stockRouter = Router();

stockRouter.get('/', async (req, res) => {
  const symbols = (req.query.symbols as string)?.toUpperCase().split(',').filter(Boolean) || [];
  const from = req.query.from as string;
  const to = req.query.to as string;

  if (!symbols.length || !from || !to) {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  const cacheKey = `${symbols.join(',')}-${from}-${to}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  try {
    const data = await getStockQuotes(symbols, from, to);
    
    // Verificar se há dados válidos
    const hasValidData = Object.values(data).some(assetData => assetData.length > 0);
    if (!hasValidData) {
      return res.status(404).json({ 
        error: 'Nenhum dado encontrado para os ativos e período especificados' 
      });
    }
    
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error('Erro na consulta de stocks:', error);
    
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}); 