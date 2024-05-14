import { Box, Typography } from '@mui/material';
import EventForm from '../CreateEventPage/EventsForm/EventForm';
import { LoadingButton } from '@mui/lab';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';
import { CityContext } from '../../context/CityContext';
import { SnackbarContext } from '../../context/SnackbarContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent, updateEvent } from '../../api/events';
import dayjs from 'dayjs';

const UpdateEventPage = () => {
  const [event, setEvent] = useState({
    event_type_id: 1,
    name: '',
    date: null,
    description: '',
    notes: '',
    image: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [responseError, setResponseError] = useState('');

  const { authorizedUser } = useContext(AuthorizedUserContext);
  const { selectedCity } = useContext(CityContext);
  const { showSnackbar } = useContext(SnackbarContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await getEvent(id);
        const { event_type, name, date, description, notes,  } = response.data;
        setEvent({
          event_type_id: event_type.id,
          name,
          date: dayjs(date),
          description,
          notes,
        });
      } catch (e) {
        navigate('/not-found');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [id, setEvent, navigate]);

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
    };

    try {
      setIsSubmitLoading(true);
      setResponseError('');
      const response = await updateEvent(id, requestData, authorizedUser.token);
      navigate(`/events/${response.data.id}`);
    } catch (e) {
      updateResponseError(e.response);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <Box mt={3} alignItems="center" display="flex" flexDirection="column">
      {isLoading ?
        "Завантаження..."
        : (
          <>
            <Typography variant="h4">Змінити інформацію про подію</Typography>
            <EventForm event={event} setEvent={setEvent} />
            <LoadingButton
              loading={isSubmitLoading}
              component="button"
              onClick={handleSubmit}
              size="large"
            >
              Змінити
            </LoadingButton>
            <Typography
              variant="body2"
              component="div"
              color="error"
            >
              {responseError}
            </Typography>
          </>
        )
      }
    </Box>
  );
};

export default UpdateEventPage;
