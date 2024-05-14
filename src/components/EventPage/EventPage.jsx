import { Link, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const EventPage = () => {
  const { id } = useParams();

  return (
    <>
      <Typography variant="h4">Event ID: {id}</Typography>
      <Link to={`/events/${id}/update`} >Update</Link>
    </>
  );
};

export default EventPage;
