import React from 'react';
import { Car } from 'lucide-react';
import { useState } from 'react';
import { helpHttp } from '../../helpers/helperHttp.js';
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
  const [formData, setFormData] = useState({
    identificacion: '',
    contrasena: '',
  });

  const Navigate = useNavigate();

  // funcion para menajar los errores de los inputs
  const handleError = () => {
    const errorElement = document.querySelector('.error-identicacion');
    const errorElementContra = document.querySelector('.error-contra');

    if (errorElement) {
      errorElement.textContent = 'identificacion es incorrecta';
      errorElementContra.textContent = 'contraseña es incorrecta';
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const buttonForm = async (e) => {
    e.preventDefault();

    // peticion asincrona a la API

    try {
      const api = helpHttp();
      const respuesta = await api.post('admin/login', {
        body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (respuesta.err) {
        handleError();
      } else {
        localStorage.setItem('admin', JSON.stringify('admin'));
        Navigate('/admin');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center bg-[#F4F4F7] min-h-screen p-4">
      <div className="flex items-center space-x-2">
        <Car className="h-8 w-8 text-primary" />
        <span className="text-lg md:text-3xl  font-bold">RentaCar</span>
      </div>

      <div className="bg-white p-12 rounded-xl shadow-md  max-w-xl mt-10 flex flex-col items-center">
        <h1 className="text-lg md:text-3xl font-medium mb-7 text-shadow">
          Bienvenido de vuelta
        </h1>
        <p className="text-[#6B7280] ">AutoRent Admin</p>
        <p className="text-[#6B7280] text-center ">
          Ingresa tus credenciales de administrador para continuar
        </p>

        <form className="w-full mt-12">
          <div>
            <label htmlFor="identificacion">identificacion</label>
            <input
              onChange={handleChange}
              type="text"
              id="identificacion"
              className="w-full mt-2 p-3 border border-[#6B7280] rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Ingresa tu identificacion"
            />
          </div>
          <p className="error-identicacion text-red-500 text-sm"></p>
          <div className="mt-8">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              onChange={handleChange}
              id="contrasena"
              className="w-full mt-2 p-3 border border-[#6B7280] rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <p className="error-contra text-red-500 text-sm"></p>
          <button
            onClick={buttonForm}
            type="submit"
            className="w-full mt-12 bg-[#6589FF] text-white font-medium  p-3 rounded-xl  transition-colors shadow-md hover:shadow-lg hover:bg-[#4C6BFF] cursor-pointer"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginAdmin;
