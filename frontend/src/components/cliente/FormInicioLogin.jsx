import { useState } from 'react';
import { helpHttp } from '../../helpers/helperHttp';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function FormInicioLogin() {
  const [identificacion, setIdentificacion] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const LoginForm = async (e) => {
    e.preventDefault();

    try {
      const data = {
        identificacion,
        email,
      };

      const api = helpHttp();
      const respuesta = await api.post('cliente/loginInicioSesion', {
        body: data,
      });

      if (respuesta.err) {
        toast.warning(respuesta.message);
      } else {
        localStorage.setItem(
          'clienteidentificacion',
          JSON.stringify(identificacion)
        );
        localStorage.setItem(
          'clientenombres',
          JSON.stringify(respuesta.data.nombres)
        );

        navigate('/');
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={LoginForm}
      method="post"
      className="bg-white w-full md:w-2/3 flex flex-col justify-center items-center px-6 py-16 rounded-xl shadow-xl"
    >
      <h1 className="text-3xl mb-2 font-medium"> Bienvenido de vuelta</h1>
      <p className="text-[#6B7280] text-center">
        Inicia sesión para acceder a tus reservas y continuar tu experiencia
      </p>

      <div className="w-full mt-10">
        <div className="flex flex-col mb-8">
          <label htmlFor="identificacion">Identificacion</label>
          <input
            required
            title="este campo es obligatorio"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            type="text"
            placeholder="tu identificacion"
            className="w-full border-1 p-2 rounded-xl"
          />
        </div>

        <div className="flex flex-col mb-8">
          <label htmlFor="email">Email</label>
          <input
            required
            title="este campo es obligatorio"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="tu email"
            className="w-full border-1 p-2 rounded-xl"
          />
        </div>

        <button className="bg-[#6589FF] p-2 w-full rounded-xl shadow-xl text-white mt-4 cursor-pointer hover:bg-[#527AFF]">
          Iniciar Sesion
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default FormInicioLogin;
