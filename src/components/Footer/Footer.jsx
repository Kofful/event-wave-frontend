import { Box, Container, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: blueGrey[500] }} mt="auto" pt={10} pb={10}>
      <Container maxWidth="lg">
        <Typography variant="body1" color="white">Copyright © Event Wave 2024</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
