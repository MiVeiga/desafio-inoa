import { Alert, AlertTitle, Collapse } from '@mui/material';
import type { AlertMessageProps } from '../../types/common';

export const AlertMessage = ({ open, severity, title, message, onClose }: AlertMessageProps) => {
  return (
    <Collapse in={open}>
      <Alert 
        severity={severity} 
        onClose={onClose}
        sx={{ mb: 2 }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Collapse>
  );
}; 