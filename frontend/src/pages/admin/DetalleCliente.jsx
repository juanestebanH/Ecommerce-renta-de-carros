import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Volver from '../../components/admin/Volver';
import { helpHttp } from '../../helpers/helperHttp.js';
import { User, Mail, Phone, FileMinus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function DetalleCliente() {
  const [estado, setEstado] = useState('general');
  const [rentasCliente, setRentasCliente] = useState([]);
  const location = useLocation();
  const cliente = location.state;
  const Navigate = useNavigate();

  const rentaCliente = async () => {
    try {
      const api = helpHttp();
      const respuesta = await api.get(
        `admin/clientes/${cliente.datosCliente.id_cliente}`
      );

      if (!respuesta.err) {
        setRentasCliente(respuesta);
        console.log(respuesta);
      }
    } catch (error) {}
  };

  useEffect(() => {
    rentaCliente();
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
      Navigate('/admin/login');
    }
  }, []);

  return (
    <div>
      <div className="flex gap-4 items-center mb-8">
        <Volver to={'/admin/clientes'} />
        <div>
          <h1 className="text-2xl font-medium">Detalle de Cliente</h1>
          <p className="mt-2 text-[#6B7280]">
            Información detallada del cliente
          </p>
        </div>
      </div>

      <div className="flex-row md:flex  mt-6 bg-[#E4E4E7] rounded-xl p-1">
        <div
          className={`w-full flex justify-center items-center gap-2 text-center ${
            estado === 'general' ? 'bg-white' : 'bg-[#E4E4E7]'
          } rounded-xl p-2 hover:bg-gray-100 cursor-pointer`}
          onClick={() => setEstado('general')}
        >
          <h2 className="text-sm font-medium ">General</h2>
        </div>
        <div
          className={`w-full flex justify-center items-center gap-2 text-center ${
            estado === 'historial' ? 'bg-white' : 'bg-[#E4E4E7]'
          } rounded-xl p-2 hover:bg-gray-100 cursor-pointer`}
          onClick={() => setEstado('historial')}
        >
          <h2 className="text-sm font-medium ">Historial de Rentas</h2>
        </div>
      </div>

      <div>
        {estado === 'general' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
            <div className="p-4 border-1 rounded-xl">
              <div className="flex gap-2 mb-4">
                <User className="text-[#6589FF]" />
                <p>Informacion cliente</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <p className="text-[#6B7280]">Nombre Completo</p>
                  <p>
                    {cliente.datosCliente.nombres}{' '}
                    {cliente.datosCliente.apellidos}
                  </p>
                </div>
                <div>
                  <p className="text-[#6B7280]">Fecha Nacimiento</p>
                  <p>{cliente.datosCliente.fecha_nacimiento}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Mail />
                <p>{cliente.datosCliente.email}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Phone />
                <p>{cliente.datosCliente.telefono}</p>
              </div>
            </div>

            <div className="p-4 border-1 rounded-xl">
              <div className="flex gap-2 mb-4">
                <FileMinus className="text-[#6589FF]" />
                <p>Informacion Conducion</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[#6B7280]">Numero licencia</p>
                  <p>{cliente.datosCliente.numero_licencia}</p>
                </div>
                <div>
                  <p className="text-[#6B7280]">Pais emision</p>
                  <p>{cliente.datosCliente.pais_emision}</p>
                </div>

                <div>
                  <p className="text-[#6B7280]">Fecha vencimiento</p>
                  <p>{cliente.datosCliente.fecha_vencimiento}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg  mt-4">Historial de Rentas</h2>

            <div>
              {rentasCliente.length === 0 ? (
                <p className="mt-4">
                  No hay rentas registradas para este cliente.
                </p>
              ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rentasCliente.map((renta) => (
                    <div
                      key={renta.id_renta}
                      className="border-1 p-4 rounded-xl mb-4"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p>
                            {renta.carro} - {renta.id_renta}
                          </p>
                          <p className="text-[#6B7280]">
                            {' '}
                            {new Date(renta.fecha_inicio).toLocaleDateString(
                              'es-ES',
                              {
                                day: 'numeric',
                                month: 'long',
                              }
                            )}{' '}
                            -{' '}
                            {new Date(renta.fecha_fin).toLocaleDateString(
                              'es-ES',
                              {
                                day: 'numeric',
                                month: 'long',
                              }
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="font-bold">$ {renta.total_pago}</p>
                          <p className="text-sm text-[#6589FF]">
                            {renta.estado}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetalleCliente;
