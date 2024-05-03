import { CityContextProvider } from './context/CityContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const GlobalProviders = ({ children }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <CityContextProvider>
      {children}
    </CityContextProvider>
  </LocalizationProvider>
);

export default GlobalProviders;
