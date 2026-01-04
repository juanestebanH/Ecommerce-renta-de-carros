import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import CardRenta from '../../components/admin/CardRenta';
import { useNavigate } from 'react-router-dom';
function Rentas() {
  const [estado, setEstado] = useState('activa');

  const Navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
      Navigate('/admin/login');
    }
  }, [Navigate]);

  const admin = JSON.parse(localStorage.getItem('admin'));
  if (!admin) {
    return null; // O un componente de carga si es necesario
  }
  return (
    <div>
      <h1 className="text-2xl font-medium">Gestión de Rentas</h1>
      <p className="mt-2 text-[#6B7280]">
        Administra todas las rentas de vehículos
      </p>
      <div className="mt-2 flex justify-end">
        <Link
          to={'/admin/rentas/agregar'}
          className="bg-[#6589FF] flex align-center w-full justify-center md:w-42 gap-2 cursor-pointer  text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5577ee] transition"
        >
          <Plus />
          Agregar Renta
        </Link>
      </div>

      <div className="flex justify-center items-center mt-6 bg-[#F4F4F7] rounded-lg gap-2 px-2 border-1 border-[#b8bcc5]">
        <Search className="text-[#6B7280]" />
        <input
          type="text"
          placeholder="Buscar por placa de carro"
          className="p-2 rounded-lg w-full focus:outline-none"
        />
      </div>

      <div className="flex-row md:flex w-full   mt-6 bg-[#E4E4E7] rounded-xl p-1">
        <div
          className={`w-full flex justify-center items-center gap-2 text-center ${
            estado === 'activa' ? 'bg-white' : 'bg-[#E4E4E7]'
          } rounded-xl p-2 hover:bg-gray-100 cursor-pointer`}
          onClick={() => setEstado('activa')}
        >
          <h2 className="text-sm font-medium ">Activas</h2>
        </div>
        <div
          className={`w-full flex justify-center items-center gap-2 text-center ${
            estado === 'completada' ? 'bg-white' : 'bg-[#E4E4E7]'
          } rounded-xl p-2 hover:bg-gray-100 cursor-pointer`}
          onClick={() => setEstado('completada')}
        >
          <h2 className="text-sm font-medium ">Completadas</h2>
        </div>
      </div>

      <CardRenta estado={estado} />
    </div>
  );
}

export default Rentas;
