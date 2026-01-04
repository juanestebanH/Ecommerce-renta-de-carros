import React from "react";
import { Users, Car, MapPin, Award } from "lucide-react";

function ConfiaCliente() {
  return (
    <article className="flex flex-col items-center justify-center  bg-[#0A0B0B] rounded-xl p-6 mt-22 ">
      <div className="text-center mt-6">
        <h1 className="text-white text-xl mb-2">Confían en Nosotros</h1>
        <p className="text-[#E4E4E7]">
          Números que hablan por nuestra calidad y experiencia
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-6">
        <div className="flex items-center justify-center flex-col mt-4">
          <div className="bg-[#1C1D2B] rounded-xl w-18 h-18 flex items-center justify-center mb-4">
            <Users className="text-white w-9 h-9" />
          </div>
          <h3 className="text-white text-3xl mb-2">10,000+</h3>
          <p className="text-[#E4E4E7]">Clientes Satisfechos</p>
        </div>
        <div className="flex items-center justify-center flex-col mt-4">
          <div className="bg-[#1C1D2B] rounded-xl w-18 h-18 flex items-center justify-center mb-4">
            <Car className="text-white w-9 h-9" />
          </div>
          <h3 className="text-white text-3xl mb-2">100+</h3>
          <p className="text-[#E4E4E7]">Vehículos Disponibles</p>
        </div>
        <div className="flex items-center justify-center flex-col mt-4">
          <div className="bg-[#1C1D2B] rounded-xl w-18 h-18 flex items-center justify-center mb-4">
            <MapPin className="text-white w-9 h-9" />
          </div>
          <h3 className="text-white text-3xl mb-2">7+</h3>
          <p className="text-[#E4E4E7]">Ubicaciones</p>
        </div>
        <div className="flex items-center justify-center flex-col mt-4">
          <div className="bg-[#1C1D2B] rounded-xl w-18 h-18 flex items-center justify-center mb-4">
            <Award className="text-white w-9 h-9" />
          </div>
          <h3 className="text-white text-3xl mb-2">5+</h3>
          <p className="text-[#E4E4E7]">Años de Experiencia</p>
        </div>
      </div>
    </article>
  );
}

export default ConfiaCliente;
