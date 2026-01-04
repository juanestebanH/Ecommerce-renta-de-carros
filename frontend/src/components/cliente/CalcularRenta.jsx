import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CalcularRenta({ tarifa, nombreCarro }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFechaInicioChange = (value) => {
    setFechaInicio(value);
    setResultado(null);
    setError('');
  };

  const handleFechaFinChange = (value) => {
    setFechaFin(value);
    setResultado(null);
    setError('');
  };

  const calcularRenta = () => {
    setError('');
    setResultado(null);

    // Verificar que ambas fechas estén seleccionadas
    if (!fechaInicio || !fechaFin) {
      setError('Por favor selecciona ambas fechas');
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Verificar que la fecha de inicio no sea anterior a hoy
    if (inicio < hoy) {
      setError('La fecha de inicio no puede ser anterior a hoy');
      return;
    }

    // Verificar que la fecha de fin no sea anterior a la fecha de inicio
    if (fin < inicio) {
      setError('La fecha de fin no puede ser anterior a la fecha de inicio');
      return;
    }
    // Calcular la diferencia en días
    const diferencia = fin - inicio;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24)) + 1;

    // Calcular la renta
    const renta = dias * tarifa;

    setResultado({
      dias,
      renta: renta.toFixed(2),
    });
  };

  const irRentar = () => {
    navigate('/carros/rentar', {
      state: {
        tarifa: resultado.renta,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        dias: resultado.dias,
        nombreCarro: nombreCarro,
      },
    });
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
      <h1>Calcular renta</h1>
      <div>
        <div className="flex flex-col mt-6">
          <label htmlFor="fechaInicio">Fecha de inicio:</label>
          <input
            value={fechaInicio}
            onChange={(e) => handleFechaInicioChange(e.target.value)}
            className="w-full bg-[#F4F4F7] p-2 rounded-xl mt-1 text-sm"
            type="date"
            id="fechaInicio"
            name="fechaInicio"
          />
        </div>
        <div className="flex flex-col mt-6">
          <label htmlFor="fechaFin">Fecha de fin:</label>
          <input
            className="w-full bg-[#F4F4F7] p-2 rounded-xl mt-1 text-sm"
            type="date"
            id="fechaFin"
            name="fechaFin"
            value={fechaFin}
            onChange={(e) => handleFechaFinChange(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        {resultado && (
          <div className="bg-green-50 p-4 rounded-lg mt-4 border border-green-200">
            <p className="text-sm">
              <strong>Días:</strong> {resultado.dias}
            </p>
            <p className="text-sm">
              <strong>Tarifa diaria:</strong> ${tarifa}
            </p>
            <p className="text-lg font-bold text-green-600 mt-2">
              Total: ${resultado.renta}
            </p>
          </div>
        )}

        {resultado ? (
          <button
            onClick={() => irRentar()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10 w-full hover:bg-blue-600 transition-colors"
          >
            Rentar vehículo
          </button>
        ) : (
          <button
            onClick={calcularRenta}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10 w-full hover:bg-blue-600 transition-colors"
          >
            Calcular
          </button>
        )}
      </div>
    </div>
  );
}

export default CalcularRenta;
