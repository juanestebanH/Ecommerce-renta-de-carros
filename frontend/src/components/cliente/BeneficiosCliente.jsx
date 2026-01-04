import React from "react";
import CaardBeneficios from "./CaardBeneficios";
import ConfiaCliente from "./ConfiaCliente";

import {
  Shield,
  Clock,
  MapPin,
  Headphones,
  CreditCard,
  Tablet,
} from "lucide-react";

function BeneficiosCliente() {
  return (
    <section className="py-20 px-6 bg-[#f4F4F7] " id="servicios">
      <div>
        <h1 className="text-lg font-medium text-center md:text-3xl">
          ¿Por Qué Elegir RentaCar?
        </h1>
        <p className="text-center text-[#6B7280] mt-4 max-w-2xl mx-auto">
          Ofrecemos la mejor experiencia de renta de vehículos con servicios
          premium y la más amplia flota de autos disponibles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center mt-14 px-10">
        <CaardBeneficios
          titulo="Seguro Completo"
          descripcion="Cobertura total contra daños, robo y responsabilidad civil incluida en todas las rentas."
          icon={Shield}
        />
        <CaardBeneficios
          titulo="Atención 24/7"
          descripcion="Servicio de atención al cliente y asistencia en carretera las 24 horas del día."
          icon={Clock}
        />
        <CaardBeneficios
          titulo="500+ Ubicaciones"
          descripcion="Recoge y devuelve tu vehículo en cualquiera de nuestras múltiples ubicaciones."
          icon={MapPin}
        />

        <CaardBeneficios
          titulo="Soporte Premium"
          descripcion="Equipo de atención al cliente especializado para resolver cualquier consulta."
          icon={Headphones}
        />
        <CaardBeneficios
          titulo="Pago Flexible"
          descripcion="Acepta todas las tarjetas de crédito principales y opciones de pago digital..."
          icon={CreditCard}
        />
        <CaardBeneficios
          titulo="Móvil y Web"
          descripcion="Gestiona tu reserva, encuentra ubicaciones y contacta soporte desde tu móvil o web."
          icon={Tablet}
        />
      </div>
      <div className="md:px-16 ">
        <ConfiaCliente />
      </div>
    </section>
  );
}

export default BeneficiosCliente;
