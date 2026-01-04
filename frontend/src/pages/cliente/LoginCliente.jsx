import loginfondo from '../../assets/fondologin.png';
import { Car } from 'lucide-react';
import FormInicioLogin from '../../components/cliente/FormInicioLogin';
import { useState } from 'react';
import FormRegistroCliente from '../../components/cliente/FormRegistroCliente';

function LoginCliente() {
  const [estado, setEstado] = useState(0);
  return (
    <section className="w-full h-screen md:grid md:grid-cols-2 bg-[#F9F9F9]">
      <div className="relative w-full h-full hidden md:block">
        <img src={loginfondo} alt="" className="w-full h-screen object-cover" />

        <div className="absolute top-0 z-20 w-full h-screen  bg-[#2E2E2E]/30 "></div>

        <div className="absolute bottom-5 left-0 p-5 text-white">
          <h1 className="text-2xl font-bold">Descubre el Lujo en Cada Viaje</h1>
          <p>
            La mejor selección de vehículos premium para tu próxima aventura
          </p>
        </div>
      </div>

      {/* Columna del formulario */}
      <div className="w-full h-full flex flex-col items-center justify-center px-4">
        <div className="flex gap-2 items-center mb-4">
          <Car className=" w-12 h-12" />
          <h1 className="text-3xl">RentX</h1>
        </div>

        {estado == 0 ? <FormInicioLogin /> : <FormRegistroCliente />}

        {estado == 0 ? (
          <p
            onClick={() => setEstado(1)}
            className="mt-6 cursor-pointer hover:font-medium"
          >
            ¿No tienes cuenta? Regístrate gratis
          </p>
        ) : (
          <p
            onClick={() => setEstado(0)}
            className="mt-6 cursor-pointer hover:font-medium"
          >
            ¿tienes cuenta? inicia sesion
          </p>
        )}
      </div>
    </section>
  );
}

export default LoginCliente;
