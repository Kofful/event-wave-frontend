import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import EventLabel from '../../Common/Event/EventLabel';

const EventCard = ({ event }) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 300 }}
        image={event.image}
      />
      <CardContent>
        <Stack spacing={1}>
          <EventLabel variant="div">
            <Typography sx={{ fontWeight: 600 }} variant="h5" component="div">
              {event.name}
            </Typography>
          </EventLabel>
          <Box>
            <Chip
              sx={{ fontWeight: 500 }}
              label={dayjs(event.date).format('D MMMM YYYY HH:mm')}
              variant="outlined"
            />
          </Box>
          <Box>
            <Chip
              sx={{ fontWeight: 500 }}
              label={event.event_type.name}
            />
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: '0 16px 12px' }}>
        <Button
          fullWidth
          component={Link}
          to={`/events/${event.id}`}
          size="large"
        >
          ВІД {event.tickets_min_price ?? 999} ГРН
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
