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
import { useUser } from '@/auth/useUser';
import { MyContext } from '@/context/myContext';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import GeneralTab from './GeneralTab';
import { useAuth } from '@/auth/authUserContext';
import AnalyticsFirstTab from './AnalyticsFirstTab';

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

const DeleteSliceButton = () => {
  const { user } = useAuth()

  const router = useRouter()

  const { sliceName } = useContext(MyContext)

  const [firstClicked, setFirstClicked] = useState(false)
  const [textField, setTextField] = useState('')

  function deleteSlice() {
    if (textField !== sliceName) {
      return
    }
    firebase.database().ref('slices_preview/' + user?.id + '/' + sliceName).set({})
      .then(success => {
        router.push('/')
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <Box sx={{ marginTop: 'auto' }}>
      <Box sx={{ mt: 6, mb: 6 }}>
        <HeaderText>Delete slice</HeaderText>
        <Stack sx={{ mt: 1, display: 'flex', alignItems: 'center' }} direction='row' spacing={3}>
          <Typography>
            {!firstClicked
              ? 'Click the button to delete slice'
              : 'Type the name of a slice to submit deletion'
            }
          </Typography>
          {!firstClicked
            ? <StyledButton onClick={() => { setFirstClicked(true) }} variant='outlined' sx={{
              minHeight: '40px',
              px: 4,
              borderColor: '#b56b60',
              ':hover': {
                borderColor: 'black',
                backgroundColor: '#fce1e1',
              }
            }}>Delete slice</StyledButton>
            : <>
              <StyledTextField
                sx={{ borderColor: 'red' }}
                size="small"
                label="Slice name"
                onChange={(event) => setTextField(event.target.value)}
                autoComplete='off'
              />
              <StyledButton onClick={deleteSlice} variant='outlined' sx={{
                minHeight: '40px',
                px: 4,
                borderColor: '#b56b60',
                ':hover': {
                  borderColor: 'black',
                  backgroundColor: '#fce1e1',
                }
              }}>Submit slice deletion</StyledButton>
            </>
          }
        </Stack>
      </Box>
    </Box >
  )
}

export default function TabsSettings() {
  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };

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
          <StyledTab disabled sx={{}} label="Settings" />
          <StyledTab label="General" value='1' />
          <StyledTab label="Radio slice" value='2' />
          <StyledTab label="Core slice" value='3' />
          <StyledTab label="Geography" value='4' />
          <StyledTab label="Time and billing" value='5' />
          <StyledTab label="Configuration" value='6' />
          <ResetButton />
          <SaveButton />
          <StyledTab disabled sx={{ mt: 4 }} label="Analytics & reports" />
          <StyledTab label="Analytics 1" value='7' />
          <StyledTab label="Analytics 2" value='8' />
          <StyledTab label="Analytics 3" value='9' />
        </TabList>
        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value='1'>
            {viewportHeight &&
              <Box sx={{ minHeight: viewportHeight, display: 'flex', flexDirection: 'column' }}>
                <GeneralTab insidePage='settings' />
                <DeleteSliceButton />
              </Box>
            }
          </TabPanel>
          <TabPanel value='2'>
            <RadioSliceTab />
          </TabPanel>
          <TabPanel value='3'>
            <CoreSliceTab />
          </TabPanel>
          <TabPanel value='4'>
            <GeographyTab />
          </TabPanel>
          <TabPanel value='5'>
            <TimeAndBillingTab />
          </TabPanel>
          <TabPanel value='6'>
            <ConfigurationTab />
          </TabPanel>
          <TabPanel value='7'>
            <AnalyticsFirstTab />
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

