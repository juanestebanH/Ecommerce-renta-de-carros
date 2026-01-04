import { useEffect } from 'react';
import CardDashboard from '../../components/admin/CardDashboard';
import RentasRecientesDashboard from '../../components/admin/RentasRecientesDashboard';
import EstadoFlota from '../../components/admin/EstadoFlota';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const Navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
      Navigate('/admin/login');
    }
  }, [Navigate]);

  const admin = JSON.parse(localStorage.getItem('admin'));
  if (!admin) {
    return null; // O un componente de carga si es necesario
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Dashboard</h1>
      <p className="mt-2 text-[#6B7280]">
        Resumen general de tu negocio de renta de carros
      </p>
      <div>
        <CardDashboard />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <RentasRecientesDashboard />

        <EstadoFlota />
      </div>
    </div>
  );
}

export default Dashboard;
