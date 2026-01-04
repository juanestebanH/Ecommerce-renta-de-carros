import { useState } from 'react';
import { helpHttp } from '../../helpers/helperHttp';
import { toast, ToastContainer } from 'react-toastify';

// estado inicial de formdata
const initialFormData = {
  id_usuario: '',
  nombres: '',
  email: '',
  contrasena: '',
  rol: '',
};

function FormUsuario() {
  const [formData, setFormData] = useState(initialFormData);

  // funcion para los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const buttonForm = async (e) => {
    e.preventDefault();

    // peticion asincrona a la API
    try {
      const api = helpHttp();
      const respuesta = await api.post('admin/usuarios', {
        body: formData,
      });

      if (respuesta.err) {
        if (respuesta.status == 400) {
          toast.warning(respuesta.message);
        } else {
          toast.error(respuesta.message);
        }
      } else {
        toast.success(respuesta.message);
        // Reiniciar los inputs del formulario
        setFormData(initialFormData);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={buttonForm}>
        <div className="mt-15 border-[#6B7280] border-1 rounded-xl bg-white p-4">
          <h1 className="text-lg text-[#6589FF]">Información del Usuario</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
            <div className="flex flex-col">
              <label htmlFor="id_usuario">ID Usuario</label>
              <input
                value={formData.id_usuario}
                type="text"
                id="id_usuario"
                onChange={handleChange}
                placeholder="ID Usuario"
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nombres">Nombre</label>
              <input
                value={formData.nombres}
                type="text"
                id="nombres"
                onChange={handleChange}
                placeholder="Nombre"
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                value={formData.email}
                type="email"
                id="email"
                onChange={handleChange}
                placeholder="Email"
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                value={formData.contrasena}
                type="password"
                id="contrasena"
                onChange={handleChange}
                placeholder="Contraseña"
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rol">Rol</label>
              <select
                value={formData.rol}
                id="rol"
                onChange={handleChange}
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              >
                <option value="">Seleccionar Rol</option>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-[#6589FF] text-white px-6 py-3 rounded-lg hover:bg-[#4A6BFF] transition-colors"
          >
            Agregar Usuario
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default FormUsuario;
