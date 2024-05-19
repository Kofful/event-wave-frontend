import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import ErrorPage from '../components/Errors/ErrorPage';
import EventPage from '../components/EventPage/EventPage';
import LoginPage from '../components/LoginPage/LoginPage';
import Layout from '../components/Layout/Layout';
import RegisterPage from '../components/RegisterPage/RegisterPage';
import CreateEventPage from '../components/CreateEventPage/CreateEventPage';
import AuthenticatedRoute from './AuthenticatedRoute';
import { USER_ROLES } from '../constants/userRoles';
import ForbiddenPage from '../components/Errors/ForbiddenPage';
import UpdateEventPage from '../components/UpdateEventPage/UpdateEventPage';
import NotFoundPage from '../components/Errors/NotFoundPage';
import PurchaseTicketPage from '../components/PurchaseTicketPage/PurchaseTicketPage';

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
        path: '/events/create',
        element: (
          <AuthenticatedRoute allowedRoles={[USER_ROLES.MANAGER]}>
            <CreateEventPage />
          </AuthenticatedRoute>
        ),
      },
      {
        path: '/events/:id/update',
        element:
          <AuthenticatedRoute allowedRoles={[USER_ROLES.MANAGER]}>
            <UpdateEventPage />
          </AuthenticatedRoute>,
      },
      {
        path: '/events/:id/purchase/:ticketId',
        element: <PurchaseTicketPage />,
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
      {
        path: '/forbidden',
        element: <ForbiddenPage />,
      },
      {
        path: '/not-found',
        element: <NotFoundPage />,
      },
    ],
  },
]);

const Router = () => (
  <RouterProvider router={router} />
);

export default Router;
