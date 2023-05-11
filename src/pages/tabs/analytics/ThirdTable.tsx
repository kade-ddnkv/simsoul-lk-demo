import { HeaderText, StyledButton, StyledSlider, StyledTableCell } from "@/components/generalComponents"
import { Box, Paper, Table, TableHead, TableRow, TableBody, TableCell, Typography } from '@mui/material'

const topTenDevices = [
  {
    imsi: '999 999 000 000 001',
    imei: '99 888888 000000 1',
    trafficVolume: '120 GiB',
    trafficPeak: '0,7 Gbps',
    networkLatency: '1,2 ms',
    lastLocationChange: <>
      <Typography>7638827009,</Typography>
      <Typography>44.8125° N, 20.4612° E</Typography>
      <Typography>2023.03.01 08:12:00</Typography>
    </>,
    lastActiveState: '2023.03.19 20:18:31',
  },
  {
    imsi: '555 555 111 222 333',
    imei: '11 222222 333333 4',
    trafficVolume: '65 GiB',
    trafficPeak: '1,2 Gbps',
    networkLatency: '4,7 ms',
    lastLocationChange: <>
      <Typography>6178209472,</Typography>
      <Typography>37.7749° N, 122.4194° W</Typography>
      <Typography>2023.05.01 13:22:12</Typography>
    </>,
    lastActiveState: '2023.05.10 08:01:54',
  },
  {
    imsi: '888 777 333 444 555',
    imei: '33 444444 555555 2',
    trafficVolume: '235 GiB',
    trafficPeak: '3,1 Gbps',
    networkLatency: '2,1 ms',
    lastLocationChange: <>
      <Typography>9173820465,</Typography>
      <Typography>51.5074° N, 0.1278° W</Typography>
      <Typography>2023.04.23 19:44:08</Typography>
    </>,
    lastActiveState: '2023.05.11 10:12:27',
  },
  {
    imsi: '222 111 777 888 999',
    imei: '88 999999 000000 5',
    trafficVolume: '10 GiB',
    trafficPeak: '0,5 Gbps',
    networkLatency: '8,4 ms',
    lastLocationChange: <>
      <Typography>4939812834,</Typography>
      <Typography>52.3702° N, 4.8952° E</Typography>
      <Typography>2023.05.08 07:57:56</Typography>
    </>,
    lastActiveState: '2023.05.10 23:18:41',
  },
  {
    imsi: '444 333 999 888 777',
    imei: '77 888888 999999 9',
    trafficVolume: '520 GiB',
    trafficPeak: '2,6 Gbps',
    networkLatency: '5,2 ms',
    lastLocationChange: <>
      <Typography>6202938402,</Typography>
      <Typography>-33.8688° S, 151.2093° E</Typography>
      <Typography>2023.05.05 16:39:10</Typography>
    </>,
    lastActiveState: '2023.05.11 03:20:12',
  },
  {
    imsi: '111 222 444 555 666',
    imei: '55 666666 777777 3',
    trafficVolume: '90 GiB',
    trafficPeak: '1,1 Gbps',
    networkLatency: '3,9 ms',
    lastLocationChange: <>
      <Typography>3259817432,</Typography>
      <Typography>48.8566° N, 2.3522° E</Typography>
      <Typography>2023.05.03 12:18:23</Typography>
    </>,
    lastActiveState: '2023.05.10 18:59:08',
  },
  {
    imsi: '222 333 444 555 666',
    imei: '66 777777 888888 0',
    trafficVolume: '185 GiB',
    trafficPeak: '1,8 Gbps',
    networkLatency: '6,5 ms',
    lastLocationChange: <>
      <Typography>5293881793,</Typography>
      <Typography>-26.2041° S, 28.0473° E</Typography>
      <Typography>2023.05.09 21:01:32</Typography>
    </>,
    lastActiveState: '2023.05.11 14:30:47',
  },
  {
    imsi: '888 777 666 555 444',
    imei: '44 555555 666666 6',
    trafficVolume: '310 GiB',
    trafficPeak: '2,5 Gbps',
    networkLatency: '4,2 ms',
    lastLocationChange: <>
      <Typography>7362910485,</Typography>
      <Typography>34.0522° N, 118.2437° W</Typography>
      <Typography>2023.05.02 17:50:14</Typography>
    </>,
    lastActiveState: '2023.05.11 09:15:29',
  },
  {
    imsi: '333 444 555 666 777',
    imei: '77 888888 999999 8',
    trafficVolume: '95 GiB',
    trafficPeak: '1,3 Gbps',
    networkLatency: '7,9 ms',
    lastLocationChange: <>
      <Typography>8193425067,</Typography>
      <Typography>40.7128° N, 74.0060° W</Typography>
      <Typography>2023.05.04 11:34:09</Typography>
    </>,
    lastActiveState: '2023.05.11 01:02:44',
  },
  {
    imsi: '444 555 666 777 888',
    imei: '88 999999 000000 3',
    trafficVolume: '400 GiB',
    trafficPeak: '3,2 Gbps',
    networkLatency: '2,8 ms',
    lastLocationChange: <>
      <Typography>2467138954,</Typography>
      <Typography>35.6895° N, 139.6917° E</Typography>
      <Typography>2023.05.06 09:12:52</Typography>
    </>,
    lastActiveState: '2023.05.11 06:43:17',
  },
]

const marksX = [
  {
    value: 0,
    label: '1 hour',
  },
  {
    value: 20,
    label: '1 day',
  },
  {
    value: 40,
    label: '1 week',
  },
  {
    value: 60,
    label: '10 days',
  },
  {
    value: 80,
    label: '1 month',
  },
  {
    value: 100,
    label: '1 year',
  },
];

function ThirdTable() {
  let index = 1

  return (
    <Box sx={{ mt: 10, mb: 8 }}>
      <HeaderText>Top 10 most active devices</HeaderText>
      <Paper sx={{ mt: 2, mx: 'auto', borderRadius: 0, borderBottom: 0 }} variant='outlined' elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="center">IMSI</StyledTableCell>
              <StyledTableCell align="center">IMEI</StyledTableCell>
              <StyledTableCell align="center">Traffic volume</StyledTableCell>
              <StyledTableCell align="center">Traffic peak
                <Box sx={{ fontWeight: 'normal' }}>(average per 5 second)</Box>
              </StyledTableCell>
              <StyledTableCell align="center">Network latency
                <Box sx={{ fontWeight: 'normal' }}>(UPF to device)</Box>
              </StyledTableCell>
              <StyledTableCell align="center">Last location change
                <Box sx={{ fontWeight: 'normal' }}>(NCGI, geo, gmt date/time)</Box>
              </StyledTableCell>
              <StyledTableCell align="center">Last active state
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
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <StyledSlider
          sx={{
            width: 300, mt: 1, ml: 3,
          }}
          size='small'
          defaultValue={60}
          valueLabelDisplay="off"
          step={null}
          marks={marksX}
          track={false}
        />
        <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography>Report from 2023.03.13 to 2023.03.19</Typography>
          <StyledButton sx={{ ml: 2 }} variant='outlined'>Change dates</StyledButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ThirdTable
