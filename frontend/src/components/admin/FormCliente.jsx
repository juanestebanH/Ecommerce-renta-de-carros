import { useState } from 'react';
import { helpHttp } from '../../helpers/helperHttp';
import { toast, ToastContainer } from 'react-toastify';

// estado inicial de formdata
const initialFormData = {
  id_cliente: '',
  nombres: '',
  apellidos: '',
  telefono: '',
  email: '',
  fecha_nacimiento: '',
  numero_licencia: '',
  fecha_vencimiento: '',
  pais_emision: '',
};

function FormCliente() {
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
      const respuesta = await api.post('admin/clientes', {
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
          <h1 className="text-lg text-[#6589FF]">Información del Cliente</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
            <div className="flex flex-col">
              <label htmlFor="id_cliente">Identificación</label>
              <input
                value={formData.id_cliente}
                type="text"
                id="id_cliente"
                onChange={handleChange}
                placeholder="Identificación"
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nombres">Nombres</label>
              <input
                value={formData.nombres}
                type="text"
                id="nombres"
                onChange={handleChange}
                placeholder="Nombres"
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                value={formData.apellidos}
                type="text"
                id="apellidos"
                onChange={handleChange}
                placeholder="Apellidos"
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="telefono">Teléfono</label>
              <input
                value={formData.telefono}
                type="tel"
                id="telefono"
                onChange={handleChange}
                placeholder="Teléfono"
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
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
              <input
                value={formData.fecha_nacimiento}
                type="date"
                id="fecha_nacimiento"
                onChange={handleChange}
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="numero_licencia">Número de Licencia</label>
              <input
                value={formData.numero_licencia}
                type="text"
                id="numero_licencia"
                onChange={handleChange}
                placeholder="Número de Licencia"
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fecha_vencimiento">Fecha de Vencimiento</label>
              <input
                value={formData.fecha_vencimiento}
                type="date"
                id="fecha_vencimiento"
                onChange={handleChange}
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pais_emision">País de Emisión</label>
              <input
                value={formData.pais_emision}
                type="text"
                id="pais_emision"
                onChange={handleChange}
                placeholder="País de Emisión"
                className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-[#6589FF] text-white px-6 py-3 rounded-lg hover:bg-[#4A6BFF] transition-colors"
          >
            Agregar Cliente
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default FormCliente;
