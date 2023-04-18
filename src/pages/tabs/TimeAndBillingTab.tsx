import React, { useState } from 'react'
import { Grid, Typography, FormControlLabel, Checkbox, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Radio, tableCellClasses, Paper, styled } from '@mui/material'
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { HeaderText, StyledTextField } from "@/components/generalComponents"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const StyledTableCell = styled(TableCell)({
  fontSize: '16px'
})

function createData(
  name: string,
  value: string,
  first: string,
  second: string,
) {
  return { name, value, first, second };
}

const rows = [
  createData('Daily', 'daily', 8 + ' $', 138 + ' $'),
  createData('Weekly (discount - %)', 'weekly', 7 + ' $', 120 + ' $'),
  createData('Monthly (discount - %%)', 'monthly', 6 + ' $', 112 + ' $'),
  createData('Annually (discount - %%%)', 'annually', 5 + ' $', 100 + ' $'),
];


function TimeAndBillingTab() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [checkedEndDate, setCheckedEndDate] = useState(false)
  const [selectedBilling, setSelectedBilling] = useState('daily')

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container sx={{ width: '100%' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <HeaderText sx={{ mb: 1 }}>Operating time</HeaderText>
        </Grid>
        <Grid item xs={12} lg={2} sx={{ mt: 1 }}>
          <Typography>Start date</Typography>
        </Grid>
        <Grid item xs={12} lg={10}>
          <Box sx={{ ml: '42px' }}>
            <DatePicker
              disablePast
              label="Start date"
              // openTo="year"
              views={['year', 'month', 'day']}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <StyledTextField size='small' {...params} />}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={2} sx={{ mt: 1 }}>
          <Typography>End date (optional)</Typography>
        </Grid>
        <Grid item xs={12} lg={10}>
          <FormControlLabel sx={{ m: 0 }} control={
            <Checkbox icon={<CheckBoxOutlineBlankSharpIcon />} checkedIcon={<CheckBoxSharpIcon />} style={{ color: 'black' }} sx={{ borderRadius: 0 }}
              checked={checkedEndDate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCheckedEndDate(event.target.checked);
              }}
            />
          } label="" />
          <DatePicker
            disabled={!checkedEndDate}
            disablePast
            label="End date"
            // openTo="year"
            views={['year', 'month', 'day']}
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <StyledTextField size='small' {...params} />}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 6 }}>
          <HeaderText sx={{ mb: 1 }}>Billing</HeaderText>
        </Grid>
        <Grid item xs={12} lg={2}>
          <Typography>Select payment type</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TableContainer>
            <Table sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none"
              }
            }} size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="right">Per week</StyledTableCell>
                  <StyledTableCell align="right" sx={{color: checkedEndDate ? 'black' : 'white'}}>Full payment</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    onClick={() => setSelectedBilling(row.value)}
                    key={row.value}
                    sx={{
                      // backgroundColor: selectedBilling === row.name ? 'black' : 'white',
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell sx={{ p: 0 }}>
                      <Radio
                        style={{ color: 'black' }}
                        checked={selectedBilling === row.value}
                        onChange={() => setSelectedBilling(row.value)}
                        size='small'
                        value={row.value}
                      />
                    </TableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.first}</StyledTableCell>
                    <StyledTableCell align="right" sx={{color: checkedEndDate ? 'black' : 'white'}}>{row.second}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              density='compact'
              disableSelectionOnClick
              disableColumnSelector
              hideFooterPagination
            />
          </div> */}
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default React.memo(TimeAndBillingTab)