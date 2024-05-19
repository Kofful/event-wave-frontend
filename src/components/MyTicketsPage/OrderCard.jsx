import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import RefundDialog from './RefundDialog';
import EventLabel from '../Common/Event/EventLabel';

const OrderCard = ({ order, refreshOrders }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const event = order.event;

  return (
    <Card>
      <CardMedia
        sx={{ height: 300 }}
        image={event.image}
      />
      <CardContent>
        <Stack spacing={1}>
          <EventLabel variant="div">
            <Typography
              variant="h5"
              component={Link}
              color="inherit"
              to={`/events/${event.id}`}
              sx={{ fontWeight: 600, textDecoration: 'none' }}
            >
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
          <Box>
            <Chip
              sx={{ fontWeight: 500 }}
              label={`${order.name} - ${order.price} ГРН`}
              variant="outlined"
            />
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: '0 16px 12px' }}>
        <Button
          fullWidth
          size="large"
          color="error"
          onClick={handleClickOpen}
        >
          ПОВЕРНУТИ
        </Button>
      </CardActions>
      <RefundDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        order={order}
        onRefund={refreshOrders}
      />
    </Card>
  );
};

export default OrderCard;
