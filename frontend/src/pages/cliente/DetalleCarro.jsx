import { useLocation } from 'react-router-dom';
import Volver from '../../components/cliente/Volver';
import { useEffect, useState } from 'react';
import { helpHttp } from '../../helpers/helperHttp';
import { CircleCheck, Shield } from 'lucide-react';
import CalcularRenta from '../../components/cliente/CalcularRenta';

function DetalleCarro() {
  const [Detalle, setDetalle] = useState([]);
  const location = useLocation();
  const [estado, setEstado] = useState('especificaciones');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [seguridad, setSeguridad] = useState([]);
  const [especificaciones, setEspecificaciones] = useState([]);
  let carro = location.state?.id_carro;

  if (!carro) {
    carro = JSON.parse(localStorage.getItem('carroSeleccionado'));
  }

  const DetalleCarro = async () => {
    try {
      const api = helpHttp();
      const respuesta = await api.get('cliente/carros/' + carro);

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
    } catch (error) {}
  };

  useEffect(() => {
    DetalleCarro();
  }, []);

  const clickButton = (valor) => {
    setEstado(valor);
  };

  return (
    <section>
      <Volver ruta="/carros" title="carros" />
      <div className="p-8 bg-[#F4F4F7] min-h-screen ">
        <div className="flex flex-col md:flex-row justify-center gap-4 items-start">
          <div className="w-full md:w-1/2 ">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between">
                <h1 className="text-xl uppercase">{Detalle.nombre}</h1>
                <div>
                  <h1 className="font-bold text-xl">${Detalle.tarifa}</h1>
                  <p className="text-[#6B7280]">Por dia</p>
                </div>
              </div>
              <div>
                <h3>{Detalle.id_categoria}</h3>
                <h3 className="bg-[#E4E4E7] w-fit px-1 rounded-xl mt-1">
                  {Detalle.ano}
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 mt-6">
              <img
                src={`http://localhost:3000/uploads/${Detalle.foto}`}
                alt={Detalle.nombre}
                className="w-full h-60 object-contain object-center rounded-xl"
              />
            </div>

            <div className="flex-row md:flex w-full  mt-6 bg-[#E4E4E7] rounded-xl p-1">
              <div
                className={`w-full text-center ${
                  estado === 'especificaciones' ? 'bg-white' : 'bg-[#E4E4E7]'
                } rounded-xl p-2 hover:bg-gray-100 cursor-pointer`}
                onClick={() => clickButton('especificaciones')}
              >
                <h2 className="text-sm font-medium ">Especificaciones</h2>
              </div>
              <div
                className={`w-full text-center ${
                  estado === 'caracteristicas' ? 'bg-white' : 'bg-[#E4E4E7]'
                } rounded-xl p-2 hover:bg-gray-100 cursor-pointer`}
                onClick={() => clickButton('caracteristicas')}
              >
                <h2 className="text-sm font-medium ">Características</h2>
              </div>

              <div
                className={`w-full text-center ${
                  estado === 'terminos' ? 'bg-white' : 'bg-[#E4E4E7]'
                } rounded-xl p-2 hover:bg-gray-100 cursor-pointer`}
                onClick={() => clickButton('terminos')}
              >
                <h2 className="text-sm font-medium ">Terminos</h2>
              </div>
            </div>

            <div className="mt-6 mb-6">
              {estado == 'especificaciones' ? (
                <div className="bg-white shadow-xl rounded-xl  p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {especificaciones.map((especificaciones, indez) => (
                    <div key={indez} className="border-b-1 pb-1">
                      <div className="flex justify-between">
                        <p className="text-[#6B7280]">
                          {especificaciones.nombre}:
                        </p>
                        <p>{especificaciones.valor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : estado == 'caracteristicas' ? (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-xl">
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
                  <div className="bg-white rounded-xl p-6 shadow-xl">
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
              ) : (
                <div className="bg-white rounded-xl p-6 shadow-xl">
                  <h1 className="text-xl">Terminos</h1>
                  <div className="mt-6">
                    <h1>Requisitos del Conductor</h1>
                    <ul className="list-disc list-inside mt-2 text-[#6B7280]">
                      <li>Edad mínima: 21 años.</li>
                      <li>Licencia de conducir válida.</li>
                      <li>Tarjeta de crédito a nombre del conductor.</li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <h1>Políticas de Combustible</h1>
                    <ul className="list-disc list-inside mt-2 text-[#6B7280]">
                      <li>El vehículo se entrega con el tanque lleno.</li>
                      <li>Debe devolverse con el tanque lleno.</li>
                      <li>
                        De lo contrario, se aplicará una tarifa de
                        reabastecimiento.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h1>Cancelaciones</h1>
                    <ul className="list-disc list-inside mt-2 text-[#6B7280]">
                      <li>
                        Las cancelaciones realizadas con más de 24 horas de
                        anticipación son gratuitas.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <CalcularRenta tarifa={Detalle.tarifa} nombreCarro={Detalle.nombre} />
        </div>
      </div>
    </section>
  );
}

export default DetalleCarro;
