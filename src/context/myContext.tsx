import { ReactNode, createContext, useState, useMemo } from 'react';

export const MyContext = createContext({});
export const MyContextApi = createContext({});

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [sliceName, setSliceName] = useState<string>();
  const [sliceDescription, setSliceDescription] = useState<string>('');

  const [selectedRadio, setSelectedRadio] = useState('nothing');
  const [bandwidthWithPerSlice, setBandwidthWithPerSlice] = useState('300');
  const [numberOfDevicesWithPerSlice, setNumberOfDevicesWithPerSlice] = useState('1250');
  const [bandwidthWithPerDevice, setBandwidthWithPerDevice] = useState('1000');
  const [numberOfDevicesWithPerDevice, setNumberOfDevicesWithPerDevice] = useState('300');
  const [bandwidthWithDensity, setBandwidthWithDensity] = useState('best_effort');
  const [numberOfDevicesWithDensity, setNumberOfDevicesWithDensity] = useState('100500');

  const [selectedCore, setSelectedCore] = useState('nothing');

  const [selectedTrafficWithOperator, setSelectedTrafficWithOperator] = useState('public');
  const [selectedFallbackWithOperator, setSelectedFallbackWithOperator] = useState('null');

  const [selectedDataCenterWithLocal, setSelectedDataCenterWithLocal] = useState('nearest')
  const [selectedTrafficWithLocal, setSelectedTrafficWithLocal] = useState('public');
  const [selectedFallbackWithLocal, setSelectedFallbackWithLocal] = useState('null');

  const [selectedTransferCore, setSelectedTransferCore] = useState('operator');
  const [selectedFallbackWithTransfer, setSelectedFallbackWithTransfer] = useState('null');

  const [geographyType, setGeographyType] = useState('point');
  const [country, setCountry] = useState('Serbia')
  const [shapesGeography, setShapesGeography] = useState<any[]>([]);

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [checkedEndDate, setCheckedEndDate] = useState(false)
  const [selectedBilling, setSelectedBilling] = useState('daily')

  const [selectedImsi, setSelectedImsi] = useState('operator')

  return (
    <MyContextApi.Provider value={useMemo(() => {
      return {
        setShapesGeography
      }
    }, [])}>
      <MyContext.Provider value={{
        sliceName, setSliceName,
        sliceDescription, setSliceDescription,
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
        country, setCountry,
        shapesGeography, setShapesGeography,
        selectedImsi, setSelectedImsi,
        startDate, setStartDate,
        endDate, setEndDate,
        checkedEndDate, setCheckedEndDate,
        selectedBilling, setSelectedBilling,
      }}>
        {children}
      </MyContext.Provider>
    </MyContextApi.Provider>
  );
};

// export let shapesGeography = []