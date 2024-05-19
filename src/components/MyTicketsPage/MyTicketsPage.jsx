import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { getUserOrders } from '../../api/orders';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';
import { useNavigate } from 'react-router-dom';
import { SnackbarContext } from '../../context/SnackbarContext';
import OrderCard from './OrderCard';
import { Box, Typography } from '@mui/material';

const MyTicketsPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { authorizedUser, setAuthorizedUser } = useContext(AuthorizedUserContext);
  const { showSnackbar } = useContext(SnackbarContext);

  const navigate = useNavigate();

  const getOrdersFromApi = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getUserOrders(authorizedUser.token);

      setOrders(response.data.data);
    } catch (e) {
      if (e.response?.status === 401) {
        setAuthorizedUser(null);
        showSnackbar('Ви не авторизовані. Увійдіть, будь ласка, в акаунт.');
        navigate('/login');
      }
      setOrders([]);
      setError('Щось пішло не так.')
    } finally {
      setIsLoading(false);
    }
  }, [authorizedUser, setAuthorizedUser, navigate, showSnackbar]);

  useEffect(() => {
    getOrdersFromApi();
  }, [getOrdersFromApi]);

  const contents = useMemo(() => {
    if (isLoading) {
      return (
        <span>Завантаження...</span>
      )
    }

    if (error) {
      return (
        <span>{error}</span>
      );
    }

    if (!orders.length) {
      return (
        <span>Ще не придбано жодного квитка. Після того, як Ви їх придбаєте, вони з'являться тут.</span>
      );
    }

    return orders.map(order => (
      <Grid xs={4} key={order.id}>
        <OrderCard order={order} refreshOrders={getOrdersFromApi} />
      </Grid>
    ));
  }, [getOrdersFromApi, isLoading, orders, error]);

  return (
    <Box
      mt={3}
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      <Typography mb={2} component="h4" variant="h4">
        Придбані квитки
      </Typography>
      <Grid container sx={{ minHeight: '600px', width: '100%' }} spacing={2}>
        {contents}
      </Grid>
    </Box>
  );
};

export default MyTicketsPage;
