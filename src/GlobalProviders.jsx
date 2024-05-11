import { CityContextProvider } from './context/CityContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthorizedUserContextProvider } from './context/AuthorizedUserContext';
import { SnackbarContextProvider } from './context/SnackbarContext';

const GlobalProviders = ({ children }) => (
  <LocalizationProvider
    dateAdapter={AdapterDayjs}
    adapterLocale="uk"
  >
    <AuthorizedUserContextProvider>
      <CityContextProvider>
        <SnackbarContextProvider>
          {children}
        </SnackbarContextProvider>
      </CityContextProvider>
    </AuthorizedUserContextProvider>
  </LocalizationProvider>
);

export default GlobalProviders;
