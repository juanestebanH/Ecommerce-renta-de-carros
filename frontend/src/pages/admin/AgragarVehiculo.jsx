import Volver from '../../components/admin/Volver';
import FormVehiculo from '../../components/admin/FormVehiculo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AgragarVehiculo() {
  const Navigate = useNavigate();
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
      Navigate('/admin/login');
    }
  }, []);
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <Volver to={'/admin/carros'} />
        <div>
          <h1 className="text-2xl font-medium">Agregar Nuevo Vehículo</h1>
          <p className="mt-2 text-[#6B7280]">
            Complete la información del vehículo para agregarlo a la flota
          </p>
        </div>
      </div>
      <FormVehiculo />
    </div>
  );
}

export default AgragarVehiculo;
