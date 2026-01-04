import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { helpHttp } from '../../helpers/helperHttp';
import { Users, Cog, Fuel } from 'lucide-react';

function CardCarros({ filtros }) {
  const [carros, setCarros] = useState([]);
  const navigate = useNavigate();
  const { marca, tipo, capacidad } = filtros;

  const carrosFiltrados = useMemo(() => {
    if (!carros || carros.length === 0) return [];

    return carros.filter((carro) => {
      // marca
      if (
        marca &&
        carro.id_marca &&
        carro.id_marca.toString().toLowerCase() !== marca.toLowerCase()
      )
        return false;

      // tipo: puede venir como id_categoria o campo tipo según tu API
      if (tipo) {
        const campoTipo = (carro.id_categoria || carro.tipo || '')
          .toString()
          .toLowerCase();
        if (campoTipo !== tipo.toLowerCase()) return false;
      }

      // capacidad
      if (capacidad && carro.capacidad) {
        // Si la capacidad seleccionada es "5", filtra todos los >= 5
        if (capacidad.toString() === '5') {
          if (parseInt(carro.capacidad) < 5) return false;
        }
        // Si es otra capacidad, compara exacto
        else if (carro.capacidad.toString() !== capacidad.toString()) {
          return false;
        }
      }

      return true;
    });
  }, [carros, marca, tipo, capacidad]);

  useEffect(() => {
    const listarCarros = async () => {
      try {
        const api = helpHttp();
        const respuesta = await api.get('cliente/carros');

        if (!respuesta.err) {
          setCarros(respuesta);
        }
      } catch (error) {
        console.error('error al obtener los carros;', error);
      }
    };

    listarCarros();
  }, []);

  const irDetalle = (id_carro) => {
    localStorage.setItem('carroSeleccionado', JSON.stringify(id_carro));
    navigate('/carros/detalle', { state: { id_carro } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-12 gap-16 md:mx-16 cursor-pointer">
      {carrosFiltrados.length > 0 ? (
        carrosFiltrados.map((carro) => (
          <div
            key={carro.id_carro}
            onClick={() => irDetalle(carro.id_carro)}
            className="bg-white rounded-xl shadow-xl hover:shadow-2xl"
          >
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={`http://localhost:3000/uploads/${carro.foto}`}
                alt={carro.nombre}
                className="w-full h-60 object-cover object-center transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div className="flex justify-between items-center m-3">
              <h1 className="font-medium text-xl uppercase">{carro.nombre}</h1>
              <p className="font-medium">{carro.ano}</p>
            </div>

            <div className="relative bg-[#EAEAEA] m-3 w-fit rounded-lg px-2">
              <p className="">{carro.id_categoria}</p>
            </div>

            <div className="flex justify-between items-center mx-3 my-4">
              <div className="flex gap-2">
                <Users className="text-[#6C7F86]" />
                <p className="text-[#6C7F86]">{carro.capacidad}</p>
              </div>

              <div className="flex gap-2">
                <div className="flex gap-2">
                  <Cog className="text-[#6C7F86]" />
                  <p className="text-[#6C7F86]">{carro.transmision}</p>
                </div>

                <div className="flex gap-2">
                  <Fuel className="text-[#6C7F86]" />
                  <p className="text-[#6C7F86]">{carro.combustible}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 mx-3 mb-3">
              <h1 className="text-xl font-medium">${carro.tarifa}/dia</h1>

              <button className="bg-[#6589FF] px-4 py-1  text-white rounded-lg font-medium hover:shadow-xl cursor-pointer">
                Reservar ahora
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center">
          <h2>No hay carros disponibles...</h2>
        </div>
      )}
    </div>
  );
}

export default CardCarros;
