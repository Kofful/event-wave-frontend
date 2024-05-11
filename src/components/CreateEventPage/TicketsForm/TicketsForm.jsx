import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import TicketsToolbar from './TicketsToolbar';
import NoRowsOverlay from './NoRowsOverlay';
import { useCallback, useMemo, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const TicketsForm = ({ tickets, setTickets }) => {
  const [rowModesModel, setRowModesModel] = useState({});

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setTickets(tickets.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleSaveClick = useCallback((id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  }, [rowModesModel, setRowModesModel]);

  const handleDeleteClick = useCallback((id) => () => {
    setTickets(tickets.filter((row) => row.id !== id));
  }, [tickets, setTickets]);

  const getActions = useCallback(({ id }) => {
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    if (isInEditMode) {
      return [
        <GridActionsCellItem
          icon={<SaveIcon/>}
          label="Save"
          sx={{
            color: 'primary.main',
          }}
          onClick={handleSaveClick(id)}
        />
      ];
    }
    return [
      <GridActionsCellItem
        icon={<DeleteIcon/>}
        label="Видалити"
        onClick={handleDeleteClick(id)}
        color="inherit"
      />,
    ];
  }, [handleDeleteClick, handleSaveClick, rowModesModel]);

  const columns = useMemo(() => ([
    {
      field: 'name',
      headerName: 'Назва',
      flex: 4,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Ціна, грн',
      type: 'number',
      flex: 2,
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'quantity',
      headerName: 'Кількість',
      type: 'number',
      flex: 2,
      editable: true,
      headerAlign: 'left',
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      cellClassName: 'actions',
      editable: false,
      getActions,
    },
  ]), [getActions]);

  return (
    <DataGrid
      sx={{ my: 2, width: '100%', maxWidth: '1024px' }}
      rows={tickets}
      columns={columns}
      disableColumnMenu
      hideFooter
      autoHeight
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={setRowModesModel}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: TicketsToolbar,
        noRowsOverlay: NoRowsOverlay,
      }}
      slotProps={{
        toolbar: {
          tickets,
          setTickets,
          setRowModesModel,
        },
      }}
    />
  )
};

export default TicketsForm;
