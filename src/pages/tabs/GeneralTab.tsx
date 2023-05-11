import React, { useContext } from 'react';
import { Button, Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled } from '@mui/material';
import { Radio, RadioGroup, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { MyContext } from '@/context/myContext';
import { HeaderText, StyledTextField } from '@/components/generalComponents';
import SummaryTab from './SummaryTab';

type insidePage = 'create' | 'settings'

function GeneralTab({ insidePage }: { insidePage: insidePage }) {
  const { sliceName, setSliceName } = useContext(MyContext)
  const { sliceDescription, setSliceDescription } = useContext(MyContext)

  return (
    <Box
      component="form"
      sx={{ width: '100%', }}
      noValidate
      autoComplete="off"
    >
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <HeaderText>General settings</HeaderText>
        </Grid>
        {/* <Grid item xs={12} sx={{ }} /> */}
        <Grid item xs={12} lg={2} sx={{ mt: 1 }}>
          <Typography>Slice name</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <StyledTextField
            sx={{ width: '100%' }}
            size="small"
            label="Slice name"
            variant="outlined"
            defaultValue={sliceName}
            onBlur={(event) => {
              setSliceName(event.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6} />
        <Grid item xs={12} lg={2} sx={{ mt: 1 }}>
          <Typography>Slice description</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <StyledTextField
            sx={{ width: '100%' }}
            size="small"
            label="Slice description"
            multiline
            defaultValue={sliceDescription}
            onBlur={(event) => {
              setSliceDescription(event.target.value)
            }}
          />
        </Grid>
        {insidePage === 'create' &&
          <Grid item xs={12} lg={5} />}
        {insidePage === 'create' &&
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography>During the next steps you   will need to select:</Typography>
            <Typography sx={{ mt: 1 }} />
            <Typography>- 5G radio slice type - to let network know how your devices should be served</Typography>
            <Typography>- 5G core slice type - to let network know how you want your device's traffic to be managed</Typography>
            <Typography>- geolocation of the slice - to let network know in which areas you need your private 5G network slice (spot on the map, area or country-wide)</Typography>
            <Typography>- to align schedule - when your slice should be started and (optionally) stopped </Typography>
            <Typography>- billing selection</Typography>
          </Grid>}
      </Grid>
      {insidePage === 'settings' &&
        <Box sx={{ mt: 5, mb: 2 }}>
          <SummaryTab insidePage='settings' />
        </Box>}
    </Box>
  )
}

export default React.memo(GeneralTab)
