import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { LoadingButton } from '@mui/lab';
import { createOrder } from '../../api/orders';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';

const PurchaseTicketPage = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signature, setSignature] = useState('');
  const [paymentData, setPaymentData] = useState('');

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { authorizedUser } = useContext(AuthorizedUserContext);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { event, ticket } = location.state ?? {};

  const eventDate = useMemo(() => (dayjs(event?.date).format('DD.MM.YYYY HH:mm')), [event?.date])

  useEffect(() => {
    if (!event || !ticket) {
      navigate(`/events/${id}`);
    }
  }, [navigate, event, ticket, id]);

  useEffect(() => {
    if (isSubmitted) {
      formRef.current.submit();
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (authorizedUser) {
      setEmail(authorizedUser.user.email);
      setFirstName(authorizedUser.user.first_name);
      setLastName(authorizedUser.user.last_name);
    }
  }, [authorizedUser]);

  const updateResponseError = useCallback((response) => {
    if (response?.status === 422 && response?.data?.errors) {
      const responseErrors = Object.values(response?.data?.errors);
      setResponseError(responseErrors[0]);
    } else {
      setResponseError('Щось пішло не так.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const requestData = {
      ticket_id: ticket.id,
      email: data.get('email'),
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
    };

    try {
      setIsLoading(true);
      setResponseError('');

      const response = await createOrder(requestData);

      setPaymentData(response.data.data);
      setSignature(response.data.signature);
      setIsSubmitted(true);
    } catch (err) {
      updateResponseError(err.response);
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
        <Typography component="h4" variant="h4">
          Придбати квиток
        </Typography>
        <Typography variant="body1">
          {`${event?.name} ${eventDate} - ${ticket?.name}`}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Ім'я"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Прізвище"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Ел. Пошта"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            Придбати
          </LoadingButton>
          <Typography
            variant="body2"
            component="div"
            ml={1}
            color="error"
          >
            {responseError}
          </Typography>
        </Box>
        <Box
          hidden
          component="form"
          key={`${ticket.id}_button`}
          ref={formRef}
          action="https://www.liqpay.ua/api/3/checkout"
        >
          <input type="hidden" name="data" value={paymentData}/>
          <input type="hidden" name="signature" value={signature}/>
        </Box>
      </Box>
    </Container>
  )
};

export default PurchaseTicketPage;
