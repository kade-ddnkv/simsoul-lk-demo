import React from 'react'
import {
  Chart as ChartJS,
} from 'chart.js';
import FirstChart from './analytics/FirstChart';
import SecondChart from './analytics/SecondChart';
import ThirdTable from './analytics/ThirdTable';

function AnalyticsFirstTab() {
  // ChartJS.defaults.backgroundColor = '#ffffff';
  // ChartJS.defaults.borderColor = '#000';
  // ChartJS.defaults.color = '#000';

  return (
    <>
      <FirstChart />
      <SecondChart />
      <ThirdTable />
    </>
  )
}

export default React.memo(AnalyticsFirstTab)