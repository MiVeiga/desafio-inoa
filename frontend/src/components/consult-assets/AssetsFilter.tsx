import { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { AlertMessage } from '../common/AlertMessage';
import type { AssetsFilterProps } from '../../types/consult-assets';

export const AssetsFilter = ({ onSubmit, loading, error, onClearError }: AssetsFilterProps) => {
  const [assets, setAssets] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const isFormValid = assets.trim() && startDate && endDate;

  const handleSubmit = () => {
    if (!assets.trim()) {
      return;
    }
    
    if (!startDate || !endDate) {
      return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
      return;
    }
    
    onSubmit(assets, startDate, endDate);
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 3, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Filtros de Consulta
      </Typography>
      
      <AlertMessage
        open={!!error}
        severity="error"
        title="Erro na Consulta"
        message={error || ''}
        onClose={onClearError}
      />
      
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Preencha os campos abaixo para solicitar a consulta:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Ativos (ex: PETR4 VALE3)"
          value={assets}
          onChange={(e) => setAssets(e.target.value)}
          fullWidth
          required
          placeholder="Digite os códigos dos ativos"
          helperText="Ex: PETR4 VALE3 ITUB4"
        />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2,
          alignItems: { sm: 'flex-end' }
        }}>
          <TextField
            label="Data de início"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ flex: { sm: 1 } }}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Data de fim"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ flex: { sm: 1 } }}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
            sx={{ 
              minWidth: { sm: 150 },
              width: { xs: '100%', sm: 'auto' }
            }}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Consultando...' : 'Consultar'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}; 