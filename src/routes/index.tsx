import { createBrowserRouter } from 'react-router-dom';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';
import Home from '../pages/Home.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Layout from '../components/layout/Layout.tsx';
import { ProtectedRoute } from '../components/ProtectedRoute.tsx';
import { AuthProvider } from '../components/AuthContext.tsx';
import { DASHBOARD, LOGIN, REGISTER } from '@/constants/routes.ts';
import { Jokes } from '@/pages/Jokes.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <div>about</div>,
  },
  {
    path: DASHBOARD,
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'jokes',
        element: <Jokes />,
      },
    ],
  },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  {
    path: '*',
    element: <div>not found</div>,
  },
]);
