import React, { useEffect, useState } from 'react';
import { AppActions, useAppDispatch, useAppSelector } from 'store';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, CircularProgress, Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import dayjs, { Dayjs } from 'dayjs';
import { StatisticsTableView } from 'views';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const StatisticsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { lastWeekFoods, thisWeekFoods, averageCalories } = useAppSelector((store) => store.admin);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeekFood = async () => {
      if (selectedDate) {
        console.log("Fetching data...");
        setLoading(true);
        try {
          await dispatch(AppActions.admin.getWeekFoodRequest({ to: selectedDate.toDate() }));
        } catch (e) {
          console.error('Error fetching data:', e);
        }
      }
    };

    fetchWeekFood();
  }, [selectedDate, dispatch]);

  useEffect(() => {
    if (lastWeekFoods || thisWeekFoods || averageCalories) {
      setLoading(false);  // End loading once the data has changed
    }
  }, [lastWeekFoods, thisWeekFoods, averageCalories]);

  const foodComparisonData = {
    labels: ['Last Week', 'This Week'],
    datasets: [
      {
        label: 'Number of Foods',
        data: [lastWeekFoods, thisWeekFoods],
        backgroundColor: ['#3b82f6', '#f97316'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newDate: Dayjs | null) => setSelectedDate(newDate)}
          renderInput={(params: any) => <TextField {...params} />}
        />

        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={3}>
            <CircularProgress />
            <Typography variant="body1" style={{ marginTop: '10px' }}>Loading...</Typography>
          </Box>
        ) : (
          <>
            {/* Food Comparison Chart */}
            <Typography variant="h6" gutterBottom>
              Food Comparison
            </Typography>
            <Box height={300} mt={3}>
              <Bar data={foodComparisonData} options={chartOptions} />
            </Box>

            {/* Average Calories Per User Table with Pagination */}
            <Typography variant="h6" gutterBottom mt={4}>
              Average Calories Per User
            </Typography>
            <StatisticsTableView data={averageCalories} />
          </>
        )}
      </div>
    </LocalizationProvider>
  );
};