import { createContext, useState } from 'react';

export const MyContext = createContext({});

export const MyContextProvider = ({ children }) => {
  const [sliceName, setSliceName] = useState<string>();
  
  const [selectedRadio, setSelectedRadio] = useState('nothing');
  const [bandwidthWithPerSlice, setBandwidthWithPerSlice] = useState('300');
  const [numberOfDevicesWithPerSlice, setNumberOfDevicesWithPerSlice] = useState('1250');
  const [bandwidthWithPerDevice, setBandwidthWithPerDevice] = useState('1000');
  const [numberOfDevicesWithPerDevice, setNumberOfDevicesWithPerDevice] = useState('300');
  const [bandwidthWithDensity, setBandwidthWithDensity] = useState('100500');
  const [numberOfDevicesWithDensity, setNumberOfDevicesWithDensity] = useState('!!default_value!!');
  
  const [selectedCore, setSelectedCore] = useState('nothing');
  
  const [selectedTrafficWithOperator, setSelectedTrafficWithOperator] = useState('public');
  const [selectedFallbackWithOperator, setSelectedFallbackWithOperator] = useState('null');
  
  const [ selectedDataCenterWithLocal, setSelectedDataCenterWithLocal ] = useState('nearest')
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
      bandwidthWithPerSlice, setBandwidthWithPerSlice,
      numberOfDevicesWithPerSlice, setNumberOfDevicesWithPerSlice,
      bandwidthWithPerDevice, setBandwidthWithPerDevice,
      numberOfDevicesWithPerDevice, setNumberOfDevicesWithPerDevice,
      bandwidthWithDensity, setBandwidthWithDensity,
      numberOfDevicesWithDensity, setNumberOfDevicesWithDensity,
      selectedCore, setSelectedCore,
      selectedTransferCore, setSelectedTransferCore,
      selectedTrafficWithOperator, setSelectedTrafficWithOperator,
      selectedFallbackWithOperator, setSelectedFallbackWithOperator,
      selectedDataCenterWithLocal, setSelectedDataCenterWithLocal,
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