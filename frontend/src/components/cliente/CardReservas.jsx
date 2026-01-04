import { useState, useEffect } from 'react';
import { helpHttp } from '../../helpers/helperHttp';
import { Clock2 } from 'lucide-react';
function CardReservas({ estado }) {
  const [listasReservas, setReservas] = useState([]);
  const cliente = JSON.parse(localStorage.getItem('clienteidentificacion'));

  const rentasCliente = async () => {
    const ac = new AbortController();

    try {
      const api = helpHttp();
      const respuesta = await api.get(`cliente/rentas/${cliente}/${estado}`, {
        signal: ac.signal,
      });

      if (!respuesta.err) {
        setReservas(respuesta);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    rentasCliente();
  }, [estado, cliente]);

  return (
    <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {listasReservas.length > 0 ? (
        listasReservas.map((reserva) => (
          <div
            key={reserva.id_renta}
            className="bg-white rounded-xl p-4 mt-8 shadow-md "
          >
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-medium uppercase">{reserva.carro}</h1>
              <p className="bg-gray-700 rounded-xl text-white px-2 text-sm">
                {estado === 'activa' ? 'Activa' : 'Completada'}
              </p>
            </div>

            <div className="mt-4 border-b pb-4">
              <h1>Fechas renta:</h1>
              <div className="flex gap-2 mt-1">
                <h1 className="text-[#6B7280] font-bold">Inicio:</h1>
                <p>
                  {new Date(reserva.fecha_inicio).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>

              <div className="flex gap-2 mt-1">
                <h1 className="text-[#6B7280] font-bold">Fin:</h1>
                <p>
                  {new Date(reserva.fecha_fin).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <Clock2 />
                <p>
                  Reservado{' '}
                  {new Date(reserva.fecha_registro).toLocaleDateString(
                    'es-ES',
                    {
                      day: 'numeric',
                      month: 'long',
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <h1>Total</h1>
              <p className="text-2xl font-bold ">${reserva.total_pago}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center mt-8 font-medium text-xl">
          <p>No hay reservas</p>
        </div>
      )}
    </div>
  );
}

export default CardReservas;
