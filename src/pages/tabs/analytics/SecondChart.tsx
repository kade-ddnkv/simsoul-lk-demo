import React, { useRef } from 'react'
import { useTheme, Box } from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { StyledSlider, StyledVerticalSlider } from '@/components/generalComponents';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const generateLabels = () => {
  let count = 10
  let day = dayjs().subtract(count - 1, 'day')
  let labels = []
  for (let i = 0; i < count; i++) {
    labels.push(day.format('D MMM'))
    day = day.add(1, 'day')
  }
  return labels
}
const labels = generateLabels()

const generateData = () => {
  return labels.map(() => faker.datatype.number({ min: 0, max: 1024 * 1024 * 1024 * 40 }))
}

const title = 'Total amount of traffic inside the slice'

export const data = {
  labels,
  datasets: [
    {
      label: title,
      data: generateData(),
      borderColor: 'black',
      backgroundColor: 'white',
    },
  ],
};

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

const marksY = [
  {
    value: 1024 * 1024 * 10, // in bytes
    label: '10 Mib',
  },
  {
    value: 1024 * 1024 * 1024 * 1024 * 20, // in bytes
    label: '20 TiB',
  },
];

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function SecondChart() {
  const chartRef = useRef<ChartJS<"line", number[], string>>(null)
  const theme = useTheme()

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
        labels: {
          font: {
            family: theme.typography.fontFamily,
            size: 14,
          }
        }
      },
      title: {
        display: true,
        text: title,
        color: 'black',
        font: {
          family: theme.typography.fontFamily,
          size: 19.2,
        },
        align: 'start',
        padding: {
          bottom: 20
        },
      },
      tooltip: {
        cornerRadius: 0
      }
    },
    scales: {
      x: {
        // grid: {
        //   color: 'rgba(0,0,0,0.1)'
        // }
      },
      y: {
        min: 0,
        max: 1024 * 1024 * 1024 * 50,
        ticks: {
          callback: function (value, index, ticks) {
            return formatBytes(value);
          }
        }
        // grid: {
        //   color: 'rgba(0,0,0,0.1)'
        // }
      },
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mb: 8 }}>
      <StyledVerticalSlider
        sx={{
          height: '200px', mt: 5,
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        orientation='vertical'
        size='small'
        defaultValue={1024 * 1024 * 1024 * 50}
        valueLabelDisplay="off"
        step={1024}
        min={1024 * 1024 * 10}
        max={1024 * 1024 * 1024 * 1024 * 20}
        marks={marksY}
        track={false}
      />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Box sx={{ height: '250px', width: '80%' }}>
          <Line ref={chartRef} options={options} data={data} />
        </Box>
        <StyledSlider
          sx={{
            width: 300, mt: 1, ml: 7,
          }}
          size='small'
          defaultValue={60}
          valueLabelDisplay="off"
          step={null}
          marks={marksX}
          track={false}
        />
      </Box>
    </Box>
  )
}

export default SecondChart
