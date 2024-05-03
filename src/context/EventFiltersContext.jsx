import { createContext, useState } from 'react';

const defaultFilters = {
  eventType: null,
  query: null,
  dateFrom: null,
  dateTo: null,
};

export const EventFiltersContext = createContext({
  eventFilters: defaultFilters,
  setEventFilters: Function,
});

export const EventFiltersContextProvider = ({ children }) => {
  const [eventFilters, setEventFilters] = useState(defaultFilters);

  return (
    <EventFiltersContext.Provider
      value={{
        eventFilters,
        setEventFilters,
      }}
    >
      {children}
    </EventFiltersContext.Provider>
  );
};
