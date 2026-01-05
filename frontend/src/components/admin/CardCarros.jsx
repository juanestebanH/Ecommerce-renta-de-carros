import { useState, useEffect, useMemo } from 'react';
import { helpHttp } from '../../helpers/helperHttp.js';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DetalleCarro from './DetalleCarro.jsx';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

function CardCarros({ filtros }) {
  const [carros, setCarros] = useState([]);
  const { marca, tipo, capacidad, estado, search } = filtros;

  const [carroSeleccionado, setCarroSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    mostrarCarros();
  }, []);

  const desactivarCarro = async (placa) => {
    try {
      const api = helpHttp();
      const respuesta = await api.del('admin/carros', {
        body: { placa },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (respuesta.err) {
        toast.warning('ocurrio un problema, vuelva a intentarlo');
      } else {
        toast.success(respuesta.message);
        mostrarCarros();
      }
    } catch (error) {}
  };

  const alertDesactivar = (placa) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas desactivar el carro con placas ${placa}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va tu acción real
        desactivarCarro(placa);
      }
    });
  };

  const mostrarCarros = async () => {
    try {
      const api = helpHttp();
      const respuesta = await api.get('admin/carros');

      if (!respuesta.err) {
        setCarros(respuesta);
      }
    } catch (error) {
      console.error('Error al obtener los carros:', error);
    }
  };

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

      // estado
      if (
        estado &&
        carro.estado &&
        carro.estado.toLowerCase() !== estado.toLowerCase()
      )
        return false;

      // search: buscar por placa (id_carro) o por nombre
      if (search && search.trim() !== '') {
        const s = search.toLowerCase();
        const placa = (carro.id_carro || carro.placa || '')
          .toString()
          .toLowerCase();
        const nombre = (carro.nombre || '').toLowerCase();
        if (!placa.includes(s) && !nombre.includes(s)) return false;
      }

      return true;
    });
  }, [carros, marca, tipo, capacidad, estado, search]);

  const mostrarDetalle = (carro) => {
    setCarroSeleccionado(carro);
    setModalAbierto(true);
  };

  const cerrarDetalle = () => {
    setCarroSeleccionado(null);
    setModalAbierto(false);
  };

  const irActualizar = (id_carro) => {
    navigate('/admin/carros/actualizar', { state: { id_carro } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-6">
      {carrosFiltrados.length == 0 ? (
        <div className="col-span-3">
          <h2 className="text-center m-15 ">No hay carros disponibles</h2>
        </div>
      ) : (
        carrosFiltrados.map((carro) => {
          return (
            <div
              key={carro.id_carro}
              className="w-full  bg-white  border-2 border-[#B2B2B2] rounded-lg shadow-md"
            >
              <img
                src={carro.foto}
                alt={carro.nombre}
                className="w-full h-60 object-cover object-center mb-4 rounded-t-lg"
              />

              <div className="m-2 grid grid-cols-2 gap-2">
                <div>
                  <h2 className="text-lg font-medium">{carro.nombre}</h2>
                  <p className="text-sm ">{carro.ano}</p>
                </div>

                {carro.estado == 'disponible' ? (
                  <div className=" h-6 bg-[#E3FFE4] text-[#117C00] rounded-lg text-sm text-center flex items-center justify-center">
                    {carro.estado}
                  </div>
                ) : (
                  <div className="h-6 bg-[#C9D8EA] text-[#6589FF] rounded-lg text-sm text-center flex items-center justify-center">
                    {carro.estado}
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-[#6C7F86]">Placa</p>
                  <p className="text-sm font-medium text-[#111111]">
                    {carro.id_carro}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6C7F86]">
                    Combustible
                  </p>
                  <p className="text-sm font-medium text-[#111111]">
                    {carro.combustible}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6C7F86]">
                    Transmicion
                  </p>
                  <p className="text-sm font-medium text-[#111111]">
                    {carro.transmision}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6C7F86]">
                    Capacidad:
                  </p>
                  <p className="text-sm font-medium text-[#111111]">
                    {carro.capacidad}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6C7F86]">
                    Tarifa diarira
                  </p>
                  <p className="text-sm font-medium text-[#111111]">
                    ${carro.tarifa}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#6C7F86]">Tipo:</p>
                  <p className="text-sm font-medium text-[#111111]">
                    {carro.id_categoria}
                  </p>
                </div>
              </div>

              <div className="mx-2 my-4 flex justify-between items-center ">
                <div
                  onClick={() => mostrarDetalle(carro.id_carro)}
                  className="flex items-center border-1 border-[#6B7280] rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-100 transition"
                >
                  <Eye className="text-[#6B7280]" />
                  <p className="text-sm text-[#6B7280]">Ver</p>
                </div>

                <div className="flex gap-4">
                  {carro.estado == 'disponible' && (
                    <div
                      onClick={() => irActualizar(carro.id_carro)}
                      className="border-1 border-[#6589ff] rounded-lg p-1 cursor-pointer hover:bg-gray-100 transition"
                    >
                      <SquarePen className="text-[#6589FF]" />
                    </div>
                  )}

                  <div
                    onClick={() => alertDesactivar(carro.id_carro)}
                    className="border-1 border-[#6B7280] rounded-lg p-1 cursor-pointer hover:bg-gray-100 transition"
                  >
                    <Trash2 className="text-[#6B7280]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      {modalAbierto && (
        <DetalleCarro carro={carroSeleccionado} onClose={cerrarDetalle} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default CardCarros;
