import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import Chart from 'chart.js/auto'; // Import the correct Chart.js version

const PostChart = () => {
  const [filterType, setFilterType] = useState('daily'); // Default filter type is set to 'daily'

  // Sample data for demonstration purposes (replace this with your actual data)
  const [data, setData] = useState({
    labels: ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05', '2023-10-06'],
    datasets: [
      {
        label: 'Berlin',
        data: [10, 5, 15, 8, 12, 7], // Number of posts in Berlin on each specific date
        fill: false,
        borderColor: 'rgba(75, 19, 192, 1)',
        borderWidth: 2,
      },
      {
        label: 'Hamburg',
        data: [5, 8, 10, 12, 6, 9], // Number of posts in Hamburg on each specific date
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
      {
        label: 'Munich',
        data: [12, 7, 9, 14, 10, 8], // Number of posts in Munich on each specific date
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
      {
        label: 'Cologne',
        data: [8, 6, 11, 7, 9, 5], // Number of posts in Cologne on each specific date
        fill: false,
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
      },
      {
        label: 'Frankfurt',
        data: [7, 9, 13, 6, 11, 8], // Number of posts in Frankfurt on each specific date
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        label: 'Dusseldorf',
        data: [9, 4, 10, 8, 7, 12], // Number of posts in Dusseldorf on each specific date
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
      },    ],
  });

  const options = {
    scales: {
      x: {
        type: 'category', // Use 'category' scale type for dates
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    // Implement logic to fetch and update data based on the selected filterType
    // Update the data state based on the selected filter type
    // For example, fetch data from the server/API and update the data state accordingly
  };

  return (
    <div  style={{ margin: '0 auto' }}>
      <Typography variant="h3" className="text-center my-2">
        Posts
      </Typography>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="filterType">Filter By:</label>
        <select id="filterType" value={filterType} onChange={handleFilterChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default PostChart;
