import { useState, useEffect } from 'react';
import { Search, Eye } from 'lucide-react';
import { helpHttp } from '../../helpers/helperHttp.js';
import { useNavigate } from 'react-router-dom';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchClientes = async () => {
    try {
      const api = helpHttp();
      const respuesta = await api.get('admin/clientes');
      if (!respuesta.err) {
        setClientes(respuesta);
        setFilteredClientes(respuesta);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const irDetalle = (datosCliente) => {
    navigate('/admin/clientes/detalle', { state: { datosCliente } });
  };

  const irAgregar = () => {
    navigate('/admin/clientes/agregar');
  };

  useEffect(() => {
    fetchClientes();
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
      navigate('/admin/login');
    }
  }, []);

  useEffect(() => {
    const filtered = clientes.filter(
      (cliente) =>
        cliente.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClientes(filtered);
  }, [searchTerm, clientes]);

  return (
    <div>
      <h1 className="text-2xl font-medium">Gestión de clientes</h1>
      <p className="mt-2 text-[#6B7280]">Administra todas los clientes</p>

      <div className="flex justify-center items-center mt-6 bg-[#F4F4F7] rounded-lg gap-2 px-2 border-1 border-[#b8bcc5]">
        <Search className="text-[#6B7280]" />
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o email"
          className="p-2 rounded-lg w-full focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <div
          className="mt-6 flex justify-center  bg-[#6589FF] text-white px-4 py-2 rounded-lg w-full md:w-40 cursor-pointer hover:bg-blue-700"
          onClick={irAgregar}
        >
          <p>Agregar Cliente</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nombres
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Apellidos
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Teléfono
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <tr
                  key={cliente.id_cliente}
                  className="border-t border-gray-200"
                >
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {cliente.id_cliente}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {cliente.nombres}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {cliente.apellidos}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {cliente.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {cliente.telefono}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 cursor-pointer hover:text-gray-950">
                    <Eye onClick={() => irDetalle(cliente)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-2 text-center text-sm text-gray-500"
                >
                  No se encontraron clientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
