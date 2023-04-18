import * as React from 'react';
import { Box, Tab, Button, Grid } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { TabPanel } from '@/components/TabPanel';
import Deneme from './deneme';
import RadioSliceTab from './tabs/RadioSliceTab';
import Header from '@/components/header';
import CoreSliceTab from './tabs/CoreSliceTab';
import Geography from '@/pages/tabs/GeographyTab';
import { styled } from '@mui/material';
import { MyContextProvider } from '@/context/myContext';
import { useRouter } from 'next/router';

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

export default function LabTabs() {
  const [tabValue, setTabValue] = React.useState('1');
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };

  function onBackClick() {
    if (tabValue === '1') {
      router.push('/')
    } else {
      setTabValue(tabValue - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function onProceedClick() {
    if (tabValue === '7') {

    } else {
      setTabValue(tabValue + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const ButtonsAtBottom = () => (
    <Grid item xs={12} sx={{ mt: 4, mb: 6 }}>
      <Grid container columnSpacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item lg={1}>
          <BackButton onClick={onBackClick}>Back</BackButton>
        </Grid>
        <Grid item lg={2}>
          <ProceedButton onClick={onProceedClick}>Proceed</ProceedButton>
        </Grid>
      </Grid>
    </Grid >
  )

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Header mainText='Creating a new slice' useHomeButton={true} isBold={true} />
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
            <StyledTab label="Configuration" value='5' />
            <StyledTab label="Summary" value='6' />
          </TabList>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value='1'>
            <RadioSliceTab buttonsAtBottom={1} />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <ButtonsAtBottom />
            </Grid>
          </TabPanel>
          <TabPanel value='2'>
            <CoreSliceTab buttonsAtBottom={1} />
          </TabPanel>
          <TabPanel value='3'>
            <Geography buttonsAtBottom={1} />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
