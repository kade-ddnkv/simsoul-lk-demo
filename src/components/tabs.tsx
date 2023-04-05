import * as React from 'react';
import { Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled } from '@mui/material';
import { Radio, RadioGroup, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { useMediaQuery, useTheme } from '@mui/material';


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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        indicatorColor=""
        // textColor='inherit'
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 0, borderColor: 'divider', display: 'flex', overflow: 'visible' }}
      >
        <StyledTab disabled sx={{}} label="Settings" />
        <StyledTab label="General" {...a11yProps(0)} />
        <StyledTab label="Geography" {...a11yProps(1)} />
        <StyledTab label="Data plane routing" {...a11yProps(2)} />
        <StyledTab label="Time and billing" {...a11yProps(3)} />
        <StyledTab disabled sx={{ mt: 4 }} label="Analytics" />
        <StyledTab label="Analytics 1" {...a11yProps(4)} />
        <StyledTab label="Analytics 2" {...a11yProps(5)} />
        <StyledTab label="Analytics 3" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0} />
      <TabPanel value={value} index={1}>
        <GeneralTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>General information</Typography>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={5} />
      <TabPanel value={value} index={6}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={8}>
        Item Seven
      </TabPanel>
    </Box>
  );
}

function GeneralTab() {
  const [checkedRadio, setCheckedRadio] = React.useState(false);
  const [checkedCore, setCheckedCore] = React.useState(false);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': {},
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>General information</Typography>
        </Grid>
        <Grid item xs={12} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Slice name</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField sx={{ width: '100%' }} size="small" label="Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Slice type</Typography>
        </Grid>
        <Grid item xs={12} lg={2} sx={{ mt: 1 }}>
          <Typography>Comment</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box>
            <FormControlLabel control={
              <Checkbox icon={<CheckBoxOutlineBlankSharpIcon />} checkedIcon={<CheckBoxSharpIcon />} style={{ color: 'black' }} sx={{ borderRadius: 0 }}
                checked={checkedRadio}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCheckedRadio(event.target.checked);
                }}
              />
            } label="Slice of radio" />
            <div hidden={!checkedRadio} style={{ marginBottom: 40 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                {isLg && <Grid item lg={3} />}
                <Grid item xs={12} lg={3}>
                  <Typography>Mhz</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  {/* <TextField sx={{ width: '100%' }} size="small" label="Mhz" variant="outlined" /> */}
                  <TextField
                    sx={{ width: '100%' }}
                    size="small"
                    select
                    label="Select"
                    defaultValue="10"
                  >
                    <MenuItem key={10} value={10}>10Mhz</MenuItem>
                    <MenuItem key={300} value={300}>300Mhz</MenuItem>
                  </TextField>
                </Grid>
                {isLg && <Grid item lg={3} />}
                <Grid item xs={12} lg={3}>
                  <Typography>Bandwidth</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    sx={{ width: '100%' }}
                    size="small"
                    select
                    label="Select"
                    defaultValue="300"
                  >
                    <MenuItem key={10} value={10}>10</MenuItem>
                    <MenuItem key={300} value={300}>300</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </Box>
          <Box>
            <FormControlLabel control={
              <Checkbox icon={<CheckBoxOutlineBlankSharpIcon />} checkedIcon={<CheckBoxSharpIcon />} style={{ color: 'black' }} sx={{ borderRadius: 0 }}
                checked={checkedCore}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCheckedCore(event.target.checked);
                }}
              />
            } label="Slice of core" />
            <div hidden={!checkedCore} style={{ marginBottom: 40 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                {isLg && <Grid item lg={3} />}
                <Grid item xs={12} lg={3}>
                  <Typography>Authorization / Authentification</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    sx={{ width: '100%' }}
                    size="small"
                    select
                    label="Select"
                    defaultValue="10"
                  >
                    <MenuItem key={10} value={10}>10Mhz</MenuItem>
                    <MenuItem key={300} value={300}>300Mhz</MenuItem>
                  </TextField>
                </Grid>
                {isLg && <Grid item lg={3} />}
                <Grid item xs={12} lg={3}>
                  <Typography>Traffic management</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    sx={{ width: '100%' }}
                    size="small"
                    select
                    label="Select"
                    defaultValue="300"
                  >
                    <MenuItem key={10} value={10}>10</MenuItem>
                    <MenuItem key={300} value={300}>300</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Grid>
        <CoreSliceTypeSettings />
      </Grid>
    </Box>
  );
}

function CoreSliceTypeSettings() {
  const [coreSliceType, setCoreSliceType] = React.useState('');

  const handleChangeCoreSliceType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoreSliceType((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Core slice type</Typography>
      </Grid>
      <Grid item xs={12} lg={2} sx={{ mt: 1 }}>
        <Typography>Comment</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <RadioGroup
          name="core-slice-type-radio-buttons-group"
          value={coreSliceType}
          onChange={handleChangeCoreSliceType}
        >
          <FormControlLabel value="telecom" control={<Radio />} label="In the data center of telecom operator" />
          <FormControlLabel value="region" control={<Radio />} label="In the local data center of selected region" />
          <FormControlLabel value="myself" control={<Radio />} label="On my territory" />
        </RadioGroup>
      </Grid>
      <Grid item lg={4}>
      </Grid>
      {coreSliceType === "region" &&
        <>
          <Grid item xs={12} sx={{ mt: 2 }} />
          <Grid item xs={12} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Select a data center from the suggested ones</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              sx={{ width: '100%' }}
              size="small"
              select
              label="Select"
              defaultValue="default"
            >
              <MenuItem key='default' value='default'>-</MenuItem>
              <MenuItem key={10} value={10}>10Mhz</MenuItem>
              <MenuItem key={300} value={300}>300Mhz</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }} />
          <Grid item xs={12} lg={2} sx={{ mt: 1 }}>
            <Typography>Which core will be used?</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <RadioGroup
              name="which-core-radio-buttons-group"
            >
              <FormControlLabel value="telecom" control={<Radio />} label="Use telecom operator core" />
              <FormControlLabel value="myself" control={<Radio />} label="Use my 3GPP compatible core" />
            </RadioGroup>
          </Grid>
        </>
      }
    </>
  );
}