import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';

const commonRoutes = [
  {
    path: '/',
    element: <Home />
  }
];

export const router = createBrowserRouter(commonRoutes);
