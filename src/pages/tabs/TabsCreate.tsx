import React, { useState, useContext } from 'react';
import { Button, Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled, Stack } from '@mui/material';
import { Radio, RadioGroup, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { useMediaQuery, useTheme } from '@mui/material';
import { alpha } from "@mui/material";
import { useRouter } from 'next/router';
import GeographyTab from '@/pages/tabs/GeographyTab';
import { HeaderText, StyledButton, StyledTextField } from '../../components/generalComponents';
import { TabPanel } from '../../components/TabPanel';
import RadioSliceTab from '@/pages/tabs/RadioSliceTab';
import CoreSliceTab from '@/pages/tabs/CoreSliceTab';
import ConfigurationTab from '@/pages/tabs/ConfigurationTab';
import { TabContext, TabList } from '@mui/lab';
import TimeAndBillingTab from './TimeAndBillingTab';
import SummaryTab from './SummaryTab';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { MyContext } from '@/context/myContext';
import { useAuth } from '@/auth/authUserContext';
import GeneralTab from './GeneralTab';
import { exportShape } from '@/pages/tabs/GeographyTab';

const StyledTab = styled(Tab)({
  ml: 4,
  minWidth: '180px',
  "&.Mui-selected": {
    color: "black",
    backgroundColor: "#f2f2f2"
  },
  "&.Mui-disabled": {
    fontWeight: "bold",
    color: "black",
  }
})

// function a11yProps(index: number) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

const BackButton = (props) => (
  <Button onClick={props.onClick} variant='outlined' sx={{
    // width: '100%',
    px: 4,
    borderColor: 'black',
    borderRadius: 0,
    color: 'black',
    ':hover': {
      backgroundColor: '#f0f0f0',
      borderColor: 'black',
    }
  }}>{props.children}</Button>
)

const ProceedButton = (props) => (
  <Button onClick={props.onClick} variant='outlined' sx={{
    // width: '100%',
    px: 4,
    borderColor: 'black',
    borderRadius: 0,
    borderWidth: 2,
    color: 'black',
    ':hover': {
      borderWidth: 2,
      backgroundColor: 'black',
      color: 'white',
      borderColor: 'black',
    }
  }}>{props.children}</Button>
)

function SubmitButton() {
  const { user } = useAuth()

  const { sliceName, sliceDescription } = useContext(MyContext)
  const { selectedRadio,
    bandwidthWithPerSlice, numberOfDevicesWithPerSlice,
    bandwidthWithPerDevice, numberOfDevicesWithPerDevice,
    bandwidthWithDensity, numberOfDevicesWithDensity } = useContext(MyContext)
  const { selectedCore,
    selectedTrafficWithOperator, selectedFallbackWithOperator,
    selectedDataCenterWithLocal, selectedTrafficWithLocal, selectedFallbackWithLocal,
    selectedTransferCore, selectedFallbackWithTransfer } = useContext(MyContext)
  const { geographyType, country, shapesGeography } = useContext(MyContext)
  const { startDate, checkedEndDate, endDate } = useContext(MyContext)
  const { selectedBilling } = useContext(MyContext)
  const { selectedImsi } = useContext(MyContext)

  const router = useRouter()

  function storeNewSlice() {
    let slice = {}
    slice.name = sliceName
    slice.description = sliceDescription
    let numberOfDevices = 0
    let bandwidth = 0
    switch (selectedRadio) {
      case 'per_slice':
        bandwidth = bandwidthWithPerSlice
        numberOfDevices = numberOfDevicesWithPerSlice
        break
      case 'per_device':
        bandwidth = bandwidthWithPerDevice
        numberOfDevices = numberOfDevicesWithPerDevice
        break
      case 'density':
        bandwidth = bandwidthWithDensity
        numberOfDevices = numberOfDevicesWithDensity
        break
    }
    slice.radio = {
      type: selectedRadio,
      bandwidth: bandwidth,
      numberOfDevices: numberOfDevices,
    }
    let dataCenter = ''
    let traffic = ''
    let fallback = ''
    let transferCore = ''
    switch (selectedCore) {
      case 'operator':
        traffic = selectedTrafficWithOperator
        if (traffic === 'VPN') {
          fallback = selectedFallbackWithOperator
        }
        break
      case 'local':
        dataCenter = selectedDataCenterWithLocal
        traffic = selectedTrafficWithLocal
        if (traffic === 'VPN') {
          fallback = selectedFallbackWithLocal
        }
        break
      case 'transfer':
        transferCore = selectedTransferCore
        fallback = selectedFallbackWithTransfer
        break
    }
    slice.core = {
      type: selectedCore,
      dataCenter: dataCenter,
      traffic: traffic,
      fallback: fallback,
      transferCore: transferCore,
    }
    let shapes = shapesGeography.map(shape => JSON.stringify(exportShape(shape)))
    slice.geography = {
      type: geographyType,
      country: country,
      shapes: shapes,
    }
    slice.time = {
      startDate: startDate.toISOString(),
      endDate: checkedEndDate ? endDate.toISOString() : '',
    }
    slice.billing = selectedBilling
    slice.configuration = {
      imsi: {
        type: selectedImsi
      }
    }

    firebase.database().ref('slices_preview/' + user?.id + '/' + sliceName).set(slice)
      .then(success => {
        router.push('/')
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <ProceedButton onClick={storeNewSlice}>Submit configuration</ProceedButton>
  )
}

export default function TabsCreate() {
  const [tabValue, setTabValue] = useState('1');
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };

  function onBackClick() {
    if (tabValue === '1') {
      router.push('/')
    } else {
      setTabValue((+tabValue - 1).toString())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function onProceedClick() {
    setTabValue((+tabValue + 1).toString())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const ButtonsAtBottom = (props: { proceedButton?}) => (
    // <Box sx={{ width: '100%', marginTop: 'auto' }}>
    //   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    //     <Grid item xs={12} sx={{ mt: 4, mb: 6 }}>
    //       <Grid container columnSpacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
    //         <Grid item lg={1}>
    //           <BackButton onClick={onBackClick}>Back</BackButton>
    //         </Grid>
    //         <Grid item lg={2}>
    //           {props.proceedButton
    //             ? props.proceedButton
    //             : <ProceedButton onClick={onProceedClick}>Proceed</ProceedButton>}
    //         </Grid>
    //       </Grid>
    //     </Grid >
    //   </Grid>
    // </Box>
    <Box sx={{ marginTop: 'auto' }}>
      <Stack sx={{ mt: 4, mb: 6 }} direction='row' spacing={1}>
        <BackButton onClick={onBackClick}>Back</BackButton>
        {props.proceedButton
          ? props.proceedButton
          : <ProceedButton onClick={onProceedClick}>Proceed</ProceedButton>}
      </Stack>
    </Box>
  )

  const [viewportHeight, setViewportHeight] = useState<number>();

  React.useEffect(() => {
    setViewportHeight(window.innerHeight - 2 - 8 - 36.5 - 16 - 32 - 16 - 10)
    function handleResize() {
      setViewportHeight(window.innerHeight - 2 - 8 - 36.5 - 16 - 32 - 16 - 10);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex' }}
    >
      <TabContext value={tabValue}>
        <TabList
          orientation="vertical"
          indicatorColor=""
          // textColor='inherit'
          variant="scrollable"
          // value={tabValue}
          onChange={handleTabChange}
          sx={{ borderRight: 0, borderColor: 'divider', display: 'flex', overflow: 'visible' }}
        >
          <StyledTab disabled sx={{}} label="Steps" />
          <StyledTab label="General" value="1" />
          <StyledTab label="Radio slice" value='2' />
          <StyledTab label="Core slice" value='3' />
          <StyledTab label="Geography" value='4' />
          <StyledTab label="Time and billing" value='5' />
          <StyledTab label="Summary" value='6' />
          <StyledTab label="Configuration" value='7' />
        </TabList>
        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value='1'>
            {viewportHeight &&
              <Box sx={{ minHeight: viewportHeight, display: 'flex', flexDirection: 'column' }}>
                <GeneralTab insidePage='create' />
                <ButtonsAtBottom />
              </Box>
            }
          </TabPanel>
          <TabPanel value='2'>
            <RadioSliceTab />
            <ButtonsAtBottom />
          </TabPanel>
          <TabPanel value='3'>
            <CoreSliceTab />
            <ButtonsAtBottom />
          </TabPanel>
          <TabPanel value='4'>
            <GeographyTab />
            <ButtonsAtBottom />
          </TabPanel>
          <TabPanel value='5'>
            <Box sx={{ minHeight: viewportHeight, display: 'flex', flexDirection: 'column' }}>
              <TimeAndBillingTab />
              <ButtonsAtBottom />
            </Box>
          </TabPanel>
          <TabPanel value='6'>
            <Box sx={{ minHeight: viewportHeight, display: 'flex', flexDirection: 'column' }}>
              <SummaryTab insidePage='create' />
              <ButtonsAtBottom proceedButton={<ProceedButton onClick={onProceedClick}>Create slice and proceed to slice configuration</ProceedButton>} />
            </Box>
          </TabPanel>
          <TabPanel value='7'>
            <ConfigurationTab />
            <ButtonsAtBottom proceedButton={<SubmitButton />} />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

