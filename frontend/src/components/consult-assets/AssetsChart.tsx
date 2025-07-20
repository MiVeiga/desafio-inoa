import {
  Paper,
  Typography,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartSkeleton } from '../common/ChartSkeleton';
import { EmptyState } from '../common/EmptyState';
import type { AssetsChartProps } from '../../types/consult-assets';

export const AssetsChart = ({ data, loading }: AssetsChartProps) => {
  if (loading) {
    return <ChartSkeleton />;
  }

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <Paper elevation={3} sx={{ 
      p: { xs: 2, sm: 3 }, 
      pb: { xs: 4, sm: 6 }, 
      height: { xs: 500, sm: 600, md: 700 },
      width: '100%'
    }}>
      <Typography variant="h6" gutterBottom>
        Evolução dos Preços
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
          />
          <Tooltip 
            formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, 'Preço']}
            labelFormatter={(label) => `Data: ${label}`}
          />
          <Legend />
          {Object.keys(data[0] || {}).filter(key => key !== 'date').map((symbol, index) => (
            <Line
              key={symbol}
              type="monotone"
              dataKey={symbol}
              stroke={`hsl(${index * 137.5}, 70%, 50%)`}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}; 