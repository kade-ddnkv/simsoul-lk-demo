import { createContext, useState } from 'react';

export const MyContext = createContext({});

export const MyContextProvider = ({ children }) => {
  const [lilo, setLilo] = useState('lilo');

  return (
    <MyContext.Provider value={{ lilo, setLilo }}>
      {children}
    </MyContext.Provider>
  );
};