import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';
import { getEvent } from '../../api/events';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import { USER_ROLES } from '../../constants/userRoles';
import TicketInfo from './TicketInfo';

const EventPage = () => {
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { authorizedUser } = useContext(AuthorizedUserContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const isUserManager = useMemo(() => (authorizedUser?.user?.role === USER_ROLES.MANAGER), [authorizedUser]);
  const eventDate = useMemo(() => (dayjs(event.date).format('DD.MM.YYYY HH:mm')), [event.date]);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await getEvent(id);
        setEvent(response.data);
      } catch (e) {
        navigate('/not-found');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [id, setEvent, navigate]);

  return (
    <Box>
      <Paper elevation={3} sx={{ mt: 3 }}>
        <Grid container sx={{ minHeight: '500px' }}>
          <Grid
            md={6}
            sx={{
              backgroundImage: `url(${event.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '500px',
            }}
          />
          <Grid md={6} p={2} alignItems="center" justifyContent={isUserManager ? 'space-between' : 'flex-start'} display="flex" flexDirection="column">
            {isLoading ?
              "Завантаження..."
              : (
                <>
                  <Typography variant="h4">{event.name}</Typography>
                  <Box display="block" sx={{ width: '100%', height: '100%' }}>
                    <Typography variant="subtitle1">
                      <Typography component="span" fontWeight="fontWeightMedium" variant="subtitle1">Тип події: </Typography>
                      {event.event_type.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      <Typography component="span" fontWeight="fontWeightMedium" variant="subtitle1">Місто: </Typography>
                      {event.city.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      <Typography component="span" fontWeight="fontWeightMedium" variant="subtitle1">Дата: </Typography>
                      {eventDate}
                    </Typography>
                    <Typography mt={1} fontWeight="fontWeightMedium" variant="subtitle1">Квитки: </Typography>
                    <Grid container columns={12} rowGap={1}>
                      {event.tickets.map((ticket) => (
                        <TicketInfo key={ticket.id} ticket={ticket} event={event} />
                      ))}
                    </Grid>
                  </Box>
                  {isUserManager && <Button component={Link} to={`/events/${id}/update`}>Змінити</Button>}
                </>
              )
            }
          </Grid>
        </Grid>
      </Paper>
      {!isLoading &&
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography mt={1} fontWeight="fontWeightMedium" variant="subtitle1">Опис: </Typography>
          {event.description.split("\r\n").map((row, index) => (<Typography key={index} variant="body1" >{row}</Typography>))}
          <Typography mt={1} fontWeight="fontWeightMedium" variant="subtitle1">Примітки: </Typography>
          {event.notes.split("\r\n").map((row, index) => (<Typography key={index} variant="body1" >{row}</Typography>))}
        </Paper>
      }
    </Box>
  );
};

export default EventPage;
