import React, { useContext } from 'react';
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
                      <Typography>Total bandwidth per slice</Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <StyledTextField disabled={selectedRadio !== 'per_slice'}
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
                      <StyledTextField disabled
                        sx={{ width: '100%' }}
                        size="small"
                        label="Number of devices"
                        defaultValue="1250"
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
                      <StyledTextField disabled={selectedRadio !== 'per_device'}
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
                      <StyledTextField disabled={selectedRadio !== 'per_device'}
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
                      <StyledTextField disabled={selectedRadio !== 'density'}
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
                      <Typography>Bandwidth per slice</Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <StyledTextField disabled={selectedRadio !== 'density'}
                        sx={{ width: '100%' }}
                        size="small"
                        select
                        label="Select"
                        defaultValue="best_effort"
                      >
                        <MenuItem key='best_effort' value='best_effort'>best effort</MenuItem>
                        <MenuItem key='100Mbps' value='100Mbps'>100Mbps</MenuItem>
                      </StyledTextField>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </BoxInsideRadio>
            <FormControlLabel value="nothing" control={<Radio style={{ color: 'black' }} />} label={
              <Typography sx={{ fontWeight: 'bold' }}>I don't need a radio slice</Typography>
            } />
          </RadioGroup>
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }} />
    </Box>
  )
}

export default React.memo(RadioSliceTab)