import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Unstable_Grid2 as Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { eventTypes } from '../../../constants/eventTypes';
import { EventFiltersContext } from '../../../context/EventFiltersContext';

//TODO
// - add localization for dates
// - add validation for dates
const EventFilters = () => {
  const [eventType, setEventType] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null)

  const { setEventFilters } = useContext(EventFiltersContext);

  const resetFilters = useCallback(() => {
    setEventType(0);
    setSearchInput('');
    setQuery('');
    setDateFrom(null);
    setDateTo(null);
  }, []);

  const eventTypeItems = useMemo(() => (
    eventTypes.map(eventType => {
      return (
        <MenuItem key={eventType.id} value={eventType.id}>{eventType.name}</MenuItem>
      )
    })
  ), []);

  useEffect(() => {
    setEventFilters({
      eventType: eventType ? eventType : null,
      query: query ? query : null,
      dateFrom: dateFrom ? dateFrom.format('YYYY-MM-DD') : null,
      dateTo: dateTo ? dateTo.format('YYYY-MM-DD') : null,
    });
  }, [eventType, query, dateFrom, dateTo, setEventFilters]);

  return (
    <Grid
      spacing={2}
      sx={{ padding: '12px' }}
      container
    >
      <Grid xs={4}>
        <FormControl fullWidth>
          <InputLabel id="event-type-select-label">Категорія</InputLabel>
          <Select
            labelId="event-type-select-label"
            id="event-type-select"
            value={eventType}
            label="Категорія"
            onChange={e => setEventType(e.target.value)}
          >
            <MenuItem value={0}>Будь-яка</MenuItem>
            {eventTypeItems}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={4}>
        <DatePicker
          label="Дата з"
          value={dateFrom}
          onChange={setDateFrom}
          slotProps={{
            field: {
              fullWidth: true,
              clearable: true,
              onClear: () => setDateFrom(null),
            }
          }}
        />
      </Grid>
      <Grid xs={4}>
        <DatePicker
          label="Дата по"
          value={dateTo}
          onChange={setDateTo}
          slotProps={{
            field: {
              fullWidth: true,
              clearable: true,
              onClear: () => setDateTo(null),
            }
          }}
        />
      </Grid>
      <Grid xs={5}>
        <FormControl fullWidth>
          <TextField
            id="search-input"
            label="Назва"
            variant="outlined"
            fullWidth
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onBlur={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.target.blur();
              }
            }}
          />
        </FormControl>
      </Grid>
      <Grid xs={2}>
        <Button onClick={resetFilters}>Очистити фільтри</Button>
      </Grid>
    </Grid>
  );
};

export default EventFilters;
