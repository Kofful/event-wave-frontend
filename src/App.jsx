import Header from './components/Header/Header';
import GlobalProviders from './GlobalProviders';
import HomePage from './components/HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import EventPage from './components/EventPage/EventPage';
import { Box, Container } from '@mui/material';
import Footer from './components/Footer/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/events/:id',
    element: <EventPage />,
  },
])

function App() {
  return (
    <GlobalProviders>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header/>
        <Container component="main" maxWidth="lg">
          <RouterProvider router={router} />
        </Container>
        <Footer/>
      </Box>
    </GlobalProviders>
  );
}

export default App;
