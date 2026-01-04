import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { helpHttp } from '../../helpers/helperHttp.js';
import { User, Car, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function CardRenta({ estado }) {
  const [rentas, setRentas] = useState([]);
  const navigate = useNavigate();

  const listaRentas = async () => {
    const ac = new AbortController();

    try {
      const api = helpHttp();
      const respuesta = await api.get(`admin/rentas/${estado}`, {
        signal: ac.signal,
      });

      if (!respuesta.err) {
        setRentas(respuesta);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const alertaConfirmacion = (id, id_carro) => {
    MySwal.fire({
      title: 'confirmacion final',
      text: `¿Deseas terminar la renta ${id}`,
      icon: 'info',
      confirmButtonText: 'Sí, completar',
      confirmButtonColor: '#00BD45',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const api = helpHttp();
        const respuesta = await api.put('admin/rentas', {
          body: { id_renta: id, id_carro: id_carro },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(respuesta);

        if (!respuesta.err) {
          MySwal.fire({
            title: 'Renta completada',
            text: `La renta ${id} ha sido completada con exito`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#00BD45',
          });
          listaRentas();
        }
      }
    });
  };

  const verDetalle = (id) => {
    navigate(`detalle?id=${id}`);
  };

  useEffect(() => {
    listaRentas();
  }, [estado]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
      {rentas.length > 0 ? (
        rentas.map((renta) => (
          <div
            className="p-4 border-1 bg-white rounded-xl"
            key={renta.id_renta}
          >
            <p className="mb-2 font-semibold">{renta.id_renta}</p>

            <p>
              {new Date(renta.fecha_inicio).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
              })}{' '}
              -{' '}
              {new Date(renta.fecha_fin).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
              })}
            </p>

            <div className="bg-[#FAFAFA] p-4 rounded-xl mt-6">
              <div className="flex gap-2">
                <User />

                <div>
                  <h1 className="font-medium">{renta.cliente.nombre}</h1>
                  <p className="text-[#6B7280]">{renta.cliente.telefono}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#E7EDFF] p-4 rounded-xl mt-6">
              <div className="flex gap-2">
                <Car />

                <div>
                  <h1 className="font-medium">{renta.carro.nombre}</h1>
                  <p className="text-[#6B7280]">{renta.carro.id_carro}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div>
                <p>Dias de Renta</p>
                <p>{renta.dias_duracion}</p>
              </div>

              <div>
                <p>Total Pago</p>
                <p>{renta.total_pago}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <div
                className="flex gap-2 text-[#6B7280] border-1 w-fit p-2 rounded-xl cursor-pointer hover:bg-[#F3F4F6]"
                onClick={() => verDetalle(renta.id_renta)}
              >
                <Eye />
                <p>ver mas</p>
              </div>

              {estado == 'activa' && (
                <div
                  className="bg-[#00BD45] p-2 rounded-xl w-fit text-white font-medium cursor-pointer"
                  onClick={() =>
                    alertaConfirmacion(renta.id_renta, renta.carro.id_carro)
                  }
                >
                  Completar
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center">no hay rentas</div>
      )}
    </div>
  );
}

export default CardRenta;
