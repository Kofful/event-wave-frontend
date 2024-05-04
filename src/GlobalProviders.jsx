import { CityContextProvider } from './context/CityContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthorizedUserContextProvider } from './context/AuthorizedUserContext';

const GlobalProviders = ({ children }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AuthorizedUserContextProvider>
      <CityContextProvider>
        {children}
      </CityContextProvider>
    </AuthorizedUserContextProvider>
  </LocalizationProvider>
);

export default GlobalProviders;
