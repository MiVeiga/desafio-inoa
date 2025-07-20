import { useState } from 'react';
import { Box } from '@mui/material';
import { AssetsFilter } from '../../components/consult-assets/AssetsFilter';
import { AssetsChart } from '../../components/consult-assets/AssetsChart';
import { useApi } from '../../hooks/useApi';
import { stocksService } from '../../services/stocksService';
import type { ChartDataPoint, StockApiResponse } from '../../types/consult-assets';

const ConsultAssets = () => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  
  const { loading, error, execute, clearError } = useApi(stocksService.getStockQuotes);

  const handleSubmit = async (assets: string, startDate: string, endDate: string) => {
    try {
      const symbols = assets.trim().split(/\s+/).filter(Boolean);
      
      const data = await execute({
        symbols,
        from: startDate,
        to: endDate,
      });
            
      const processedData = processDataForChart(data);

      setChartData(processedData);
    } catch (error) {
      console.error('Erro ao consultar assets:', error);
    }
  };

  const processDataForChart = (apiData: StockApiResponse): ChartDataPoint[] => {
    const allDates = new Set<string>();
    
    Object.values(apiData).forEach((assetData) => {
      assetData.forEach((item) => {
        allDates.add(item.date);
      });
    });
    
    const sortedDates = Array.from(allDates).sort();
    
    return sortedDates.map(date => {
      const dataPoint: ChartDataPoint = { date };
      
      Object.keys(apiData).forEach(symbol => {
        const assetData = apiData[symbol];
        const item = assetData.find((d) => d.date === date);
        dataPoint[symbol] = item ? item.close : null;
      });
      
      return dataPoint;
    });
  };

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    }}>
      <AssetsFilter 
        onSubmit={handleSubmit} 
        loading={loading} 
        error={error || undefined}
        onClearError={clearError}
      />
      <Box sx={{ mt: { xs: 2, sm: 3 }, flex: 1 }}>
        <AssetsChart data={chartData} loading={loading} />
      </Box>
    </Box>
  );
};

export default ConsultAssets; 