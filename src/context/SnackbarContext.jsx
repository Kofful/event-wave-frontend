import { createContext, useCallback, useMemo, useState } from 'react';
import { IconButton, Slide, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/lab';

export const SnackbarContext = createContext({
  showSnackbar: Function,
});

export const SnackbarContextProvider = ({ children }) => {
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClose = useCallback(() => {
    setIsSnackbarShown(false);
    setSnackbarMessage('');
  }, []);

  const showSnackbar = useCallback((message) => {
    setIsSnackbarShown(true);
    setSnackbarMessage(message);
  }, []);

  const closeButton = useMemo(() => (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  ), [handleClose]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isSnackbarShown}
        onClose={handleClose}
        action={closeButton}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
};
