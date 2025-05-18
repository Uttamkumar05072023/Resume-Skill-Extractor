import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import SkillsPage from '../pages/SkillsPage';
import Layout from '../components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/skills',
        element: <SkillsPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]); 