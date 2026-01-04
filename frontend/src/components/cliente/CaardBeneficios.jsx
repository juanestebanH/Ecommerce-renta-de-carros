import React from "react";

function CaardBeneficios({ titulo, descripcion, icon: Icon }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-95">
      <div className="flex gap-3">
        <div className="flex items-center justify-center bg-[#E4E4E7] w-12 h-12 rounded-xl">
          <Icon />
        </div>
        <h3 className="mt-2">{titulo}</h3>
      </div>
      <p className="text-[#6B7280] text-sm  mt-2 ml-15">{descripcion}</p>
    </div>
  );
}

export default CaardBeneficios;
