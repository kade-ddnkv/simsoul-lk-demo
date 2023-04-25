import React, { useContext } from 'react';
import { Button, Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled } from '@mui/material';
import { Radio, RadioGroup, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { MyContext } from '@/context/myContext';
import { HeaderText, StyledTextField } from '@/components/generalComponents';

function GeneralTab() {
  const { sliceName, setSliceName } = useContext(MyContext)

  return (
    <Box
      component="form"
      sx={{ width: '100%', }}
      noValidate
      autoComplete="off"
    >
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <HeaderText>Configuration</HeaderText>
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
            onBlur={(event) => {
              setSliceName(event.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} lg={5} />
        <Grid item xs={12} sx={{mt: 3}}>
          <Typography>In the following steps, you will need to select:</Typography>
          <Typography sx={{mt: 1}} />
          <Typography>- radio slice type</Typography>
          <Typography>- core slice type</Typography>
          <Typography>- location of the slice</Typography>
          <Typography>- time of work</Typography>
          <Typography>- billing</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default React.memo(GeneralTab)