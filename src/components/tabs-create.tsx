import * as React from 'react';
import { Button, Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled } from '@mui/material';
import { Radio, RadioGroup, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { useMediaQuery, useTheme } from '@mui/material';
import { alpha } from "@mui/material";
import { useRouter } from 'next/router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pl: 5, pt: 2 }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const BoxInsideRadio = styled(Box)({
  marginLeft: '31px',
  marginBottom: '48px',
})

const GridInsideBox = styled(Grid)({

})

function StyledRadio() {
  return (
    <Radio style={{ color: 'black' }} />
  )
}

const HeaderText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem'
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

export default function TabsCreate() {
  const [tabValue, setTabValue] = React.useState(1);
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  const ButtonsAtBottom = () => (
    <Grid item xs={12} sx={{ mt: 4, mb: 6 }}>
      <Grid container columnSpacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item lg={1}>
          <BackButton onClick={() => tabValue === 1 ? router.push('/') : setTabValue(tabValue - 1)}>Back</BackButton>
        </Grid>
        <Grid item lg={2}>
          <ProceedButton onClick={() => tabValue === 7 ? console.log() : setTabValue(tabValue + 1)}>Proceed</ProceedButton>
        </Grid>
      </Grid>
    </Grid >
  )

  function RadioSliceTab() {
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedRadio, setSelectedRadio] = React.useState('nothing');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedRadio((event.target as HTMLInputElement).value);
    };

    return (
      <Box
        component="form"
        sx={{ width: '100%', }}
        noValidate
        autoComplete="off"
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderText>Radio slice</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>Select one of 4 options</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <RadioGroup
              name="which-radio-radio-buttons-group"
              value={selectedRadio}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="per_slice" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Bandwidth + Latency per slice</Typography>} />
              <BoxInsideRadio>
                <Typography>I want guaranteed bandwidth to all my devices.</Typography>
                <Box sx={selectedRadio !== 'per_slice' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Bandwidth</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'per_slice'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Gbps"
                          defaultValue="300"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Max number of devices (estimated)</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled
                          sx={{ width: '100%' }}
                          size="small"
                          label="Gbps"
                          defaultValue="300"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="per_device" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Bandwidth + Latency per device</Typography>} />
              <BoxInsideRadio>
                <Typography>I want guaranteed bandwidth and latency for each of my devices.</Typography>
                <Box sx={selectedRadio !== 'per_device' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Number of devices</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'per_device'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Number"
                          defaultValue="1000"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Bandwidth for each device</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'per_device'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Gbps"
                          defaultValue="300"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="density" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Density</Typography>} />
              <BoxInsideRadio>
                <Typography>I want a guaranteed connection of a large number of my devices with minimal traffic.</Typography>
                <Box sx={selectedRadio !== 'density' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Number of devices</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'density'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Number"
                          defaultValue="100500"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Bandwidth for each device</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'density'}
                          sx={{ width: '100%' }}
                          size="small"
                          select
                          label="Select"
                          defaultValue="best_effort"
                        >
                          <MenuItem key='best_effort' value='best_effort'>best effort</MenuItem>
                          <MenuItem key='100Mbps' value='100Mbps'>100Mbps</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="nothing" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>I don't need a radio slice</Typography>} />
            </RadioGroup>
          </Grid>
          <ButtonsAtBottom />
        </Grid>
      </Box>
    )
  }

  function CoreSliceTab() {
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedRadio, setSelectedRadio] = React.useState('nothing');

    const handleCoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedRadio((event.target as HTMLInputElement).value);
    };

    return (
      <Box
        component="form"
        sx={{ width: '100%', }}
        noValidate
        autoComplete="off"
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderText>Core slice</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>Select one of 4 options</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <RadioGroup
              name="which-radio-radio-buttons-group"
              value={selectedRadio}
              onChange={handleCoreChange}
            >
              <FormControlLabel value="per_slice" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Bandwidth + Latency per slice</Typography>} />
              <BoxInsideRadio>
                <Typography>I want guaranteed bandwidth to all my devices.</Typography>
                <Box sx={selectedRadio !== 'per_slice' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Bandwidth</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'per_slice'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Gbps"
                          defaultValue="300"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Max number of devices (estimated)</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled
                          sx={{ width: '100%' }}
                          size="small"
                          label="Gbps"
                          defaultValue="300"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="per_device" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Bandwidth + Latency per device</Typography>} />
              <BoxInsideRadio>
                <Typography>I want guaranteed bandwidth and latency for each of my devices.</Typography>
                <Box sx={selectedRadio !== 'per_device' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Number of devices</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'per_device'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Number"
                          defaultValue="1000"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Bandwidth for each device</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'per_device'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Gbps"
                          defaultValue="300"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="density" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Density</Typography>} />
              <BoxInsideRadio>
                <Typography>I want a guaranteed connection of a large number of my devices with minimal traffic.</Typography>
                <Box sx={selectedRadio !== 'density' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Number of devices</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'density'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Number"
                          defaultValue="100500"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Bandwidth for each device</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextField disabled={selectedRadio !== 'density'}
                          sx={{ width: '100%' }}
                          size="small"
                          select
                          label="Select"
                          defaultValue="best_effort"
                        >
                          <MenuItem key='best_effort' value='best_effort'>best effort</MenuItem>
                          <MenuItem key='100Mbps' value='100Mbps'>100Mbps</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="nothing" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>I don't need a radio slice</Typography>} />
            </RadioGroup>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        indicatorColor=""
        // textColor='inherit'
        variant="scrollable"
        value={tabValue}
        onChange={handleTabChange}
        sx={{ borderRight: 0, borderColor: 'divider', display: 'flex', overflow: 'visible' }}
      >
        <StyledTab disabled sx={{}} label="Steps" />
        <StyledTab label="Radio slice" {...a11yProps(0)} />
        <StyledTab label="Core slice" {...a11yProps(1)} />
        <StyledTab label="Geography" {...a11yProps(2)} />
        <StyledTab label="Time and billing" {...a11yProps(3)} />
        <StyledTab label="Configuration" {...a11yProps(4)} />
        <StyledTab label="Summary" {...a11yProps(5)} />
      </Tabs>
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel value={tabValue} index={0} />
        <TabPanel value={tabValue} index={1}>
          <RadioSliceTab />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <CoreSliceTab />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          Item Three
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          Item Four
        </TabPanel>
        <TabPanel value={tabValue} index={5}>
          Item Five
        </TabPanel>
        <TabPanel value={tabValue} index={6}>
          Item Six
        </TabPanel>
        <TabPanel value={tabValue} index={7}>
          Item Seven
        </TabPanel>
      </Box>
    </Box>
  );
}

