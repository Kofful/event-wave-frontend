import { createContext, useState } from 'react';

export const CityContext = createContext({
  selectedCity: 1,
  setSelectedCity: Function,
});

export const CityContextProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(1);

  return (
    <CityContext.Provider value={{selectedCity, setSelectedCity}}>
      {children}
    </CityContext.Provider>
  )
};
