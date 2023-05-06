import { HeaderText, StyledTableCell } from "@/components/generalComponents"
import { Box, Paper, Table, TableHead, TableRow, TableBody, TableCell, Typography } from '@mui/material'

const topTenDevices = [
  {
    imsi: '999 999 000 000 001',
    imei: '99 888888 000000 1',
    trafficVolume: '120 GB',
    trafficPeak: '0,7 Gbps',
    networkLatency: '1,2 ms',
    lastLocationChange: <>
      <Typography>7638827009,</Typography>
      <Typography>44.8125° N, 20.4612° E</Typography>
      <Typography>2023.03.01 08:12:00</Typography>
    </>,
    lastActiveState: '2023.03.19 20:18:31',
  },
  {},
  {},
  {},
]

function ThirdTable() {
  let index = 1

  return (
    <Box sx={{ mt: 10, mb: 8 }}>
      <HeaderText>Top 10 list of the most active devices</HeaderText>
      <Paper sx={{ mt: 2, mx: 'auto', borderRadius: 0, borderBottom: 0 }} variant='outlined' elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="right">IMSI</StyledTableCell>
              <StyledTableCell align="right">IMEI</StyledTableCell>
              <StyledTableCell align="right">Traffic volume</StyledTableCell>
              <StyledTableCell align="right">Traffic peak
                <Box sx={{ fontWeight: 'normal' }}>(average per 5 second)</Box>
              </StyledTableCell>
              <StyledTableCell align="right">Network latency
                <Box sx={{ fontWeight: 'normal' }}>(UPF to device)</Box>
              </StyledTableCell>
              <StyledTableCell align="right">Last location change
                <Box sx={{ fontWeight: 'normal' }}>(NCGI, geo, gmt date/time)</Box>
              </StyledTableCell>
              <StyledTableCell align="right">Last active state
                <Box sx={{ fontWeight: 'normal' }}>(GMT date/time)</Box>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topTenDevices.map((device) => (
              <TableRow key={index}>
                <TableCell>{index++}</TableCell>
                <TableCell align="right">{device.imsi}</TableCell>
                <TableCell align="right">{device.imei}</TableCell>
                <TableCell align="right">{device.trafficVolume}</TableCell>
                <TableCell align="right">{device.trafficPeak}</TableCell>
                <TableCell align="right">{device.networkLatency}</TableCell>
                <TableCell align="right">{device.lastLocationChange}</TableCell>
                <TableCell align="right">{device.lastActiveState}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  )
}

export default ThirdTable