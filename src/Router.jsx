import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import EventPage from './components/EventPage/EventPage';
import LoginPage from './components/LoginPage/LoginPage';
import Layout from './components/Layout/Layout';
import RegisterPage from './components/RegisterPage/RegisterPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/events/:id',
        element: <EventPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
]);

const Router = () => (
  <RouterProvider router={router} />
);

export default Router;
