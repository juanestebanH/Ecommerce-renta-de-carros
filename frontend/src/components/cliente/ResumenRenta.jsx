import { Calendar, Shield } from 'lucide-react';

function ResumenRenta({ tarifa, fechaInicio, fechaFin, dias, nombreCarro }) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 w-full max-w-sm h-full">
      <h1 className="uppercase mb-4">Resumen de Reserva</h1>

      <div className="border-b-1 font-medium pb-2">
        <h3>{nombreCarro}</h3>
      </div>

      <div className="flex gap-2 mt-8 mb-2 items-center">
        <Calendar />
        <p>Fechas de Renta</p>
      </div>

      <div className="border-b-1 text-sm pb-2">
        <div className="flex gap-2 mb-1">
          <h1 className="font-bold">inicio:</h1>
          <p>{fechaInicio}</p>
        </div>

        <div className="flex gap-2 mb-1">
          <h1 className="font-bold">Fin:</h1>
          <p>{fechaFin}</p>
        </div>

        <div className="flex gap-2 mb-1">
          <h1 className="font-bold">Duracion:</h1>
          <p>{dias}</p>
        </div>
      </div>
      <div className="flex justify-between my-6 items-center text-xl">
        <h1 className="font-medium">Total:</h1>
        <h1 className="font-bold">{tarifa}</h1>
      </div>

      <div className="p-2 bg-[#E7EDFF] border-1 border-[#6589FF] rounded-xl  text-[#6589FF] ">
        <div className="flex gap-2 font-bold">
          <Shield />
          <h1>Proteccion Incluidad</h1>
        </div>
        <p className="my-2">
          Tu reserva incluye seguro básico y asistencia 24/7.
        </p>
      </div>
    </div>
  );
}

export default ResumenRenta;
