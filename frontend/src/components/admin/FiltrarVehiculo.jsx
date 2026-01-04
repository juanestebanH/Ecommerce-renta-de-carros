import { Search } from 'lucide-react';
import { useState } from 'react';
import { marcas } from '../../helpers/marcas';

import { useEffect } from 'react';

function FiltrarVehiculo({ filtrosChange }) {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [marcasList, setMarcasList] = useState([]);

  const [tipo, setTipo] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [estado, setEstado] = useState('');
  const [search, setSearch] = useState('');

  const obtenerMarcas = async () => {
    const respuesta = await marcas();
    if (respuesta) {
      setMarcasList(respuesta.data);
    } else {
      setMarcasList([]);
    }
  };
  useEffect(() => {
    obtenerMarcas();
  }, []);

  const limpiarFiltro = () => {
    const nuevos = {
      marca: '',
      tipo: '',
      capacidad: '',
      estado: '',
      search: '',
    };
    setMarcaSeleccionada('');
    setTipo('');
    setCapacidad('');
    setEstado('');
    setSearch('');
    filtrosChange(nuevos);
  };

  // funcion para aplicar filtros (por implementar)
  const actualizarFiltros = (datosNuevos) => {
    // Lógica para actualizar los filtros en el componente padre o en el estado global
    const filtros = {
      marca: marcaSeleccionada,
      tipo,
      capacidad,
      estado,
      search,
      ...datosNuevos,
    };
    filtrosChange(filtros);
  };

  return (
    <div className="border-[#6B7280] border-1 p-4 rounded-xl mt-8 bg-white ">
      <div className="flex justify-between items-center">
        <h2>Filtrar Vehiculos</h2>
        <button
          onClick={limpiarFiltro}
          className="border-[#B2B2B2] border-1 py-1 px-4 rounded-xl text-sm cursor-pointer"
        >
          Limpiar Filtro
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div>
          <p className="text-[#6B7280] text-sm">Marca</p>

          <select
            className="bg-[#F4F4F7]  text-[#1D1D1D] text-sm p-2 rounded-lg w-full"
            name="marca"
            id="marca"
            value={marcaSeleccionada}
            onChange={(e) => {
              setMarcaSeleccionada(e.target.value);
              actualizarFiltros({ marca: e.target.value });
            }}
          >
            <option value="">Todas las marcas</option>
            {marcasList &&
              marcasList.map((marca) => (
                <option
                  key={marca.id_marca || marca.nombre}
                  value={marca.nombre}
                >
                  {marca.nombre}
                </option>
              ))}
          </select>
        </div>
        <div>
          <p className="text-[#6B7280] text-sm">Tipo de vehiculo</p>
          <select
            className="bg-[#F4F4F7]  text-[#1D1D1D] text-sm p-2 rounded-lg w-full"
            name="tipo"
            id="tipo"
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
              actualizarFiltros({ tipo: e.target.value });
            }}
          >
            <option value="">Todos los tipos</option>
            <option value="cars">Cars</option>
            <option value="suvs">Suvs</option>
            <option value="vans">Vans</option>
            <option value="electric">Electric</option>
          </select>
        </div>
        <div>
          <p className="text-[#6B7280] text-sm">Capacidad</p>
          <select
            className="bg-[#F4F4F7]  text-[#1D1D1D] text-sm p-2 rounded-lg w-full"
            name="capacidad"
            id="capacidad"
            value={capacidad}
            onChange={(e) => {
              setCapacidad(e.target.value);
              actualizarFiltros({ capacidad: e.target.value });
            }}
          >
            <option value="">Todas las capacidades</option>
            <option value="2">2 personas</option>
            <option value="4">4 personas</option>
            <option value="5">5 personas o mas</option>
          </select>
        </div>
        <div>
          <p className="text-[#6B7280] text-sm">Estado</p>
          <select
            className="bg-[#F4F4F7]  text-[#1D1D1D] text-sm p-2 rounded-lg w-full"
            name="estado"
            id="estado"
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
              actualizarFiltros({ estado: e.target.value });
            }}
          >
            <option value="">Todos los estados</option>
            <option value="disponible">Disponible</option>
            <option value="renta">En renta</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6 bg-[#F4F4F7] rounded-lg gap-2 px-2">
        <Search className="text-[#6B7280]" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            actualizarFiltros({ search: e.target.value });
          }}
          type="text"
          placeholder="Buscar por placa"
          className="p-2 rounded-lg w-full focus:outline-none"
        />
      </div>
    </div>
  );
}

export default FiltrarVehiculo;
