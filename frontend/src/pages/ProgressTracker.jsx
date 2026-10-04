import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, MenuItem, Select } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import cthuluprogress from '../assets/images/ProgressTracking.png';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Demo data
const mockProgress = [
  { date: '01.03.2024', exercise: 'Squat', weight: 55 },
  { date: '15.03.2024', exercise: 'Squat', weight: 62 },
  { date: '23.03.2024', exercise: 'Squat', weight: 74 },
  { date: '01.03.2024', exercise: 'Bench Press', weight: 40 },
  { date: '15.03.2024', exercise: 'Bench Press', weight: 45 },
  { date: '20.03.2024', exercise: 'Bench Press', weight: 72 },
  { date: '01.04.2024', exercise: 'Bench Press', weight: 85 },
  { date: '17.04.2024', exercise: 'Bench Press', weight: 50 },
  { date: '01.03.2024', exercise: 'Deadlift', weight: 80 },
  { date: '20.03.2024', exercise: 'Deadlift', weight: 50 },
  { date: '01.03.2024', exercise: 'LatPullDown', weight: 45 },
  { date: '15.03.2024', exercise: 'LatPullDown', weight: 72.5 },
];
const exercises = [...new Set(mockProgress.map((entry) => entry.exercise))];

const axis = { ticks: { color: '#ffffff' }, grid: { color: '#374151' } };
const options = {
  scales: { y: { ...axis, beginAtZero: true }, x: axis },
  plugins: { legend: { labels: { color: '#ffffff' } } },
};

const ProgressTracker = () => {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const entries = mockProgress.filter((entry) => entry.exercise === selectedExercise);
  const data = {
    labels: entries.map((entry) => entry.date),
    datasets: [
      {
        label: `${selectedExercise} Weight increase (kg)`,
        data: entries.map((entry) => entry.weight),
        borderColor: 'rgba(94, 234, 212, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-auto bg-linear-to-br from-black to-blue-950 pt-20">
      <div className="flex flex-row justify-center">
        <h2 className="font-cthulhumbus cursor-default bg-linear-to-br from-white to-gray-400 bg-clip-text py-2 text-center text-3xl/tight font-medium text-transparent sm:py-4 md:pt-8 md:text-4xl/10">
          Training progress
        </h2>
      </div>
      <div className="mx-auto mt-2 mb-6 flex size-5/6 items-center justify-center">
        <img src={cthuluprogress} alt="cthulu-progress" />
      </div>
      <Container className="h-full">
        <Select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="mb-6 w-full"
          sx={{ color: '#db2777' }}>
          {exercises.map((exercise) => (
            <MenuItem key={exercise} value={exercise} sx={{ color: '#14b8a6' }}>
              {exercise}
            </MenuItem>
          ))}
        </Select>
        <Line data={data} options={options} />
      </Container>
    </div>
  );
};

export default ProgressTracker;
