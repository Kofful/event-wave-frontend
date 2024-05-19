import {
  Box,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import { login } from '../../api/auth';
import { useCallback, useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState('');
  const navigate = useNavigate();

  const { setAuthorizedUser } = useContext(AuthorizedUserContext);
  // TODO add validation before sending request

  const updateResponseError = useCallback((response) => {
    if (response?.status === 401 || response?.status === 403) {
      setResponseError(response?.data?.message);
    } else if (response?.status === 422 && response?.data?.errors) {
      const responseErrors = Object.values(response?.data?.errors);
      setResponseError(responseErrors[0]);
    } else {
      setResponseError('Щось пішло не так.');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      setIsLoading(true);
      setResponseError('');
      setAuthorizedUser(null);
      const response = await login(requestData);
      setAuthorizedUser(response.data);
      navigate('/');
    } catch (e) {
      updateResponseError(e.response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Увійти в акаунт
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Ел. пошта"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Увійти
          </LoadingButton>
          <Typography
            variant="body2"
            component="div"
            ml={1}
            color="error"
          >
            {responseError}
          </Typography>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link component={RouterLink} to="/register" variant="body2">
                Немає акаунту? Зареєструватися
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
};

export default LoginPage;
