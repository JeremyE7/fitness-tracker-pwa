import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { WeightEntry } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeightChartProps {
  entries: WeightEntry[];
}

const WeightChart = ({ entries }: WeightChartProps) => {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = {
    labels: sortedEntries.map((entry) =>
      format(new Date(entry.date), 'dd MMM', { locale: es })
    ),
    datasets: [
      {
        label: 'Peso (kg)',
        data: sortedEntries.map((entry) => entry.weight),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1a2e1a',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#22c55e',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.parsed.y} kg`
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(34, 197, 94, 0.1)'
        },
        ticks: {
          color: '#9ca3af',
          callback: (value: any) => `${value} kg`
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#9ca3af'
        }
      }
    }
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightChart;