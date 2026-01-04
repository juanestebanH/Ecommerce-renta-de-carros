import Volver from '../../components/admin/Volver';
import FormUsuario from '../../components/admin/FormUsuario';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function AgregarUsuario() {
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
        <Volver to={'/admin/usuarios'} />
        <div>
          <h1 className="text-2xl font-medium">Agregar Nuevo Usuario</h1>
          <p className="mt-2 text-[#6B7280]">
            Complete la información del usuario para agregarlo a la plataforma
          </p>
        </div>
      </div>
      <FormUsuario />
    </div>
  );
}

export default AgregarUsuario;
