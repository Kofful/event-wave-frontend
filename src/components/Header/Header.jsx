import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import CitySelect from './CitySelect/CitySelect';
import { Link } from 'react-router-dom';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';
import { useCallback, useContext, useState } from 'react';
import { getInitials } from '../../util/string';
import { USER_ROLES } from '../../constants/userRoles';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { authorizedUser, setAuthorizedUser } = useContext(AuthorizedUserContext);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleLogout = useCallback(() => {
    setAuthorizedUser(null);
    handleCloseUserMenu();
  }, [handleCloseUserMenu, setAuthorizedUser]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
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
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>{getInitials(authorizedUser.user.first_name, authorizedUser.user.last_name)}</Avatar>
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Акаунт</Typography>
                    </MenuItem>
                    {
                      authorizedUser.user.role === USER_ROLES.MANAGER && (
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography
                            component={Link}
                            textAlign="center"
                            to="/events/create"
                            color="inherit"
                            sx={{ textDecoration: 'none' }}
                          >
                            Створити подію
                          </Typography>
                        </MenuItem>
                      )
                    }
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Вийти</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
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
