import { useState } from 'react';
import { helpHttp } from '../../helpers/helperHttp';
import { toast, ToastContainer } from 'react-toastify';

function FormRegistroCliente() {
  const [identificacion, setIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');

  const formRegistrar = async (e) => {
    e.preventDefault();

    try {
      const data = {
        id_cliente: identificacion,
        telefono: telefono,
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        fecha_nacimiento: fecha_nacimiento,
      };

      const api = helpHttp();
      const respuesta = await api.post('cliente/registrarcliente', {
        body: data,
      });

      if (respuesta.err) {
        toast.warning(respuesta.message);
      } else {
        localStorage.setItem(
          'clienteidentificacion',
          JSON.stringify(identificacion)
        );
        localStorage.setItem('clientenombres', JSON.stringify(nombres));
        toast.success(respuesta.message, {
          autoClose: 3000,
          onClose: () => window.location.reload(),
        });
      }
    } catch (error) {
      toast.warning('Error en el registro, vuelva a intentarlo');
    }
  };

  return (
    <form
      onSubmit={formRegistrar}
      className="bg-white w-full md:w-2/3 flex flex-col  justify-center items-center px-6 py-16 rounded-xl shadow-xl"
    >
      <h1 className="text-3xl mb-2 font-medium">Crea tu cuenta</h1>
      <p className="text-[#6B7280] text-center">
        Regístrate para comenzar tu experiencia con nosotros.
      </p>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="flex flex-col ">
          <label htmlFor="identificacion">Identificacion</label>
          <input
            onChange={(e) => setIdentificacion(e.target.value)}
            required
            type="text"
            placeholder="tu identificacion"
            className="w-full border-1 p-2 rounded-xl"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="telefono">Telefono</label>
          <input
            onChange={(e) => setTelefono(e.target.value)}
            required
            type="text"
            placeholder="tu telefono"
            className="w-full border-1 p-2 rounded-xl"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="nombres">Nombres</label>
          <input
            onChange={(e) => setNombres(e.target.value)}
            required
            type="text"
            placeholder="tu nombre"
            className="w-full border-1 p-2 rounded-xl"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            onChange={(e) => setApellidos(e.target.value)}
            required
            type="text"
            placeholder="tu email"
            className="w-full border-1 p-2 rounded-xl"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="text"
            placeholder="tu email"
            className="w-full border-1 p-2 rounded-xl"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="fecha_nacimiento">Fecha Nacimiento</label>
          <input
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
            type="date"
            className="w-full border-1 p-2 rounded-xl"
          />
        </div>
      </div>

      <button className="bg-[#6589FF] p-2 w-full rounded-xl shadow-xl text-white mt-10 cursor-pointer hover:bg-[#527AFF]">
        Registrarse
      </button>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </form>
  );
}

export default FormRegistroCliente;
