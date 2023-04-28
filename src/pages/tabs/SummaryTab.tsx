import { MyContext } from '@/context/myContext'
import React, { useContext } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { HeaderText } from '@/components/generalComponents'

function SummaryTab() {
  const { selectedRadio,
    bandwidthWithPerSlice, numberOfDevicesWithPerSlice,
    bandwidthWithPerDevice, numberOfDevicesWithPerDevice,
    bandwidthWithDensity, numberOfDevicesWithDensity } = useContext(MyContext)
  const { selectedCore,
    selectedTrafficWithOperator, selectedFallbackWithOperator,
    selectedDataCenterWithLocal, selectedTrafficWithLocal, selectedFallbackWithLocal,
    selectedTransferCore, selectedFallbackWithTransfer } = useContext(MyContext)
  const { geographyType } = useContext(MyContext)
  const { startDate, endDate, checkedEndDate } = useContext(MyContext)
  const { selectedBilling } = useContext(MyContext)

  function radioSummary() {
    switch (selectedRadio) {
      case 'per_slice':
        return 'Bandwidth + Latency per slice.'
      case 'per_device':
        return 'Bandwidth + Latency per device.'
      case 'density':
        return 'Density.'
      case 'nothing':
        return 'Not needed.'
    }
  }

  function coreSummary() {
    switch (selectedCore) {
      case 'operator':
        return "Allocated resources on the operator's side, under the operator's control."
      case 'local':
        return "Allocated resources in the local (operator's) data center."
      case 'transfer':
        return "Transfer some core resources to the my local platform."
      case 'nothing':
        return 'Not needed.'
    }
  }

  function geographySummary() {
    switch (geographyType) {
      case 'point':
        return 'One point: .'
      case 'region':
        return 'Region in country: .'
      case 'country':
        return 'Country: .'
    }
  }

  const NotSelected = () => { return <Box sx={{ color: 'red' }} display='inline'>{'[Not selected]'}</Box> }

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <HeaderText>Summary</HeaderText>
        </Grid>
        <Grid item xs={12}>
          <Typography>Review the selected options</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }} />
        <Grid item xs={12} lg={1.5}>
          <Typography sx={{ fontWeight: 'bold' }}>Radio slice: </Typography>
        </Grid>
        <Grid item xs={12} lg={10.5}>
          <Typography>{radioSummary()}</Typography>
          {selectedRadio === 'per_slice' &&
            <>
              <Typography>Total bandwidth per slice: {bandwidthWithPerSlice + 'Gbps'}.</Typography>
              <Typography>Max number of devices (estimated): {numberOfDevicesWithPerSlice}.</Typography>
            </>
          }
          {selectedRadio === 'per_device' &&
            <>
              <Typography>Number of devices: {numberOfDevicesWithPerDevice}.</Typography>
              <Typography>Bandwidth for each device: {bandwidthWithPerDevice + 'Mbps'}.</Typography>
            </>
          }
          {selectedRadio === 'density' &&
            <>
              <Typography>Number of devices: {numberOfDevicesWithDensity}.</Typography>
              <Typography>Bandwidth per slice: {bandwidthWithDensity}.</Typography>
            </>
          }
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }} />
        <Grid item xs={12} lg={1.5}>
          <Typography sx={{ fontWeight: 'bold' }}>Core slice: </Typography>
        </Grid>
        <Grid item xs={12} lg={10.5}>
          <Typography>{coreSummary()}</Typography>
          {selectedCore === 'operator' &&
            <>
              <Box>
                <Typography component='span'>Route my data plane: </Typography>
                <Typography display='inline'>to {selectedTrafficWithOperator}.</Typography>
              </Box>
              {selectedTrafficWithOperator === 'VPN' &&
                <Box>
                  <Typography component='span'>Fallback scenario: </Typography>
                  <Typography display='inline'>to {selectedFallbackWithOperator}.</Typography>
                </Box>
              }
            </>
          }
          {selectedCore === 'local' &&
            <>
              <Box>
                <Typography>Selected data center: {selectedDataCenterWithLocal}.</Typography>
              </Box>
              <Box>
                <Typography component='span'>Route my data plane: </Typography>
                <Typography display='inline'>to {selectedTrafficWithLocal}.</Typography>
              </Box>
              {selectedTrafficWithLocal === 'VPN' &&
                <Box>
                  <Typography component='span'>Fallback scenario: </Typography>
                  <Typography display='inline'>to {selectedFallbackWithLocal}.</Typography>
                </Box>
              }
            </>
          }
          {selectedCore === 'transfer' &&
            <>
              <Box>
                <Typography>5G core software: {selectedTransferCore === 'operator' ? 'from operator' : 'my own'}.</Typography>
              </Box>
              <Box>
                <Typography>Fallback scenario: to {selectedFallbackWithTransfer}.</Typography>
              </Box>
            </>
          }
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }} />
        <Grid item xs={12} lg={1.5}>
          <Typography sx={{ fontWeight: 'bold' }}>Geography: </Typography>
        </Grid>
        <Grid item xs={12} lg={10.5}>
          <Typography>{geographySummary()}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }} />
        <Grid item xs={12} lg={1.5}>
          <Typography sx={{ fontWeight: 'bold' }}>Dates of work: </Typography>
        </Grid>
        <Grid item xs={12} lg={10.5}>
          <Typography component='span'>
            From {startDate ? startDate.format('DD/MM/YYYY') : <NotSelected />} {checkedEndDate ? ' until ' : ' until stopped'}
            {(checkedEndDate && endDate) && endDate.format('DD/MM/YYYY')}
            {(checkedEndDate && !endDate) && <NotSelected />}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }} />
        <Grid item xs={12} lg={1.5}>
          <Typography sx={{ fontWeight: 'bold' }}>Billing: </Typography>
        </Grid>
        <Grid item xs={12} lg={10.5}>
          <Typography component='span'>{selectedBilling}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default React.memo(SummaryTab)