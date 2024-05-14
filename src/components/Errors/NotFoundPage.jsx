import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
  return (
    <Box mt={3} alignItems="center" display="flex" flexDirection="column">
      <Typography variant="h4">Сторінку не знайдено!</Typography>
      <Typography variant="body1" sx={{ mt: 5 }}>
        <Link to="/" >Повернутися на головну</Link>.
      </ Typography>
    </Box>
  );
};

export default ForbiddenPage;
