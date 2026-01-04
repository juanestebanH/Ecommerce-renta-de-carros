import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { helpHttp } from '../../helpers/helperHttp.js';
import FormActualizarVehiculo from '../../components/admin/FormActualizarVehiculo.jsx';

function ActualizarVehiculo() {
  const location = useLocation();
  const carro = location.state;
  const [datos, setDatos] = useState({});

  const infoCarro = async () => {
    try {
      const api = helpHttp();
      const res = await api.get(`admin/carros/${carro.id_carro}`);

      if (!res.err) {
        setDatos(res);
      }
    } catch (error) {}
  };

  useEffect(() => {
    infoCarro();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-medium">Gestión de actualizar vehiculo</h1>
      <p className="mt-2 text-[#6B7280]">Modique la informacion del vehiculo</p>
      <FormActualizarVehiculo carroId={carro.id_carro} initialData={datos} />
    </div>
  );
}

export default ActualizarVehiculo;
