import { useState, useEffect } from 'react';
import {
  Home,
  User,
  Users,
  Menu as MenuIcon,
  Car,
  Calendar,
  ChartColumnIncreasing,
  X,
} from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

export default function SidebarMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // funcion para cuando se hace click en un item se ponga el color azul
  const handleItemClick = (e) => {
    const items = document.querySelectorAll('.sidebar-item');
    items.forEach((item) =>
      item.classList.remove('bg-[#6589FF]', 'text-white')
    );
    e.currentTarget.classList.add('bg-[#6589FF]', 'text-white');
  };

  // funcion para manejar que al principio el menu tenga señalado el primer item
  useEffect(() => {
    const items = document.querySelectorAll('.sidebar-item');
    if (items.length > 0) {
      items[0].classList.add('bg-[#6589FF]', 'text-white');
    }
  }, []);

  const menuItems = [
    {
      label: 'Inicio',
      icon: <Home className="w-5 h-5" />,
      path: '/admin',
    },
    {
      label: 'Carros',
      icon: <Car className="w-5 h-5" />,
      path: '/admin/carros',
    },
    {
      label: 'Rentas',
      icon: <Calendar className="w-5 h-5" />,
      path: '/admin/rentas',
    },
    {
      label: 'Clientes',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/clientes',
    },
    {
      label: 'Usuarios',
      icon: <User className="w-5 h-5" />,
      path: '/admin/usuarios',
    },

    {
      label: 'Reportes',
      icon: <ChartColumnIncreasing className="w-5 h-5" />,
      path: '/admin/reportes',
    },
    {
      label: 'Cerrar Sesión',
      icon: <X className="w-5 h-5" />,
      path: '/admin/login',
    },
  ];

  return (
    <>
      {/* Botón hamburguesa solo en móvil */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-md z-50 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#F4F4F7] text-[#6B7280] h-screen flex flex-col transition-all duration-300
          ${
            isMobile
              ? `fixed top-0 left-0 z-40 ${
                  mobileOpen ? 'w-64' : 'w-0 overflow-hidden'
                }`
              : `${collapsed ? 'w-16' : 'w-64'}`
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && !isMobile && (
            <h1 className="text-lg font-bold text-[#2E2E2E]">Rentx</h1>
          )}
          {!isMobile && (
            <button onClick={() => setCollapsed(!collapsed)}>
              <MenuIcon className="w-6 h-6 cursor-pointer" />
            </button>
          )}
        </div>

        {/* Items */}
        <nav className="flex-1 p-3">
          {menuItems.map((item, index) =>
            item.label === 'Cerrar Sesión' ? (
              <div
                onClick={() => {
                  localStorage.removeItem('admin');
                  navigate('/admin/login');
                }}
                key={index}
                className="flex items-center mt-1 font-regular gap-3 p-3 hover:bg-[#a4b8fb] hover:text-white rounded-xl cursor-pointer sidebar-item"
              >
                {item.icon}
                {!collapsed && !isMobile && (
                  <span className="text-sm">{item.label}</span>
                )}
                {isMobile && <span>{item.label}</span>}
              </div>
            ) : (
              <Link
                to={item.path || '#'}
                onClick={(e) => {
                  handleItemClick(e);
                  if (isMobile) setMobileOpen(false);
                }}
                key={index}
                className="flex items-center mt-1 font-regular gap-3 p-3 hover:bg-[#a4b8fb] hover:text-white rounded-xl cursor-pointer sidebar-item"
              >
                {item.icon}
                {!collapsed && !isMobile && (
                  <span className="text-sm">{item.label}</span>
                )}
                {isMobile && <span>{item.label}</span>}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
}
