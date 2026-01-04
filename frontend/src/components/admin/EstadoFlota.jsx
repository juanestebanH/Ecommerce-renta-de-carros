import { useState, useEffect } from 'react';
import { helpHttp } from '../../helpers/helperHttp';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function EstadoFlota() {
  const [disponible, setDisponible] = useState(0);
  const [rentas, setRentas] = useState(0);

  useEffect(() => {
    const EstadoFlota = async () => {
      try {
        const api = helpHttp();
        const respuesta = await api.get('admin/estadoFlota');

        if (respuesta.err) {
          setDisponible(0);
          setRentas(0);
        } else {
          setDisponible(respuesta.data.disponible);
          setRentas(respuesta.data.rentas);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    EstadoFlota();
  }, []);

  const valores = [disponible, rentas];
  const total = valores.reduce((a, b) => a + b, 0);

  const data = {
    labels: ['Disponibles', 'En Renta'],
    datasets: [
      {
        data: valores,
        backgroundColor: ['#00C49F', '#6495FF'],
        borderWidth: 4,
        cutout: '70%',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0];
            return chart.data.labels.map((label, i) => {
              const value = dataset.data[i];
              const percentage = ((value / total) * 100).toFixed(0);
              return {
                text: `${label}  ${value} (${percentage}%)`,
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: dataset.backgroundColor[i],
                hidden: false,
                index: i,
              };
            });
          },
        },
      },
    },
  };

  return (
    <div className="p-4 border-[#c1c4ca] border-1 rounded-xl shadow-lg bg-white w-auto">
      <h1>Estado de la Flota</h1>
      {disponible == 0 && rentas == 0 ? (
        <div className="text-center text-[#6B7280] py-10  text-2xl mt-8">
          <h1>No hay carros disponibles.</h1>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="h-100 w-100 mt-4">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EstadoFlota;
