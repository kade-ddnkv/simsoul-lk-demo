import React, { useState } from 'react'
import { Chart } from 'react-google-charts'
import { Box, useTheme } from '@mui/material'

function AnalyticsFirstTab() {
  console.log('rendered')
  const [loaded, setLoaded] = useState(false)
  const theme = useTheme()

  const data = [
    [
      "Day",
      "Number of active devices on the network",
    ],
    [1, 37.8],
    [2, 30.9],
    [3, 25.4],
    [4, 11.7],
    [5, 11.9],
    [6, 8.8],
    [7, 7.6],
    [8, 12.3],
    [9, 16.9],
    [10, 12.8],
    [11, 5.3],
    [12, 6.6],
    [13, 4.8],
    [14, 4.2],
  ];

  const options = {
    chart: {
      title: "Number of active devices on network",
      subtitle: "in thousands of devices (1000)",
    },
    legend: {
      position: 'none'
    },
    vAxis: {
      viewWindow: {
        min: 100,
        max: 150
      }
    }
    // vAxis: {
    //   title: 'Hours',
    //   ticks: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
    // }
    // hAxis: {
    //   titleTextStyle: {
    //     fontName: 'Inter'
    //   }
    // }
  };

  return (
    <Box sx={{ height: '300px', width: '100%' }}>
      <Chart
        chartType='Line'
        width='100%'
        height='100%'
        data={data}
        options={options}
      />
    </Box>
  )
}

export default AnalyticsFirstTab