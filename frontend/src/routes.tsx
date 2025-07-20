import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/_layout/index';
import Home from './pages/home/index';
import ConsultAssets from './pages/consult-assets/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/consultar-ativos',
        element: <ConsultAssets />,
      },
    ],
  },
]); 