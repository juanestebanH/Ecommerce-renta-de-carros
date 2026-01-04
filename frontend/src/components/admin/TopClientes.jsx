import { User2 } from 'lucide-react';

function TopClientes({ listado }) {
  return (
    <div className="border-1 p-4 rounded-xl border-gray-500 mt-8">
      <h1>Top de Clientes</h1>

      {listado.map((cliente) => (
        <div
          key={cliente.id_cliente}
          className="p-4 border-1 border-gray-400 mt-4 rounded-xl"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-4 justify-center items-center">
              <div className="p-1 bg-[#E7EDFF] rounded-xl h-full">
                <User2 className="w-6 h-6 text-[#6589FF]" />
              </div>
              <div>
                <p>
                  {cliente.nombre} - {cliente.id_cliente}
                </p>
                <p className="text-[#6B7280] text-sm">{cliente.total_rentas}</p>
              </div>
            </div>

            <div>
              <p className="text-[#00B982] text-lg font-medium">
                $ {cliente.total_pagado}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopClientes;
