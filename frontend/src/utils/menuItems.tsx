import {
  Assessment as AssessmentIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import type { MenuItem } from '../types/common';

export const menuItems: MenuItem[] = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Consultar Ativos', icon: <AssessmentIcon />, path: '/consultar-ativos' },
]; 