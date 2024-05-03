import { useContext, useEffect, useMemo, useState } from 'react';
import { CityContext } from '../../../context/CityContext';
import { getEvents } from '../../../api/events';
import { EventFiltersContext } from '../../../context/EventFiltersContext';
import Grid from '@mui/material/Unstable_Grid2';
import EventCard from './EventCard';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { selectedCity } = useContext(CityContext);
  const { eventFilters } = useContext(EventFiltersContext);

  useEffect(() => {
    const getEventsFromApi = async () => {
      // TODO add request cancellation
      setIsLoading(true);
      setError('');
      try {
        const response = await getEvents({
          city_id: selectedCity,
          event_type_id: eventFilters.eventType,
          query: eventFilters.query,
          date_from: eventFilters.dateFrom,
          date_to: eventFilters.dateTo,
        });

        setEvents(response.data.data);
      } catch {
        setEvents([]);
        setError('Щось пішло не так.')
      } finally {
        setIsLoading(false);
      }
    };

    getEventsFromApi();
  }, [selectedCity, eventFilters.eventType, eventFilters.query, eventFilters.dateFrom, eventFilters.dateTo]);

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

    if (!events.length) {
      return (
        <span>За заданими параметрами подій не знайдено.</span>
      );
    }

    return events.map(event => (
      <Grid xs={4} key={event.id}>
        <EventCard event={event} />
      </Grid>
    ));
  }, [isLoading, events, error]);

  return (
    <Grid container sx={{ minHeight: '600px' }} mb={3} spacing={2}>
      {contents}
    </Grid>
  );
};

export default EventList;
