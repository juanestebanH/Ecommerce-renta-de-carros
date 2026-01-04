import { useEffect, useState } from 'react';
import { helpHttp } from '../../helpers/helperHttp';

function RentasRecientesDashboard() {
  const [lisRentas, setRentas] = useState([]);
  useEffect(() => {
    const rentasRecientes = async () => {
      try {
        const api = helpHttp();
        const respuesta = await api.get('admin/rentasrecientes');

        if (respuesta.err || !respuesta.data) {
          setRentas([]);
        } else {
          setRentas(respuesta.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    rentasRecientes();
  }, []);
  return (
    <div className="p-4 border-[#c1c4ca] border-1 rounded-xl shadow-lg bg-white">
      <h3>Rentas recientes</h3>

      <div className="flex flex-col mt-8 gap-4">
        {lisRentas.length == 0 ? (
          <div className="text-center text-[#6B7280] py-10  text-2xl">
            <h1>No hay rentas registradas.</h1>
          </div>
        ) : (
          lisRentas.map((renta, index) => (
            <div
              key={index}
              className="p-4 bg-[#F4F4F7] flex justify-between items-center rounded-xl border-[#B2B2B2] border-1"
            >
              <div>
                <h3 className="uppercase">{renta.cliente}</h3>
                <p className="text-sm text-[#6B7280] mb-2">{renta.carro}</p>
                <p className="text-sm text-[#6B7280]">ID: {renta.id_renta}</p>
              </div>

              <h1 className="font-medium">{renta.pago}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RentasRecientesDashboard;
