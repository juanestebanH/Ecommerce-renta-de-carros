import { useState, useEffect } from 'react';
import Volver from '../../components/admin/Volver';
import { CreditCard, CircleDollarSign } from 'lucide-react';
import { helpHttp } from '../../helpers/helperHttp';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AgregarRenta() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [identificacion, setIdentificacion] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [licenciaNumero, setLicenciaNumero] = useState('');
  const [estadoEmision, setEstadoEmision] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [dias, setDias] = useState(0);
  const [idCarro, setIdCarro] = useState('');
  const [tarifaSeleccionada, setTarifaSeleccionada] = useState(0);
  const [seleccionPago, setSeleccionPago] = useState(0);
  const [carros, setCarros] = useState([]);
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Información Personal' },
    { number: 2, title: 'Licencia y Dirección' },
    { number: 3, title: 'Seleccionar Carro, Fechas y Pago' },
    { number: 4, title: 'Confirmación' },
  ];

  const progress = (currentStep / 4) * 100;

  useEffect(() => {
    const obtenerCarros = async () => {
      const api = helpHttp();
      const respuesta = await api.get('admin/carros');
      if (respuesta) {
        setCarros(respuesta);
      }
    };
    obtenerCarros();
  }, []);

  const calcularDias = (inicio, fin) => {
    if (inicio && fin) {
      const start = new Date(inicio);
      const end = new Date(fin);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDias(diffDays);
    }
  };

  const primerPasoForm = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!identificacion.trim())
      newErrors.identificacion = 'La identificación es requerida';
    if (!nombres.trim()) newErrors.nombres = 'El nombre es requerido';
    if (!apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(correo)) {
      newErrors.correo = 'Correo no válido';
    }
    if (!telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!fechaNacimiento)
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(2);
    }
  };

  const segundoPasoForm = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!licenciaNumero.trim())
      newErrors.licenciaNumero = 'El número de licencia es requerido';
    if (!estadoEmision.trim())
      newErrors.estadoEmision = 'El estado de emisión es requerido';
    if (!fechaVencimiento)
      newErrors.fechaVencimiento = 'La fecha de vencimiento es requerida';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(3);
    }
  };

  const tercerPasoForm = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!fechaInicio) newErrors.fechaInicio = 'La fecha de inicio es requerida';
    if (!fechaFin) newErrors.fechaFin = 'La fecha de fin es requerida';
    if (!idCarro) newErrors.idCarro = 'Debe seleccionar un carro';
    if (!seleccionPago)
      newErrors.seleccionPago = 'Debe seleccionar un método de pago';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(4);
    }
  };

  const volverPaso = (numero) => {
    setCurrentStep(numero);
  };

  const confirmacion = async () => {
    const api = helpHttp();
    const datosEnvio = {
      cliente: {
        id_cliente: identificacion,
        nombres,
        apellidos,
        email: correo,
        telefono,
        fecha_nacimiento: fechaNacimiento,
        numero_licencia: licenciaNumero,
        pais_emision: estadoEmision,
        fecha_vencimiento: fechaVencimiento,
      },
      renta: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        metodo_pago: seleccionPago == 1 ? 'tarjeta' : 'efectivo',
        id_carro: idCarro,
        id_cliente: identificacion,
        dias_duracion: dias,
        total_pago: Number(tarifaSeleccionada) * dias,
      },
    };

    try {
      const respuesta = await api.post('admin/rentas', { body: datosEnvio });
      if (respuesta.err) {
        toast.warning(respuesta.message || 'Ocurrió un error');
        return;
      }

      toast.success(respuesta.message || 'Renta creada', {
        autoClose: 3000,
        onClose: () => navigate('/carros'),
      });
    } catch (err) {
      console.error('Error al enviar:', err);
      toast.warning('Ocurrió un error');
    }
  };

  return (
    <section>
      <Volver title="Volver a rentas" to="/admin/rentas" />
      <div className="p-8 bg-[#F4F4F7] min-h-screen flex flex-col items-center rounded-xl mt-8">
        <div className="w-full md:w-3/4">
          <h1>Agregar Renta</h1>
          <div className="mb-8">
            <progress
              max="100"
              value={progress}
              className="w-full h-2 rounded-lg [&::-webkit-progress-value]:bg-gray-700 [&::-moz-progress-bar]:bg-gray-700"
            ></progress>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                    currentStep >= step.number
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                <p className="text-sm text-center text-gray-700">
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row mt-12 gap-8 justify-center">
            <div>
              {currentStep === 1 ? (
                <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-2xl">
                  <h1>Información Personal</h1>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label htmlFor="identificacion">Identificación</label>
                        <input
                          type="text"
                          required
                          value={identificacion}
                          onChange={(e) => setIdentificacion(e.target.value)}
                          id="identificacion"
                          placeholder="Tu identificación"
                          className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.identificacion && (
                          <p className="text-red-500 text-sm">
                            {errors.identificacion}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="nombres">Nombre</label>
                        <input
                          type="text"
                          required
                          value={nombres}
                          onChange={(e) => setNombres(e.target.value)}
                          id="nombres"
                          placeholder="Tu nombre"
                          className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.nombres && (
                          <p className="text-red-500 text-sm">
                            {errors.nombres}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="apellidos">Apellidos</label>
                        <input
                          type="text"
                          required
                          value={apellidos}
                          onChange={(e) => setApellidos(e.target.value)}
                          id="apellidos"
                          placeholder="Tus apellidos"
                          className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.apellidos && (
                          <p className="text-red-500 text-sm">
                            {errors.apellidos}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="correo">Correo</label>
                        <input
                          type="email"
                          required
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          id="correo"
                          placeholder="Tu correo"
                          className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.correo && (
                          <p className="text-red-500 text-sm">
                            {errors.correo}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                          type="text"
                          required
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          id="telefono"
                          placeholder="Tu teléfono"
                          className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.telefono && (
                          <p className="text-red-500 text-sm">
                            {errors.telefono}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="fechaNacimiento">
                          Fecha de Nacimiento
                        </label>
                        <input
                          type="date"
                          required
                          value={fechaNacimiento}
                          onChange={(e) => setFechaNacimiento(e.target.value)}
                          id="fechaNacimiento"
                          className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.fechaNacimiento && (
                          <p className="text-red-500 text-sm">
                            {errors.fechaNacimiento}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={primerPasoForm}
                        className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10 hover:bg-blue-600 transition-colors cursor-pointer"
                      >
                        Siguiente
                      </button>
                    </div>
                  </form>
                </div>
              ) : currentStep === 2 ? (
                <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-2xl">
                  <h1>Información de Licencia y Dirección</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="licenciaNumero">Número de Licencia</label>
                      <input
                        type="text"
                        required
                        value={licenciaNumero}
                        onChange={(e) => setLicenciaNumero(e.target.value)}
                        id="licenciaNumero"
                        placeholder="Tu número de licencia"
                        className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                      />
                      {errors.licenciaNumero && (
                        <p className="text-red-500 text-sm">
                          {errors.licenciaNumero}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="estadoEmision">Estado de Emisión</label>
                      <input
                        type="text"
                        required
                        value={estadoEmision}
                        onChange={(e) => setEstadoEmision(e.target.value)}
                        id="estadoEmision"
                        placeholder="Tu estado de emisión"
                        className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                      />
                      {errors.estadoEmision && (
                        <p className="text-red-500 text-sm">
                          {errors.estadoEmision}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="fechaVencimiento">
                        Fecha de Vencimiento
                      </label>
                      <input
                        type="date"
                        required
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                        id="fechaVencimiento"
                        className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                      />
                      {errors.fechaVencimiento && (
                        <p className="text-red-500 text-sm">
                          {errors.fechaVencimiento}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => volverPaso(1)}
                      className="w-full md:w-auto border bg-white text-gray-700 px-4 py-2 rounded-lg shadow-xl mt-10 hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={segundoPasoForm}
                      className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10 hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              ) : currentStep === 3 ? (
                <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-2xl">
                  <h1>Seleccionar Carro, Fechas y Método de Pago</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="fechaInicio">Fecha de Inicio</label>
                      <input
                        type="date"
                        required
                        value={fechaInicio}
                        onChange={(e) => {
                          setFechaInicio(e.target.value);
                          calcularDias(e.target.value, fechaFin);
                        }}
                        id="fechaInicio"
                        className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                      />
                      {errors.fechaInicio && (
                        <p className="text-red-500 text-sm">
                          {errors.fechaInicio}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="fechaFin">Fecha de Fin</label>
                      <input
                        type="date"
                        required
                        value={fechaFin}
                        onChange={(e) => {
                          setFechaFin(e.target.value);
                          calcularDias(fechaInicio, e.target.value);
                        }}
                        id="fechaFin"
                        className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                      />
                      {errors.fechaFin && (
                        <p className="text-red-500 text-sm">
                          {errors.fechaFin}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="idCarro">Seleccionar Carro</label>
                      <select
                        value={idCarro}
                        onChange={(e) => {
                          setIdCarro(e.target.value);
                          const carro = carros.find(
                            (c) => c.id_carro === e.target.value
                          );
                          setTarifaSeleccionada(carro ? carro.tarifa : 0);
                        }}
                        id="idCarro"
                        className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                      >
                        <option value="">Selecciona un carro</option>
                        {carros.map((carro) => (
                          <option key={carro.id_carro} value={carro.id_carro}>
                            {carro.nombre} - ${carro.tarifa}/día
                          </option>
                        ))}
                      </select>
                      {errors.idCarro && (
                        <p className="text-red-500 text-sm">{errors.idCarro}</p>
                      )}
                    </div>
                  </div>

                  <h2 className="mt-8">Método de Pago</h2>
                  <div
                    onClick={() => setSeleccionPago(1)}
                    className="flex items-center gap-4 mt-4 cursor-pointer"
                  >
                    <div
                      className={`h-2 w-2 rounded-full border-1 ${
                        seleccionPago == 1 ? 'bg-gray-700' : 'bg-white'
                      }`}
                    ></div>
                    <CreditCard />
                    <h1>Tarjeta de crédito/débito</h1>
                  </div>
                  <p className="text-[#6B7280] text-sm mt-2 pl-6">
                    Pago seguro con tarjeta. Se procesará al momento de la
                    confirmación.
                  </p>

                  <div
                    onClick={() => setSeleccionPago(2)}
                    className="flex items-center gap-4 mt-4 cursor-pointer"
                  >
                    <div
                      className={`h-2 w-2 rounded-full border-1 ${
                        seleccionPago == 2 ? 'bg-gray-700' : 'bg-white'
                      }`}
                    ></div>
                    <CircleDollarSign />
                    <h1>Efectivo</h1>
                  </div>
                  <p className="text-[#6B7280] text-sm mt-2 pl-6">
                    Pago en efectivo al momento de recoger el vehículo en
                    nuestra sucursal.
                  </p>
                  {errors.seleccionPago && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.seleccionPago}
                    </p>
                  )}

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => volverPaso(2)}
                      className="w-full md:w-auto border bg-white text-gray-700 px-4 py-2 rounded-lg shadow-xl mt-10 hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={tercerPasoForm}
                      className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10 hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-2xl">
                  <h1>Confirmación</h1>
                  <h3 className="mt-6">Resumen de Información</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                    <div>
                      <p className="text-[#6B7280]">Conductor</p>
                      <p>
                        {nombres} {apellidos}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Email</p>
                      <p>{correo}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Teléfono</p>
                      <p>{telefono}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Fecha Inicio</p>
                      <p>{fechaInicio}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Fecha Fin</p>
                      <p>{fechaFin}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Días</p>
                      <p>{dias}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Carro</p>
                      <p>
                        {carros.find((c) => c.id_carro === idCarro)?.nombre}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Total Pago</p>
                      <p>${tarifaSeleccionada * dias}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Método de Pago</p>
                      <p>{seleccionPago == 1 ? 'Tarjeta' : 'Efectivo'}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => volverPaso(3)}
                      className="w-full md:w-auto border bg-white text-gray-700 px-4 py-2 rounded-lg shadow-xl mt-10 hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={confirmacion}
                      className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10 hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}

export default AgregarRenta;
