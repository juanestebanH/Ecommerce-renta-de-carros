import { useState } from 'react';
import FiltrarVehiculo from '../../components/cliente/FiltrarVehiculos';
import CardCarros from '../../components/cliente/CardCarros.jsx';

function CarrosCliente() {
  const [filtros, setFiltros] = useState({
    marca: '',
    tipo: '',
    capacidad: '',
  });

  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  return (
    <section className="p-8 bg-[#F4F4F7] min-h-screen">
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="text-lg font-medium text-center md:text-3xl mt-4">
          Encuentra tu Auto Ideal
        </h1>
        <p className="text-[#6B7280] mt-2 max-w-xl">
          Explora nuestra amplia flota de vehículos disponibles para renta.
          Desde compactos económicos hasta SUVs familiares, tenemos el auto
          perfecto para tu viaje.
        </p>
      </div>

      <FiltrarVehiculo filtrosChange={actualizarFiltros} />
      <CardCarros filtros={filtros} />
    </section>
  );
}

export default CarrosCliente;
