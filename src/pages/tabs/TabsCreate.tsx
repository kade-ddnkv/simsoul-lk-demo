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
    width: '100%',
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
    width: '100%',
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
  const { user } = useUser()

  const { sliceName } = useContext(MyContext)
  const { selectedRadio } = useContext(MyContext)
  const { selectedCore } = useContext(MyContext)

  const router = useRouter()

  function storeNewSlice() {
    firebase.database().ref('slices_preview/' + user?.id + '/' + sliceName).set({
      name: sliceName,
      radio: selectedRadio,
      core: selectedCore,
    }).then(success => {
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <ProceedButton onClick={
      () => {
        storeNewSlice()
        router.push('/')
      }
    }>Submit and create slice</ProceedButton>
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
    <Box sx={{ width: '100%', marginTop: 'auto' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sx={{ mt: 4, mb: 6 }}>
          <Grid container columnSpacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item lg={1}>
              <BackButton onClick={onBackClick}>Back</BackButton>
            </Grid>
            <Grid item lg={2}>
              {props.proceedButton
                ? props.proceedButton
                : <ProceedButton onClick={onProceedClick}>Proceed</ProceedButton>}
            </Grid>
          </Grid>
        </Grid >
      </Grid>
    </Box>
  )

  const [viewportHeight, setViewportHeight] = useState<number>();

  React.useEffect(() => {
    setViewportHeight(window.innerHeight - 2 - 8 - 36.5 - 16 - 32 - 16)
    function handleResize() {
      setViewportHeight(window.innerHeight);
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
          <StyledTab disabled sx={{}} label="Steps" value='0' />
          <StyledTab label="Radio slice" value='1' />
          <StyledTab label="Core slice" value='2' />
          <StyledTab label="Geography" value='3' />
          <StyledTab label="Time and billing" value='4' />
          <StyledTab label="Summary" value='5' />
          <StyledTab label="Configuration" value='6' />
        </TabList>
        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value='0' />
          <TabPanel value='1'>
            <RadioSliceTab />
            <ButtonsAtBottom />
          </TabPanel>
          <TabPanel value='2'>
            <CoreSliceTab />
            <ButtonsAtBottom />
          </TabPanel>
          <TabPanel value='3'>
            <GeographyTab />
            <ButtonsAtBottom />
          </TabPanel>
          <TabPanel value='4'>
            <Box sx={{ minHeight: viewportHeight, display: 'flex', flexDirection: 'column' }}>
              <TimeAndBillingTab />
              <ButtonsAtBottom />
            </Box>
          </TabPanel>
          <TabPanel value='5'>
            <Box sx={{ minHeight: viewportHeight, display: 'flex', flexDirection: 'column' }}>
              <SummaryTab />
              <ButtonsAtBottom />
            </Box>
          </TabPanel>
          <TabPanel value='6'>
            <ConfigurationTab />
            <ButtonsAtBottom proceedButton={<SubmitButton />} />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
