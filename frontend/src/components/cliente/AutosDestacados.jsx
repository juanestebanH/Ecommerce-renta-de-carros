import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Fuel,
  Users,
  Car,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import car1 from "../../assets/car1.png";
import car2 from "../../assets/car2.png";
import car3 from "../../assets/car3.png";
import car4 from "../../assets/car4.png";

function AutosDestacados() {
  const autos = [
    {
      imagen: car1,
      trasmision: "automatico",
      pasajeros: "3 pasajeros",
      gasolina: "gasolina",
      precio: "$45/día",
    },
    {
      imagen: car2,
      trasmision: "automatico",
      pasajeros: "4 pasajeros",
      gasolina: "gasolina",
      precio: "$50/día",
    },
    {
      imagen: car3,
      trasmision: "automatico",
      pasajeros: "2 pasajeros",
      gasolina: "gasolina",
      precio: "$40/día",
    },
    {
      imagen: car4,
      trasmision: "automatico",
      pasajeros: "5 pasajeros",
      gasolina: "gasolina",
      precio: "$60/día",
    },
  ];
  const [indiceAuto, setIndiceAuto] = useState(0);
  const autoActual = autos[indiceAuto];

  const mostrarSiguiente = () => {
    setIndiceAuto((indiceActual) => (indiceActual + 1) % autos.length); // Incrementa el índice y lo reinicia si llega al final
  };

  const mostrarAnterior = () => {
    setIndiceAuto(
      (indiceActual) =>
        indiceActual === 0 ? autos.length - 1 : indiceActual - 1 // Decrementa el índice y lo reinicia si llega al principio
    );
  };

  return (
    <section className="py-15 px-4 " id="autos-destacados">
      <h1 className="text-lg font-medium text-center md:text-3xl">
        Autos Destacados para tu Próximo Viaje
      </h1>
      <article className="flex items-center justify-between mt-8">
        <div
          onClick={mostrarAnterior}
          className="flex items-center justify-center bg-blue-600 w-12 h-12 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer shadow-lg "
        >
          <ChevronLeft className="text-white" />
        </div>
        <div className=" md:h-[60vh] ">
          <AnimatePresence mode="wait">
            <motion.img
              key={autoActual.imagen}
              src={autoActual.imagen}
              alt="cars"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="md:w-[900px] md:h-full h:70 w-90"
            />
          </AnimatePresence>
        </div>
        <div
          onClick={mostrarSiguiente}
          className="flex items-center justify-center bg-blue-600 w-12 h-12 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer shadow-lg "
        >
          <ChevronRight className="text-white" />
        </div>
      </article>

      <div className="flex  justify-center mb-4 ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-2">
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center bg-gray-300 w-12 h-12 rounded-full  shadow-lg mb-2">
              <Fuel />
            </div>
            <p>{autoActual.gasolina}</p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center bg-gray-300 w-12 h-12 rounded-full  shadow-lg mb-2">
              <Users />
            </div>
            <p>{autoActual.pasajeros}</p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center bg-gray-300 w-12 h-12 rounded-full  shadow-lg mb-2">
              <Car />
            </div>
            <p>{autoActual.trasmision}</p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center bg-gray-300 w-12 h-12 rounded-full  shadow-lg mb-2">
              <DollarSign />
            </div>
            <p>{autoActual.precio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AutosDestacados;
