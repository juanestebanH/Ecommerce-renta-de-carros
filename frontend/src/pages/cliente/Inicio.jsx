import { useEffect } from 'react';

// Import components
import HeroSection from '../../components/cliente/HeroSection';
import AutosDestacados from '../../components/cliente/AutosDestacados';
import BeneficiosCliente from '../../components/cliente/BeneficiosCliente';
import CategoriaSection from '../../components/cliente/CategoriaSection';
import MapUbicacion from '../../components/cliente/MapUbicacion';

import { toast, ToastContainer } from 'react-toastify';

function Inicio() {
  const cliente = JSON.parse(localStorage.getItem('clientenombres'));

  useEffect(() => {
    const alertaInicio = () => {
      if (cliente) {
        toast('bienvenido ' + cliente);
      }
    };

    alertaInicio();
  }, []);

  return (
    <div>
      <HeroSection />
      <AutosDestacados />
      <BeneficiosCliente />
      <CategoriaSection />
      <MapUbicacion />

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
        theme="dark"
      />
    </div>
  );
}

export default Inicio;
