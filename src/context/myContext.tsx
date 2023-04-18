import { createContext, useState } from 'react';

export const MyContext = createContext({});

export const MyContextProvider = ({ children }) => {
  const [sliceName, setSliceName] = useState<string>();

  const [geographyType, setGeographyType] = useState('point');

  const [selectedRadio, setSelectedRadio] = useState('nothing');

  const [selectedCore, setSelectedCore] = useState('nothing');
  const [selectedTraffic, setSelectedTraffic] = useState('public');
  const [selectedFallback, setSelectedFallback] = useState('nothing');
  const [selectedTransferCore, setSelectedTransferCore] = useState('operator');

  const [selectedTrafficWithOperator, setSelectedTrafficWithOperator] = useState('public');
  const [selectedFallbackWithOperator, setSelectedFallbackWithOperator] = useState('null');

  const [selectedTrafficWithLocal, setSelectedTrafficWithLocal] = useState('public');
  const [selectedFallbackWithLocal, setSelectedFallbackWithLocal] = useState('null');

  const [selectedFallbackWithTransfer, setSelectedFallbackWithTransfer] = useState('null');

  const [selectedImsi, setSelectedImsi] = useState('operator');

  return (
    <MyContext.Provider value={{
      sliceName, setSliceName,
      geographyType, setGeographyType,
      selectedRadio, setSelectedRadio,
      selectedCore, setSelectedCore,
      selectedTraffic, setSelectedTraffic,
      selectedFallback, setSelectedFallback,
      selectedTransferCore, setSelectedTransferCore,
      selectedTrafficWithOperator, setSelectedTrafficWithOperator,
      selectedFallbackWithOperator, setSelectedFallbackWithOperator,
      selectedTrafficWithLocal, setSelectedTrafficWithLocal,
      selectedFallbackWithLocal, setSelectedFallbackWithLocal,
      selectedFallbackWithTransfer, setSelectedFallbackWithTransfer,
      selectedImsi, setSelectedImsi,
    }}>
      {children}
    </MyContext.Provider>
  );
};