import { Box, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Box>
      <Typography variant="h2">Упс, сталась помилка!</Typography>
      <Typography variant="h5">{error.statusText || error.message}</ Typography>
    </Box>
  );
};

export default ErrorPage;
