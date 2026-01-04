import Volver from '../../components/admin/Volver';
import FormCliente from '../../components/admin/FormCliente';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AgregarCliente() {
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
        <Volver to={'/admin/clientes'} />
        <div>
          <h1 className="text-2xl font-medium">Agregar Nuevo Cliente</h1>
          <p className="mt-2 text-[#6B7280]">
            Complete la información del cliente para agregarlo a la plataforma
          </p>
        </div>
      </div>
      <FormCliente />
    </div>
  );
}

export default AgregarCliente;
