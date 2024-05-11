import { Box } from '@mui/material';

const NoRowsOverlay = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignContent="center"
    flexWrap="wrap"
    sx={{ height: '100%' }}
  >
    Немає квитків
  </Box>
);

export default NoRowsOverlay;
