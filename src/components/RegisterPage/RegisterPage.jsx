import {
  Box,
  Checkbox,
  Container,
  CssBaseline, FormControlLabel,
  Link,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { register } from '../../api/auth';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';
import { Alert, LoadingButton } from '@mui/lab';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigate = useNavigate();

  const { setAuthorizedUser } = useContext(AuthorizedUserContext);
  // TODO add validation before sending request

  const updateResponseError = useCallback((response) => {
    if (response?.status === 422 && response?.data?.errors) {
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
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      role: data.get('isManager') ? 'MANAGER' : 'VISITOR',
    };

    try {
      setIsLoading(true);
      setResponseError('');
      setIsAlertVisible(false);
      setAuthorizedUser(null);
      const response = await register(requestData);
      if (response.data.user) {
        setAuthorizedUser(response.data);
        navigate('/');
      } else {
        setIsAlertVisible(true);
      }
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
          Зареєструвати новий акаунт
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Ім'я"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Прізвище"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Ел. Пошта"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="isManager" color="primary" />}
                label="Я менеджер. (Ми зв'яжемось з Вами для підтвердження)"
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Зареєструватися
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
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Вже є акаунт? Увійти
              </Link>
            </Grid>
          </Grid>
          {isAlertVisible && (
            <Alert sx={{ mt: 2 }} severity="info">Ми отримали вашу заявку. Очікуйте на підтвердження.</Alert>
          )}
        </Box>
      </Box>
    </Container>
  )
};

export default RegisterPage;
