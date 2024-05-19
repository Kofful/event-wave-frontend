import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const RefundDialog = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Повернення квитка
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Повернення квитка може зайняти до кількох робочих днів. Ви впевнені, що хочете повернути квиток?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
        <Button onClick={handleClose} color="error" autoFocus>
          Повернути
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RefundDialog;
