import { Paper, Typography, Box, Skeleton } from '@mui/material';

export const ChartSkeleton = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, pb: 6, height: 700 }}>
      <Typography variant="h6" gutterBottom>
        Evolução dos Preços
      </Typography>
      
      <Box sx={{ height: 600, position: 'relative' }}>

        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={500} 
          sx={{ borderRadius: 1 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
          <Skeleton variant="rectangular" width={80} height={20} />
          <Skeleton variant="rectangular" width={80} height={20} />
          <Skeleton variant="rectangular" width={80} height={20} />
        </Box>
        
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Carregando dados...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Aguarde enquanto processamos as informações
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}; 