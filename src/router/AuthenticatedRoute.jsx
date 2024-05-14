import { useContext } from 'react';
import { AuthorizedUserContext } from '../context/AuthorizedUserContext';
import { Navigate } from 'react-router-dom';
import { SnackbarContext } from '../context/SnackbarContext';
import ForbiddenPage from '../components/Errors/ForbiddenPage';

const AuthenticatedRoute = ({ allowedRoles, children }) => {
  const { authorizedUser } = useContext(AuthorizedUserContext);
  const { showSnackbar } = useContext(SnackbarContext);

  if (!authorizedUser || !authorizedUser.token || !authorizedUser.user?.role) {
    showSnackbar('Ви не авторизовані. Увійдіть, будь ласка, в акаунт.');
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(authorizedUser.user.role)) {
    return <ForbiddenPage />;
  }

  return <>{children}</>
};

export default AuthenticatedRoute;
