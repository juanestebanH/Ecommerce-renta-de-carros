import { useState, useEffect } from 'react';
import { Car, Calendar, Users, DollarSign } from 'lucide-react';
import { helpHttp } from '../../helpers/helperHttp.js';

function CardDashboard() {
  const [totalVehiculos, settotalVehiculos] = useState(0);
  const [totalRentas, setRentas] = useState(0);
  const [clientesRegistrados, setClientes] = useState(0);
  const [ingresoMes, setIngresos] = useState(0);

  useEffect(() => {
    const totalCard = async () => {
      try {
        const api = helpHttp();
        const respuesta = await api.get('admin/totaldashboard');

        if (!respuesta.err) {
          settotalVehiculos(respuesta.data.total_carros);
          setRentas(respuesta.data.total_rentas);
          setClientes(respuesta.data.total_clientes);
          setIngresos(respuesta.data.total_ingresos);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    totalCard();
  }, []);

  const cardData = [
    {
      title: 'Total Carros',
      value: totalVehiculos,
      icon: <Car className="w-6 h-6" />,
    },
    {
      title: 'Rentas Activas',
      value: totalRentas,
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: 'Cliente Registrados',
      value: clientesRegistrados,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Ingresos del Mes',
      value: ingresoMes,
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  const fondoIcon = {
    'Total Carros': 'bg-[#E7EDFF]',
    'Rentas Activas': 'bg-[#E3FFE4]',
    'Cliente Registrados': 'bg-[#D9D9D9]',
    'Ingresos del Mes': 'bg-[#FFF3D2]',
  };

  const coloricon = {
    'Total Carros': 'text-[#6589FF]',
    'Rentas Activas': 'text-[#20EE00]',
    'Cliente Registrados': 'text-[#7C6B80]',
    'Ingresos del Mes': 'text-[#FFBB00]',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {cardData.map((card, index) => {
        const icon = fondoIcon[card.title];
        const color = coloricon[card.title];

        return (
          <div
            key={index}
            className="flex items-center bg-white justify-between rounded-xl shadow-lg p-6 border-[#c1c4ca] border-1"
          >
            <div>
              <h3 className="text-sm text-[#6B7280]">{card.title}</h3>
              <h1 className="md:text-3xl text-2xl">{card.value}</h1>
            </div>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${color} ${icon} `}
            >
              {card.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardDashboard;
