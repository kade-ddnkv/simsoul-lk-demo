import { createContext, useState } from 'react';

export const MyContext = createContext({});

export const MyContextProvider = ({ children }) => {
  const [sliceName, setSliceName] = useState<string>();
  
  const [selectedRadio, setSelectedRadio] = useState('nothing');
  
  const [selectedCore, setSelectedCore] = useState('nothing');
  
  const [selectedTrafficWithOperator, setSelectedTrafficWithOperator] = useState('public');
  const [selectedFallbackWithOperator, setSelectedFallbackWithOperator] = useState('null');
  
  const [selectedTrafficWithLocal, setSelectedTrafficWithLocal] = useState('public');
  const [selectedFallbackWithLocal, setSelectedFallbackWithLocal] = useState('null');
  
  const [selectedTransferCore, setSelectedTransferCore] = useState('operator');
  const [selectedFallbackWithTransfer, setSelectedFallbackWithTransfer] = useState('null');
  
  const [geographyType, setGeographyType] = useState('point');

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [checkedEndDate, setCheckedEndDate] = useState(false)
  const [selectedBilling, setSelectedBilling] = useState('daily')

  const [selectedImsi, setSelectedImsi] = useState('operator');

  return (
    <MyContext.Provider value={{
      sliceName, setSliceName,
      selectedRadio, setSelectedRadio,
      selectedCore, setSelectedCore,
      selectedTransferCore, setSelectedTransferCore,
      selectedTrafficWithOperator, setSelectedTrafficWithOperator,
      selectedFallbackWithOperator, setSelectedFallbackWithOperator,
      selectedTrafficWithLocal, setSelectedTrafficWithLocal,
      selectedFallbackWithLocal, setSelectedFallbackWithLocal,
      selectedFallbackWithTransfer, setSelectedFallbackWithTransfer,
      geographyType, setGeographyType,
      selectedImsi, setSelectedImsi,
      startDate, setStartDate,
      endDate, setEndDate,
      checkedEndDate, setCheckedEndDate,
      selectedBilling, setSelectedBilling,
    }}>
      {children}
    </MyContext.Provider>
  );
};