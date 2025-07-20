import { Box, Typography } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({ 
  title = "Faça uma consulta para ver o gráfico",
  message = "Preencha os filtros acima e clique em 'Consultar' para visualizar a evolução dos preços dos ativos selecionados.",
  icon = <TrendingUp sx={{ fontSize: 60, color: 'text.secondary' }} />
}: EmptyStateProps) => {
  return (
    <Box sx={{ 
      height: 400, 
      border: '2px dashed #ccc', 
      borderRadius: 2, 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: '#fafafa',
      gap: 2,
      p: 3
    }}>
      {icon}
      <Typography variant="h6" color="text.secondary" textAlign="center">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ maxWidth: 400 }}>
        {message}
      </Typography>
    </Box>
  );
}; 