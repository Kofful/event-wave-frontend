import { useCallback, useContext, useMemo } from 'react';
import { eventTypes } from '../../../constants/eventTypes';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Unstable_Grid2 as Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { SnackbarContext } from '../../../context/SnackbarContext';

const EventForm = ({
  event,
  setEvent,
}) => {
  const { showSnackbar } = useContext(SnackbarContext);

  const eventTypeItems = useMemo(() => (
    eventTypes.map(eventType => {
      return (
        <MenuItem key={eventType.id} value={eventType.id}>{eventType.name}</MenuItem>
      )
    })
  ), []);

  const updateEvent = useCallback((fieldName, value) => {
    setEvent(
      (prevState) => ({
        ...prevState,
        [fieldName]: value,
      })
    );
  }, [setEvent]);

  const handleFileLoaded = useCallback((e) => {
    if (e.target.files[0]?.size > 1024 * 1024 * 16) {
      showSnackbar('Не вдалось завантажити файл.');
    } else {
      updateEvent('image', e.target.files[0]);
    }

  }, [showSnackbar, updateEvent]);

  return (
    <Grid
      spacing={2}
      sx={{ padding: '12px', width: '100%' }}
      container
    >
      <Grid xs={4}>
        <FormControl fullWidth>
          <InputLabel id="event-type-select-label">Категорія</InputLabel>
          <Select
            labelId="event-type-select-label"
            id="event-type-select"
            value={event.event_type_id}
            label="Категорія"
            onChange={e => updateEvent('event_type_id', e.target.value)}
          >
            {eventTypeItems}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={4}>
        <FormControl fullWidth>
          <TextField
            id="name-input"
            label="Назва"
            fullWidth
            value={event.name}
            onChange={e => updateEvent('name', e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid xs={4}>
        <DateTimePicker
          label="Дата"
          value={event.date}
          onChange={(value) => updateEvent('date', value)}
          slotProps={{
            field: {
              fullWidth: true,
              clearable: true,
              onClear: () => updateEvent('date', null),
            }
          }}
        />
      </Grid>
      <Grid xs={12}>
        <FormControl fullWidth>
          <TextField
            id="description-input"
            label="Опис"
            fullWidth
            multiline
            rows={6}
            value={event.description}
            onChange={e => updateEvent('description', e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl fullWidth>
          <TextField
            id="notes-input"
            label="Примітки"
            fullWidth
            multiline
            rows={2}
            value={event.notes}
            onChange={e => updateEvent('notes', e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid xs={4} xsOffset={4}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon/>}
          fullWidth
        >
          {event.image ? event.image.name : 'Завантажити файл'}
          <input onChange={handleFileLoaded} name="image" type="file" accept="image/*" hidden />
        </Button>
      </Grid>
    </Grid>
  );
};

export default EventForm;
