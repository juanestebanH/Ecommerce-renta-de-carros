import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import FiltrarVehiculo from '../../components/admin/FiltrarVehiculo';
import { Link } from 'react-router-dom';
import CardCarros from '../../components/admin/CardCarros';
import { useNavigate } from 'react-router-dom';
function Carros() {
  const [filtros, setFiltros] = useState({
    marca: '',
    tipo: '',
    capacidad: '',
    estado: '',
    search: '',
  });
  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

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
      <h1 className="text-2xl font-medium">Gestión de Carros</h1>
      <p className="mt-2 text-[#6B7280]">Administra tu flota de vehículos</p>
      <div className="mt-2 flex justify-end">
        <Link
          to={'/admin/carros/agregar'}
          className="bg-[#6589FF] flex align-center w-full justify-center md:w-42 gap-2 cursor-pointer  text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5577ee] transition"
        >
          <Plus />
          Agregar Carro
        </Link>
      </div>
      <FiltrarVehiculo filtrosChange={actualizarFiltros} />

      <CardCarros filtros={filtros} />
    </div>
  );
}

export default Carros;
