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
  return labels.map(() => faker.datatype.number({ min: 0, max: 3000 }))
}

const title = 'Number of active device inside the slice'

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
    value: 1000,
    label: '1,000',
  },
  {
    value: 20000,
    label: '20,000',
  },
];

function FirstChart() {
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
        max: 10000,
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
        defaultValue={10000}
        valueLabelDisplay="off"
        step={1000}
        min={1000}
        max={20000}
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

export default FirstChart
