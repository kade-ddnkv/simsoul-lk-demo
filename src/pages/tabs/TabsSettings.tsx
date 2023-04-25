import React, { useState, useContext } from 'react';
import { Button, Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled } from '@mui/material';
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
import { useUser } from '@/auth/useUser';
import { MyContext } from '@/context/myContext';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

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

function SaveButton() {
  // const { user } = useUser()

  // const { sliceName } = useContext(MyContext)

  // const router = useRouter()

  // function storeNewSlice() {
  //   firebase.database().ref('slices_preview/' + user?.id + '/one').set({
  //     name: sliceName
  //   }).then(success => {
  //   }).catch((error) => {
  //     console.error(error);
  //   })
  // }

  return (
    <Button variant='outlined' sx={{
      mt: 1,
      width: '100%',
      // border: 0,
      borderRadius: 0,
      borderColor: '#79a67b',
      // backgroundColor: alpha('#d5eddb', 0.2),
      color: 'black',
      ':hover': {
        // border: 0,
        borderColor: 'black',
        backgroundColor: '#e6fceb',
        // color: 'white'
      }
    }}><CheckIcon /><Box sx={{ pr: '12px' }}>Save changes</Box></Button>
  )
}

function ResetButton() {
  // const { user } = useUser()

  // const { sliceName } = useContext(MyContext)

  // const router = useRouter()

  // function storeNewSlice() {
  //   firebase.database().ref('slices_preview/' + user?.id + '/one').set({
  //     name: sliceName
  //   }).then(success => {
  //   }).catch((error) => {
  //     console.error(error);
  //   })
  // }

  return (
    <Button variant='outlined' sx={{
      mt: 1,
      width: '100%',
      // border: 0,
      borderRadius: 0,
      borderColor: '#b56b60',
      // backgroundColor: alpha('#eddddd', 0.5),
      color: 'black',
      ':hover': {
        // border: 0,
        // backgroundColor: '#917774',
        // color: 'white'
        borderColor: 'black',
        backgroundColor: '#fce1e1',
      }
    }}>
      <CloseIcon /><Box sx={{ pr: '8px' }}>Reset changes</Box>
    </Button>
  )
}

export default function TabsSettings() {
  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };

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
          <StyledTab disabled sx={{}} label="Settings" value='0' />
          <StyledTab label="Radio slice" value='1' />
          <StyledTab label="Core slice" value='2' />
          <StyledTab label="Geography" value='3' />
          <StyledTab label="Time and billing" value='4' />
          <StyledTab label="Configuration" value='5' />
          <ResetButton />
          <SaveButton />
          <StyledTab disabled sx={{ mt: 4 }} label="Analytics" value='6' />
          <StyledTab label="Analytics 1" value='7' />
          <StyledTab label="Analytics 2" value='8' />
          <StyledTab label="Analytics 3" value='9' />
        </TabList>
        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value='0' />
          <TabPanel value='1'>
            <RadioSliceTab />
          </TabPanel>
          <TabPanel value='2'>
            <CoreSliceTab />
          </TabPanel>
          <TabPanel value='3'>
            <GeographyTab />
          </TabPanel>
          <TabPanel value='4'>
            <TimeAndBillingTab />
          </TabPanel>
          <TabPanel value='5'>
            <ConfigurationTab />
          </TabPanel>
          <TabPanel value='6' />
          <TabPanel value='7'>
            Analytics 1
          </TabPanel>
          <TabPanel value='8'>
            Analytics 2
          </TabPanel>
          <TabPanel value='9'>
            Analytics 3
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

