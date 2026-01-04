import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Volver from '../../components/admin/Volver';
import FormUsuarioActualizar from '../../components/admin/FormUsuarioActualizar';
import { helpHttp } from '../../helpers/helperHttp';
import { useNavigate } from 'react-router-dom';

function ActualizarUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
      Navigate('/admin/login');
    }

    const fetchUsuario = async () => {
      try {
        const api = helpHttp();
        const response = await api.get(`admin/usuarios/${id}`);
        if (!response.err) {
          setUsuario(response);
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsuario();
  }, [id]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <Volver to={'/admin/usuarios'} />
        <div>
          <h1 className="text-2xl font-medium">Actualizar Usuario</h1>
          <p className="mt-2 text-[#6B7280]">
            Modifique la información del usuario
          </p>
        </div>
      </div>
      <FormUsuarioActualizar usuario={usuario} />
    </div>
  );
}

export default ActualizarUsuario;
