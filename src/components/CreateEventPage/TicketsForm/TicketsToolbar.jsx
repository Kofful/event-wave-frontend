import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { randomId } from '@mui/x-data-grid-generator';
import AddIcon from '@mui/icons-material/Add';
import { useMemo } from 'react';

const TicketsToolbar = ({ tickets, setTickets, setRowModesModel }) => {
  const handleClick = () => {
    const id = randomId();
    setTickets((oldTickets) => [
      ...oldTickets,
      {
        id,
        name: '',
        price: '',
        quantity: '',
        isNew: true,
      }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: {
        mode: GridRowModes.Edit,
        fieldToFocus: 'name',
      },
    }));
  };

  const isAddButtonDisabled = useMemo(() => {
    return tickets.length >= 10;
  }, [tickets]);

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} disabled={isAddButtonDisabled}>
        Додати
      </Button>
    </GridToolbarContainer>
  );
};

export default TicketsToolbar;
