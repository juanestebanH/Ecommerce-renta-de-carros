import { useState, useEffect } from 'react';
import { Search, Trash2, SquarePen } from 'lucide-react';
import { helpHttp } from '../../helpers/helperHttp.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    try {
      const api = helpHttp();
      const respuesta = await api.get('admin/usuarios');
      if (!respuesta.err) {
        setUsuarios(respuesta);
        setFilteredUsuarios(respuesta);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarUsuario = async (id) => {
    MySwal.fire({
      title: '¿Estás seguro desactivar este usuario?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const api = helpHttp();
          const respuesta = await api.del(`admin/usuarios/${id}`);

          if (!respuesta.err) {
            MySwal.fire({
              title: 'Desactivado!',
              text: 'El usuario ha sido desactivado.',
              icon: 'success',
            });
            fetchUsuarios();
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    });
  };

  const irActualizar = (id) => {
    navigate(`/admin/usuarios/actualizar/${id}`);
  };

  const irAgregar = () => {
    navigate('/admin/usuarios/agregar');
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
      navigate('/admin/login');
    }

    const filtered = usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.rol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsuarios(filtered);
  }, [searchTerm, usuarios]);

  return (
    <div>
      <h1 className="text-2xl font-medium">Gestión de Usuarios</h1>
      <p className="mt-2 text-[#6B7280]">
        Administra los usuarios de la plataforma
      </p>

      <div className="flex justify-center items-center mt-6 bg-[#F4F4F7] rounded-lg gap-2 px-2 border-1 border-[#b8bcc5]">
        <Search className="text-[#6B7280]" />
        <input
          type="text"
          placeholder="Buscar por nombre, email o rol"
          className="p-2 rounded-lg w-full focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <div
          className="mt-6 flex justify-center bg-[#6589FF] text-white px-4 py-2 rounded-lg w-full md:w-44 cursor-pointer hover:bg-blue-700"
          onClick={irAgregar}
        >
          <p>Agregar Usuario</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID Usuario
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nombres
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Rol
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.length > 0 ? (
              filteredUsuarios.map((usuario) => (
                <tr
                  key={usuario.id_usuario}
                  className="border-t border-gray-200"
                >
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {usuario.id_usuario}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {usuario.nombre}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {usuario.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {usuario.rol}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 cursor-pointer hover:text-gray-950">
                    <div className="flex gap-2">
                      <Trash2
                        onClick={() => eliminarUsuario(usuario.id_usuario)}
                      />

                      <SquarePen
                        className="text-[#6589FF]"
                        onClick={() => irActualizar(usuario.id_usuario)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-2 text-center text-sm text-gray-500"
                >
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
