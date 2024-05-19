import Grid from '@mui/material/Unstable_Grid2';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TicketInfo = ({ ticket, event }) => {
  const navigate = useNavigate();

  const onButtonClick = async () => {
    navigate(`/events/${event.id}/purchase/${ticket.id}`, {
      state: {
        event: event,
        ticket: ticket,
      },
    });
  };

  return (
    <>
      <Grid key={`${ticket.id}_name`} xs={6}>
        <Typography component="span" variant="subtitle1">
          {`${ticket.name} (${ticket.quantity})`}
        </Typography>
      </Grid>
      <Grid key={`${ticket.id}_button`} xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onButtonClick} variant="outlined" size="small" sx={{ width: '100px' }}>
          {ticket.price} ГРН
        </Button>
      </Grid>
    </>
  );
};

export default TicketInfo;
