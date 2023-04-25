import { MyContext } from '@/context/myContext'
import React, { useContext } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { HeaderText } from '@/components/generalComponents'

function SummaryTab() {
  const { selectedRadio } = useContext(MyContext)
  const { selectedCore,
    selectedTrafficWithOperator, selectedFallbackWithOperator,
    selectedTrafficWithLocal, selectedFallbackWithLocal,
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
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }} />
        <Grid item xs={12} lg={1.5}>
          <Typography sx={{ fontWeight: 'bold' }}>Core slice: </Typography>
        </Grid>
        <Grid item xs={12} lg={10.5}>
          <Typography>{coreSummary()}</Typography>
          <Box>
            <Typography component='span'>Route data plane: </Typography>
            <Typography display='inline'>to VPN</Typography>
          </Box>
          <Box>
            <Typography component='span'>Fallback scenario: </Typography>
            <Typography display='inline'>to public</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }} />
        <Grid item xs={12} lg={1.5}>
          <Typography sx={{ fontWeight: 'bold' }}>Geography: </Typography>
        </Grid>
        <Grid item xs={12} lg={10.5}>
          <Typography component='span'>One building: </Typography>
          <Typography display='inline'>{'<address>'}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }} />
        <Grid item xs={12} lg={1.5}>
          <Typography sx={{ fontWeight: 'bold' }}>Dates of work: </Typography>
        </Grid>
        <Grid item xs={12} lg={10.5}>
          <Typography component='span'>From {!startDate && <NotSelected />} {checkedEndDate ? ' to ' : ' until stopped'} {checkedEndDate && !endDate && <NotSelected />}</Typography>
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