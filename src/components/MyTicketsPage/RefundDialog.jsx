import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthorizedUserContext } from '../../context/AuthorizedUserContext';
import { LoadingButton } from '@mui/lab';
import { SnackbarContext } from '../../context/SnackbarContext';
import { makeRefund } from '../../api/orders';
import { useNavigate } from 'react-router-dom';

const RefundDialog = ({ isOpen, setIsOpen, order, onRefund }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { authorizedUser, setAuthorizedUser } = useContext(AuthorizedUserContext);
  const { showSnackbar } = useContext(SnackbarContext);

  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
  };

  const sendRefundRequest = async () => {
    try {
      setIsLoading(true);
      await makeRefund(order.id, authorizedUser.token);
      onRefund();
    } catch (e) {
      if (e.response?.status === 401) {
        setAuthorizedUser(null);
        showSnackbar('Ви не авторизовані. Увійдіть, будь ласка, в акаунт.');
        navigate('/login');
      } else {
        showSnackbar('Виникла помилка під час повернення.');
      }
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
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
        <LoadingButton loading={isLoading} onClick={sendRefundRequest} color="error" autoFocus>
          Повернути
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default RefundDialog;
