import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import CitySelect from './CitySelect/CitySelect';
import { Link } from 'react-router-dom';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';
import { useContext } from 'react';

const Header = () => {
  const { authorizedUser } = useContext(AuthorizedUserContext);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white'
            }}
            to="/"
          >
            Event Wave
          </Typography>
          <CitySelect />
          {
            authorizedUser
              ? (
                <Button color="inherit">{authorizedUser.user.first_name}</Button>
              ) :
              (
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                >
                  Увійти
                </Button>
              )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
