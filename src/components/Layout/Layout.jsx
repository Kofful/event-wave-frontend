import { Box, Container } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
    <Header/>
    <Container component="main" maxWidth="lg" sx={{ mb: 3 }}>
      <Outlet />
    </Container>
    <Footer/>
</Box>
);

export default Layout;
