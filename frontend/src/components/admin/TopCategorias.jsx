import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function TopCategorias({ listado }) {
  const categorias = listado.map((item) => item.categoria);
  const carrosData = listado.map((item) => item.total_carros);
  const rentasData = listado.map((item) => item.total_rentas);
  const ingresosData = listado.map((item) => item.total_ingresos);

  const carrosDataChart = {
    labels: categorias,
    datasets: [
      {
        label: 'Cantidad de carros',
        data: carrosData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const carrosOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : '';
          },
        },
      },
    },
  };

  const rentasDataChart = {
    labels: categorias,
    datasets: [
      {
        label: 'Cantidad de rentas',
        data: rentasData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const rentasOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : '';
          },
        },
      },
    },
  };

  const ingresosChart = {
    labels: categorias,
    datasets: [
      {
        label: 'Ingresos totales',
        data: ingresosData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8 mt-12">
      <div className="border-1 p-4 rounded-xl border-gray-400">
        <h2>Cantidad de carros por categoría</h2>
        <Bar data={carrosDataChart} options={carrosOptions} />
      </div>

      <div className="border-1 p-4 rounded-xl border-gray-400">
        <h2>Cantidad de rentas por categoría</h2>
        <Bar data={rentasDataChart} options={rentasOptions} />
      </div>

      <div className="border-1 p-4 rounded-xl border-gray-400">
        <h2>Ingresos totales por categoría</h2>
        <Line data={ingresosChart} />
      </div>
    </div>
  );
}

export default TopCategorias;
