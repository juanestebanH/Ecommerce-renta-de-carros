import { Routes, Route } from 'react-router-dom';

// importing layouts
import ClienteLayout from './layouts/cliente/ClienteLayout';
import AdminLayout from './layouts/admin/AdminLayout';

// importing pages

import LoginAdmin from './pages/admin/LoginAdmin';
import Dashboard from './pages/admin/Dashboard';
import Carros from './pages/admin/Carros';
import AgragarVehiculo from './pages/admin/AgragarVehiculo';
import Rentas from './pages/admin/Rentas';
import DetalleRenta from './pages/admin/DetalleRenta';
import Clientes from './pages/admin/Clientes';
import DetalleCliente from './pages/admin/DetalleCliente';
import AgregarCliente from './pages/admin/AgregarCliente';
import Usuarios from './pages/admin/Usuarios';
import AgregarUsuario from './pages/admin/AgregarUsuario';
import ActualizarUsuario from './pages/admin/ActualizarUsuario';
import Reportes from './pages/admin/Reportes';
import AgregarRenta from './pages/admin/AgregarRenta';
import ActualizarVehiculo from './pages/admin/ActualizarVehiculo';

// impoting pages clientes
import Inicio from './pages/cliente/Inicio';
import CarrosCliente from './pages/cliente/CarrosCliente';
import DetalleCarro from './pages/cliente/DetalleCarro';
import RentarVehiculo from './pages/cliente/RentarVehiculo';
import LoginCliente from './pages/cliente/LoginCliente';
import ReservasCliente from './pages/cliente/ReservasCliente';
import Servicios from './pages/cliente/Servicios';
import Ubicaciones from './pages/cliente/Ubicaciones';
import Contacto from './pages/cliente/Contacto';

function AppRouter() {
  return (
    <Routes>
      {/* Rutas del cliente */}

      <Route path="/" element={<ClienteLayout />}>
        <Route index element={<Inicio />} />
        <Route path="carros" element={<CarrosCliente />} />
        <Route path="carros/detalle" element={<DetalleCarro />} />
        <Route path="carros/rentar" element={<RentarVehiculo />} />
        <Route path="reservas" element={<ReservasCliente />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="ubicaciones" element={<Ubicaciones />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>

      <Route path="/login" element={<LoginCliente />} />

      {/* Rutas del administrador */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="carros" element={<Carros />} />
        <Route path="carros/agregar" element={<AgragarVehiculo />} />
        <Route path="carros/actualizar" element={<ActualizarVehiculo />} />
        <Route path="rentas" element={<Rentas />} />
        <Route path="rentas/detalle" element={<DetalleRenta />} />
        <Route path="rentas/agregar" element={<AgregarRenta />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="clientes/detalle" element={<DetalleCliente />} />
        <Route path="clientes/agregar" element={<AgregarCliente />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="usuarios/agregar" element={<AgregarUsuario />} />
        <Route path="usuarios/actualizar/:id" element={<ActualizarUsuario />} />

        <Route path="reportes" element={<Reportes />} />
      </Route>

      {/* ruta para login de admin */}
      <Route path="/admin/login" element={<LoginAdmin />} />
    </Routes>
  );
}

export default AppRouter;
