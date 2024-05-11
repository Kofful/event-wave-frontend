import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
  return (
    <Box mt={3} alignItems="center" display="flex" flexDirection="column">
      <Typography variant="h4">Ця сторінка Вам не доступна!</Typography>
      <Typography variant="body1" sx={{ mt: 5 }}>
        Спробуйте зайти з іншими даними або <Link to="/" >поверніться на головну</Link>.
      </ Typography>
    </Box>
  );
};

export default ForbiddenPage;
