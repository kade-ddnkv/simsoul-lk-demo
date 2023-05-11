import React, { useState, useContext } from 'react';
import { Button, Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled } from '@mui/material';
import { Radio, RadioGroup, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { useMediaQuery, useTheme } from '@mui/material';
import { alpha } from "@mui/material";
import { useRouter } from 'next/router';
import Geography from '@/pages/tabs/GeographyTab';
import { HeaderText, StyledButton, StyledTextField, BoxInsideRadio } from '@/components/generalComponents';
import { MyContext } from '@/context/myContext';

function RadioSliceTab() {
  const { selectedRadio, setSelectedRadio } = useContext(MyContext);
  const { bandwidthWithPerSlice, setBandwidthWithPerSlice } = useContext(MyContext);
  const { numberOfDevicesWithPerSlice, setNumberOfDevicesWithPerSlice } = useContext(MyContext);
  const { bandwidthWithPerDevice, setBandwidthWithPerDevice } = useContext(MyContext);
  const { numberOfDevicesWithPerDevice, setNumberOfDevicesWithPerDevice } = useContext(MyContext);
  const { bandwidthWithDensity, setBandwidthWithDensity } = useContext(MyContext);
  const { numberOfDevicesWithDensity, setNumberOfDevicesWithDensity } = useContext(MyContext);

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

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
          <Typography>Radio slice means virtualized part of radio access network. Please select one of the following options:</Typography>
        </Grid>
        <Grid item xs={12} lg={2} />
        <Grid item xs={12} lg={7}>
          <RadioGroup
            name="which-radio-radio-buttons-group"
            value={selectedRadio}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="per_slice" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Bandwidth & Latency per slice</Typography>} />
            <BoxInsideRadio>
              <Typography>Shared bandwidth and latency for all mobile devices inside the slice.</Typography>
              <Box sx={selectedRadio !== 'per_slice' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Box>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Total bandwidth per slice</Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <StyledTextField disabled={selectedRadio !== 'per_slice'}
                        sx={{ width: '100%' }}
                        size="small"
                        label="Gbps"
                        defaultValue={bandwidthWithPerSlice}
                        variant="outlined"
                        type='number'
                        onBlur={(event) => setBandwidthWithPerSlice(event.target.value)}
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
                      <StyledTextField disabled={selectedRadio !== 'per_slice'}
                        sx={{ width: '100%' }}
                        size="small"
                        label="Number of devices"
                        defaultValue={numberOfDevicesWithPerSlice}
                        variant="outlined"
                        type='number'
                        onBlur={(event) => setNumberOfDevicesWithPerSlice(event.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </BoxInsideRadio>
            <FormControlLabel value="per_device" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Bandwidth & Latency per device</Typography>} />
            <BoxInsideRadio>
              <Typography>Guaranteed bandwidth and latency for every mobile devices inside the slice.</Typography>
              <Box sx={selectedRadio !== 'per_device' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Box>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Number of devices</Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <StyledTextField disabled={selectedRadio !== 'per_device'}
                        sx={{ width: '100%' }}
                        size="small"
                        label="Number of devices"
                        defaultValue={numberOfDevicesWithPerDevice}
                        variant="outlined"
                        type='number'
                        onBlur={(event) => setNumberOfDevicesWithPerDevice(event.target.value)}
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
                      <StyledTextField disabled={selectedRadio !== 'per_device'}
                        sx={{ width: '100%' }}
                        size="small"
                        label="Mbps"
                        defaultValue={bandwidthWithPerDevice}
                        variant="outlined"
                        type='number'
                        onBlur={(event) => setBandwidthWithPerDevice(event.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </BoxInsideRadio>
            <FormControlLabel value="density" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>High density slice</Typography>} />
            <BoxInsideRadio>
              <Typography>This type of slice should be userd to provide connectivity for large number of devices with minimal traffic and interactions (like massive IIoT sensors etc).</Typography>
              <Box sx={selectedRadio !== 'density' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Box>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Number of devices</Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <StyledTextField disabled={selectedRadio !== 'density'}
                        sx={{ width: '100%' }}
                        size="small"
                        label="Number of devices"
                        defaultValue={numberOfDevicesWithDensity}
                        variant="outlined"
                        type='number'
                        onBlur={(event) => setNumberOfDevicesWithDensity(event.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Bandwidth per slice</Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <StyledTextField disabled={selectedRadio !== 'density'}
                        sx={{ width: '100%' }}
                        size="small"
                        select
                        label="Select"
                        defaultValue="best_effort"
                        value={bandwidthWithDensity}
                        onChange={(event) => setBandwidthWithDensity(event.target.value)}
                      >
                        <MenuItem key='best_effort' value='best_effort'>best effort</MenuItem>
                        <MenuItem key='50Mbps' value='50Mbps'>50Mbps</MenuItem>
                        <MenuItem key='100Mbps' value='100Mbps'>100Mbps</MenuItem>
                        <MenuItem key='500Mbps' value='500Mbps'>500Mbps</MenuItem>
                        <MenuItem key='1Gbps' value='1Gbps'>1Gbps</MenuItem>
                      </StyledTextField>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </BoxInsideRadio>
            <FormControlLabel value="nothing" control={<Radio style={{ color: 'black' }} />} label={
              <Typography sx={{ fontWeight: 'bold' }}>I don't need a radio slice</Typography>
            } />
              <BoxInsideRadio>
              <Typography>Please select this option if you don't have any specific requirements for the bandwidth and latency. And you just need to manage your device's mobile data traffic before or instead of the routing to the public network (internet).</Typography>
                </BosInsideRadio>
          </RadioGroup>
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }} />
    </Box>
  )
}

export default React.memo(RadioSliceTab)
