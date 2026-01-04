import { useState, useEffect } from 'react';
import Volver from '../../components/admin/Volver';
import { helpHttp } from '../../helpers/helperHttp.js';
import { User, Mail, Phone, Calendar, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function DetalleRenta() {
  const [detalle, setDetalle] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const idRenta = urlParams.get('id');
  const Navigate = useNavigate();

  const informacionRenta = async () => {
    const api = helpHttp();
    const respuesta = await api.get(`admin/rentas/detalle/${idRenta}`);
    if (!respuesta.err) {
      setDetalle(respuesta[0]);
    }
  };

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
      Navigate('/admin/login');
    }
    informacionRenta();
  }, []);

  return (
    <div>
      <div className="flex gap-4 items-center mb-8">
        <Volver to={'/admin/rentas'} />
        <div>
          <h1 className="text-2xl font-medium">Detalle de Renta</h1>
          <p className="mt-2 text-[#6B7280]">
            Información detallada de la renta seleccionada
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border-1 rounded-xl">
          <div className="flex gap-2 mb-4">
            <User className="text-[#6589FF]" />
            <p>Informacion cliente</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <p className="text-[#6B7280]">Nombre Completo</p>
              <p>
                {detalle?.cliente.nombre} {detalle?.cliente.apellido}
              </p>
            </div>
            <div>
              <p className="text-[#6B7280]">Numero licencia</p>
              <p>{detalle?.cliente.numero_licencia}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Mail />
            <p>{detalle?.cliente.email}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <Phone />
            <p>{detalle?.cliente.telefono}</p>
          </div>
        </div>

        <div className="p-4 border-1 rounded-xl">
          <div className="flex gap-2 mb-4">
            <Calendar className="text-[#6589FF]" />
            <p>Informacion de renta</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[#6B7280]">Fecha de inicio</p>
              <p>{detalle?.fecha_inicio}</p>
            </div>
            <div>
              <p className="text-[#6B7280]">Fecha de finalización</p>
              <p>{detalle?.fecha_fin}</p>
            </div>

            <div>
              <p className="text-[#6B7280]">Duracion</p>
              <p>{detalle?.dias_duracion}</p>
            </div>
            <div>
              <p className="text-[#6B7280]">Total Pago</p>
              <p>{detalle?.total_pago}</p>
            </div>

            <div>
              <p className="text-[#6B7280]">Metodo Pago</p>
              <p>{detalle?.metodo_pago}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-1 rounded-xl">
          <div className="flex gap-2 mb-4">
            <Car className="text-[#6589FF]" />
            <p>Informacion de carro</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p className="text-[#6B7280]">nombre carro</p>
              <p>{detalle?.carro.nombre}</p>
            </div>

            <div>
              <p className="text-[#6B7280]">Año</p>
              <p>{detalle?.carro.ano}</p>
            </div>

            <div>
              <p className="text-[#6B7280]">Marca</p>
              <p>{detalle?.carro.id_marca}</p>
            </div>
            <div>
              <p className="text-[#6B7280]">Capacidad</p>
              <p>{detalle?.carro.capacidad}</p>
            </div>

            <div>
              <p className="text-[#6B7280]">Placa</p>
              <p>{detalle?.carro.id_carro}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleRenta;
