import { MenuItem, Select } from '@mui/material';
import { useCallback, useContext, useMemo } from 'react';
import StyledFormControl from './StyledFormControl';
import { cities } from '../../../constants/cities';
import { CityContext } from '../../../context/CityContext';

const CitySelect = () => {
  const { selectedCity, setSelectedCity } = useContext(CityContext);

  const onCitySelect = useCallback((event) => {
    setSelectedCity(event.target.value);
  }, [setSelectedCity]);

  const menuItems = useMemo(() => (
    cities.map(city => {
      return (
        <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
      )
    })
  ), []);

  return (
    <StyledFormControl>
      <Select
        id="city-select"
        displayEmpty
        inputProps={{ 'aria-label': 'Місто' }}
        value={selectedCity}
        onChange={onCitySelect}
      >
        {menuItems}
      </Select>
    </StyledFormControl>
  );
};

export default CitySelect;
