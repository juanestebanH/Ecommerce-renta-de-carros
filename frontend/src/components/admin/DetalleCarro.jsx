import { useState, useEffect } from 'react';
import { X, CircleCheck, Shield } from 'lucide-react';
import { helpHttp } from '../../helpers/helperHttp';

function DetalleCarro({ carro, onClose }) {
  const [detalle, setDetalle] = useState([]);
  const [estado, setEstado] = useState('especificaciones');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [seguridad, setSeguridad] = useState([]);
  const [especificaciones, setEspecificaciones] = useState([]);

  const obtenerDetalleCarro = async (id_carro) => {
    try {
      const api = helpHttp();
      const respuesta = await api.get(`admin/carros/${id_carro}`);

      if (!respuesta.err) {
        setDetalle(respuesta);

        const especificacionesArray = [
          { nombre: 'Placa', valor: respuesta.id_carro },
          { nombre: 'Tranmision', valor: respuesta.transmision },
          { nombre: 'Capacidad', valor: respuesta.capacidad },
          { nombre: 'Tipo', valor: respuesta.id_categoria },
          { nombre: 'Combustible', valor: respuesta.combustible },
          { nombre: 'Año', valor: respuesta.ano },
          { nombre: 'Marca', valor: respuesta.id_marca },
          { nombre: 'tarifa', valor: respuesta.tarifa },
        ];

        const caracteristicasArray = [
          {
            nombre: 'Aire Acondicionado',
            disponible: respuesta.aire_acondicionado,
          },
          { nombre: 'Bluetooth', disponible: respuesta.bluetooth },
          {
            nombre: 'Cámara Reversa',
            disponible: respuesta.camara_reversa,
          },
          { nombre: 'Frenos ABS', disponible: respuesta.freno_abs },
          {
            nombre: 'Control de estabilidad',
            disponible: respuesta.control_estabilidad,
          },
          { nombre: 'puertos usb', disponible: respuesta.puertos_usb },
          {
            nombre: 'sistema de sonido',
            disponible: respuesta.sistema_sonido,
          },
        ];

        const seguridadArray = [
          {
            nombre: 'Airbags frontales',
            disponible: respuesta.airbags_frontales,
          },
          {
            nombre: 'Airbags Laterales',
            disponible: respuesta.airbags_laterales,
          },
          {
            nombre: 'sistema frenos abs',
            disponible: respuesta.sistema_frenos_abs,
          },
          {
            nombre: 'alarma antirrobo',
            disponible: respuesta.alarma_antirrobo,
          },
          { nombre: 'luces led', disponible: respuesta.luces_led },

          { nombre: 'seguro', disponible: respuesta.seguro },
        ];

        setEspecificaciones(especificacionesArray);
        setCaracteristicas(caracteristicasArray);
        setSeguridad(seguridadArray);
      }
    } catch (error) {
      console.error('Error al obtener los detalles del carro:', error);
    }
  };

  useEffect(() => {
    if (carro) {
      obtenerDetalleCarro(carro);
    }
  }, [carro]);

  // Si no hay carro seleccionado, no mostrar nada
  if (!carro) return null;

  // funcion para cambiar el color de fondo al hacer hover click en especificaciones o caracteristicas
  const clickButton = (estado) => {
    setEstado(estado);
  };

  return (
    <div className="bg-[#6B7280]/60 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50">
      <div className="bg-white px-8 py-4 rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg ">Detalle del Carro </h2>
          <X onClick={onClose} className="cursor-pointer hover:text-red-500 " />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex justify-center flex-col text-center w-70">
            <h1 className="text-xl font-bold">{detalle.nombre}</h1>
            <h3>{detalle.ano}</h3>
          </div>

          <div>
            <img
              src={`http://localhost:3000/uploads/${detalle.foto}`}
              alt={detalle.nombre}
              className="w-70 h-60 object-cover object-center  rounded-lg"
            />
          </div>
        </div>

        <div className="flex-row md:flex w-full  mt-6 bg-[#E4E4E7] rounded-xl p-1">
          <div
            className={`w-full text-center ${
              estado === 'especificaciones' ? 'bg-white' : 'bg-[#E4E4E7]'
            } rounded-xl p-1 hover:bg-gray-100 cursor-pointer`}
            onClick={() => clickButton('especificaciones')}
          >
            <h2 className="text-sm font-medium ">Especificaciones</h2>
          </div>
          <div
            className={`w-full text-center ${
              estado === 'caracteristicas' ? 'bg-white' : 'bg-[#E4E4E7]'
            } rounded-xl p-1 hover:bg-gray-100 cursor-pointer`}
            onClick={() => clickButton('caracteristicas')}
          >
            <h2 className="text-sm font-medium ">Características</h2>
          </div>
        </div>

        <div>
          {estado == 'especificaciones' ? (
            <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {especificaciones.map((especificaciones, indez) => (
                <div key={indez} className="border-b-1 pb-1">
                  <div className="flex justify-between">
                    <p className="text-[#6B7280]">{especificaciones.nombre}:</p>
                    <p>{especificaciones.valor}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h1>Caracteristicas incluidas</h1>
                <div>
                  {caracteristicas.map(
                    (caracteristica, index) =>
                      caracteristica.disponible && (
                        <div key={index}>
                          <div className="flex items-center gap-2 mt-2">
                            <CircleCheck className="text-emerald-400" />
                            <span className="font-light">
                              {caracteristica.nombre}
                            </span>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
              <div>
                <h1>Seguridad</h1>
                <div>
                  {seguridad.map(
                    (seguridad, index) =>
                      seguridad.disponible && (
                        <div key={index}>
                          <div className="flex items-center gap-2 mt-2">
                            <Shield className="text-indigo-600" />
                            <span className="font-light">
                              {seguridad.nombre}
                            </span>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleCarro;
