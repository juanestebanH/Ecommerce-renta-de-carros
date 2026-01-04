import { useState } from 'react';
import CardReservas from '../../components/cliente/cardReservas';
import { Clock3, Calendar } from 'lucide-react';

function ReservasCliente() {
  const [estado, setEstado] = useState('activa');
  return (
    <div className="min-h-screen w-full bg-[#F4F4F7] p-8 flex flex-col items-center ">
      <h1 className="text-lg font-medium text-center md:text-3xl mt-4">
        Mis Reservas
      </h1>
      <p className="text-[#6B7280] mt-2 ">
        Bienvenido de vuelta, Aquí puedes ver todas tus reservas de vehículos
      </p>

      <div className="flex-row md:flex w-full md:w-3/4  mt-6 bg-[#E4E4E7] rounded-xl p-1">
        <div
          className={`w-full flex justify-center items-center gap-2 text-center ${
            estado === 'activa' ? 'bg-white' : 'bg-[#E4E4E7]'
          } rounded-xl p-2 hover:bg-gray-100 cursor-pointer`}
          onClick={() => setEstado('activa')}
        >
          <Clock3 />
          <h2 className="text-sm font-medium ">Activas</h2>
        </div>
        <div
          className={`w-full flex justify-center items-center gap-2 text-center ${
            estado === 'completada' ? 'bg-white' : 'bg-[#E4E4E7]'
          } rounded-xl p-2 hover:bg-gray-100 cursor-pointer`}
          onClick={() => setEstado('completada')}
        >
          <Calendar />
          <h2 className="text-sm font-medium ">Completadas</h2>
        </div>
      </div>

      <CardReservas estado={estado} />
    </div>
  );
}

export default ReservasCliente;
