import { createContext, useState } from 'react';

export const MyContext = createContext({});

export const MyContextProvider = ({ children }) => {
  const [geographyType, setGeographyType] = useState('point');

  return (
    <MyContext.Provider value={{ geographyType, setGeographyType }}>
      {children}
    </MyContext.Provider>
  );
};