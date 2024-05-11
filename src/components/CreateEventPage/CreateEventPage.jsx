import {
  Box,
  Typography,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';
import EventForm from './EventsForm/EventForm';
import { CityContext } from '../../context/CityContext';
import TicketsForm from './TicketsForm/TicketsForm';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { SnackbarContext } from '../../context/SnackbarContext';
import { createEvent } from '../../api/events';

//TODO
// - add min date to select
// - add front-end validation
const CreateEventPage = () => {
  const [event, setEvent] = useState({
    event_type_id: 1,
    name: '',
    date: null,
    description: '',
    notes: '',
    image: null,
  });
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState('');

  const { authorizedUser } = useContext(AuthorizedUserContext);
  const { selectedCity } = useContext(CityContext);
  const { showSnackbar } = useContext(SnackbarContext);

  const navigate = useNavigate();

  const updateResponseError = useCallback((response) => {
    if (response?.status === 401) {
      showSnackbar('Ви не авторизовані. Увійдіть, будь ласка, в акаунт.');
      navigate('/login');
    } else if(response?.status === 403) {
      navigate('/forbidden');
    } else if (response?.status === 422 && response?.data?.errors) {
      const responseErrors = Object.values(response?.data?.errors);
      const firstFieldErrors = responseErrors[0];
      setResponseError(firstFieldErrors[0]);
    } else {
      setResponseError('Щось пішло не так.');
    }
  }, [showSnackbar, navigate]);

  const handleSubmit = async () => {
    const requestData = {
      city_id: selectedCity,
      ...event,
      date: event.date ? event.date.format('YYYY-MM-DD HH:mm') : null,
      tickets: tickets.map(({ name, price, quantity }) => ({
        name,
        price,
        quantity,
      })),
    };

    try {
      setIsLoading(true);
      setResponseError('');
      const response = await createEvent(requestData, authorizedUser.token);
      navigate(`/events/${response.data.id}`);
    } catch (e) {
      updateResponseError(e.response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box mt={3} alignItems="center" display="flex" flexDirection="column">
      <Typography variant="h4">Створити подію</Typography>
      <EventForm event={event} setEvent={setEvent} />
      <Typography variant="h4">Квитки</Typography>
      <TicketsForm tickets={tickets} setTickets={setTickets}/>
      <LoadingButton
        loading={isLoading}
        component="button"
        onClick={handleSubmit}
        size="large"
      >
        Створити
      </LoadingButton>
      <Typography
        variant="body2"
        component="div"
        color="error"
      >
        {responseError}
      </Typography>
    </Box>
  )
};

export default CreateEventPage;
