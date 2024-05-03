import EventFilters from './EventFilters/EventFilters';
import { EventFiltersContextProvider } from '../../context/EventFiltersContext';
import EventList from './EventList/EventList';

const HomePage = () => {
  return (
    <EventFiltersContextProvider>
      <EventFilters />
      <EventList />
    </EventFiltersContextProvider>
  );
};

export default HomePage;
