import { useState } from 'react';
import Volver from '../../components/cliente/Volver';
import { CreditCard, CircleDollarSign, CircleQuestionMark } from 'lucide-react';
import ResumenRenta from '../../components/cliente/ResumenRenta';
import { useLocation } from 'react-router-dom';
import { helpHttp } from '../../helpers/helperHttp';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RentarVehiculo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tarifa, fechaInicio, fechaFin, dias, nombreCarro } =
    location.state || {};
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
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});

  const [seleccionPago, setSeleccionPago] = useState(0);

  let id_carro = JSON.parse(localStorage.getItem('carroSeleccionado'));

  const steps = [
    { number: 1, title: 'Información Personal' },
    { number: 2, title: 'Licencia y Dirección' },
    { number: 3, title: 'Métodos de Pago' },
    { number: 4, title: 'Confirmación' },
  ];

  const progress = (currentStep / 4) * 100;

  const primerPasoForm = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!identificacion.trim())
      newErrors.identificacion = 'la identifiacion es requerida';
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
    if (Object.keys(newErrors).length) return;
    setCurrentStep(2);
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
    e?.preventDefault?.();
    const newErrors = {};
    if (seleccionPago == 1) {
      if (!nombreTarjeta.trim())
        newErrors.nombreTarjeta = 'El nombre del responsable es requerido';

      if (!numeroTarjeta.trim())
        newErrors.numeroTarjeta = 'El número de la tarjeta es requerido';

      if (!vencimiento.trim()) newErrors.vencimiento = 'El dd/aa es requerido';
      if (!cvv.trim()) newErrors.cvv = 'El cvv es requerido';
    }

    // Guardar errores y evitar avanzar si existen
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(4);
    }
  };

  const volverPaso = (numero) => {
    setCurrentStep(numero);
  };

  const confirmacion = async () => {
    const api = helpHttp();
    const metodoPago = seleccionPago == 1 ? 'tarjeta' : 'efectivo';

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
        metodo_pago: metodoPago,
        id_carro,
        id_cliente: identificacion,
        dias_duracion: dias,
        total_pago: Number(tarifa),
      },
    };

    try {
      const respuesta = await api.post('cliente/rentas', { body: datosEnvio });
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
      toast.warning(respuesta.message);
    }
  };

  return (
    <section>
      <Volver title="Volver a carros" ruta="/carros" />
      <div className="p-8 bg-[#F4F4F7] min-h-screen flex flex-col items-center ">
        <div className=" w-full md:w-3/4 ">
          <h1>Rentar Vehículo</h1>
          {/* Barra de progreso */}
          <div className="mb-8">
            <progress
              max="100"
              value={progress}
              className="w-full h-2 rounded-lg [&::-webkit-progress-value]:bg-gray-700 
             [&::-moz-progress-bar]:bg-gray-700"
            ></progress>
          </div>

          {/* Pasos */}
          <div className="grid grid-cols-4 gap-4">
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
                  <h1>Informacion personal</h1>

                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label htmlFor="identificacion">Identificacion</label>
                        <input
                          type="text"
                          required
                          value={identificacion}
                          onChange={(e) => setIdentificacion(e.target.value)}
                          id="nombres"
                          placeholder="tu identificacion"
                          className="w-full  bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.identificacion && (
                          <p className="text-red-500 text-sm ">
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
                          placeholder="tu nombre"
                          className="w-full  bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.nombres && (
                          <p className="text-red-500 text-sm ">
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
                          placeholder="tu apellidos"
                          className="w-full  bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.apellidos && (
                          <p className="text-red-500 text-sm ">
                            {errors.apellidos}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="Correo">Correo</label>
                        <input
                          type="email"
                          required
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          id="Correo"
                          placeholder="tu correo"
                          className="w-full  bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.correo && (
                          <p className="text-red-500 text-sm ">
                            {errors.correo}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="Telefono">Telefono</label>
                        <input
                          type="text"
                          required
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          id="Telefono"
                          placeholder="tu telefono"
                          className="w-full bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.telefono && (
                          <p className="text-red-500 text-sm ">
                            {errors.telefono}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="fecha">fecha nacimiento</label>
                        <input
                          type="date"
                          required
                          value={fechaNacimiento}
                          onChange={(e) => setFechaNacimiento(e.target.value)}
                          id="fecha"
                          className="w-full  bg-[#F4F4F7] rounded-lg p-2 mt-1"
                        />
                        {errors.fechaNacimiento && (
                          <p className="text-red-500 text-sm ">
                            {errors.fechaNacimiento}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={primerPasoForm}
                        className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10  hover:bg-blue-600 transition-colors cursor-pointer"
                      >
                        Siguiente
                      </button>
                    </div>
                  </form>
                </div>
              ) : currentStep === 2 ? (
                <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-2xl">
                  <h1>Informacion Licencia y Dirección</h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="numero_licencia">
                        Numero de Licencia
                      </label>
                      <input
                        type="text"
                        required
                        value={licenciaNumero}
                        onChange={(e) => setLicenciaNumero(e.target.value)}
                        id="numero_licencia"
                        placeholder="tu numero de licencia"
                        className="w-full  bg-[#F4F4F7] rounded-lg p-2 mt-1"
                      />
                      {errors.licenciaNumero && (
                        <p className="text-red-500 text-sm ">
                          {errors.licenciaNumero}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="estado_emision">estado de emision</label>
                      <input
                        type="text"
                        required
                        value={estadoEmision}
                        onChange={(e) => setEstadoEmision(e.target.value)}
                        id="estado_emision"
                        placeholder="tu estado de emision"
                        className="w-full  bg-[#F4F4F7] rounded-lg p-2 mt-1"
                      />
                      {errors.estadoEmision && (
                        <p className="text-red-500 text-sm ">
                          {errors.estadoEmision}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="fecha_vencimiento">
                        fecha de vencimiento
                      </label>
                      <input
                        type="date"
                        required
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                        id="fecha_vencimiento"
                        className="w-full  bg-[#F4F4F7] rounded-lg p-2 mt-1"
                      />
                      {errors.fechaVencimiento && (
                        <p className="text-red-500 text-sm ">
                          {errors.fechaVencimiento}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => volverPaso(1)}
                      className="w-full md:w-auto border-1 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-xl mt-10  hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={segundoPasoForm}
                      className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10  hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              ) : currentStep === 3 ? (
                <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-2xl">
                  <h1>Metodo de Pago</h1>

                  <div>
                    <div
                      onClick={() => setSeleccionPago(1)}
                      className="flex items-center gap-4 mt-8 cursor-pointer"
                    >
                      <div
                        className={`h-2 w-2 rounded-full border-1  ${
                          seleccionPago == 1 ? 'bg-gray-700' : 'bg-white'
                        }`}
                      ></div>
                      <CreditCard />
                      <h1>Tarjeta de credito/debito</h1>
                    </div>
                    <p className="text-[#6B7280] text-sm mt-2 pl-6">
                      Pago seguro con tarjeta. Se procesará al momento de la
                      confirmación.
                    </p>
                  </div>

                  <div>
                    <div
                      onClick={() => setSeleccionPago(2)}
                      className="flex items-center gap-4 mt-8 cursor-pointer"
                    >
                      <div
                        className={`h-2 w-2 rounded-full border-1  ${
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
                  </div>

                  {seleccionPago == 1 && (
                    <div className="p-2 bg-[#F4F4F7] mt-12 rounded-xl">
                      <h1>Informacion de la Tarjeta</h1>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2 mt-6 text-sm">
                          <label htmlFor="nombre_tarjeta">
                            Nombre de la Tarjeta
                          </label>
                          <input
                            placeholder="como aparece en la tarjeta"
                            type="text"
                            name="nombre_tarjeta"
                            value={nombreTarjeta}
                            onChange={(e) => setNombreTarjeta(e.target.value)}
                            id="nombre_tarjeta"
                            className="p-2 w-full bg-[#E4E4E7] rounded-xl "
                          />
                          {errors.nombreTarjeta && (
                            <p className="text-red-500 text-sm ">
                              {errors.nombreTarjeta}
                            </p>
                          )}
                        </div>
                        <div className="col-span-2 mt-6 text-sm">
                          <label htmlFor="numero_tarjeta">
                            Numero de la tarjeta
                          </label>
                          <input
                            placeholder="**** **** **** ****"
                            type="text"
                            name="numero_tarjeta"
                            value={numeroTarjeta}
                            onChange={(e) => setNumeroTarjeta(e.target.value)}
                            id="numero_tarjeta"
                            className="p-2 w-full bg-[#E4E4E7] rounded-xl "
                          />
                          {errors.numeroTarjeta && (
                            <p className="text-red-500 text-sm ">
                              {errors.numeroTarjeta}
                            </p>
                          )}
                        </div>

                        <div className=" mt-6 text-sm">
                          <label htmlFor="vencimiento">vencimiento</label>
                          <input
                            placeholder="dd/aa"
                            type="text"
                            name="vencimiento"
                            value={vencimiento}
                            onChange={(e) => setVencimiento(e.target.value)}
                            id="vencimiento"
                            className="p-2 w-full bg-[#E4E4E7] rounded-xl "
                          />
                          {errors.vencimiento && (
                            <p className="text-red-500 text-sm ">
                              {errors.vencimiento}
                            </p>
                          )}
                        </div>

                        <div className=" mt-6 text-sm">
                          <label htmlFor="cvv">CVV</label>
                          <input
                            placeholder="123"
                            type="text"
                            name="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            id="cvv"
                            className="p-2 w-full bg-[#E4E4E7] rounded-xl "
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm ">
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {seleccionPago == 2 && (
                    <div className="p-4 bg-[#E7EDFF] mt-12 rounded-xl border-1 border-[#6589FF] text-[#6589FF]">
                      <div className="flex gap-2 font-bold">
                        <CircleQuestionMark />
                        <h1>Pago en Efectivo</h1>
                      </div>

                      <div className="text-sm pl-8 mt-2">
                        <ul className="list-disc list-inside">
                          <li>
                            el pago se realizara al momento de recoger el
                            vehiculo
                          </li>
                          <li>horario lunes a domingo de 8:00 AM a 8:00 PM</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => volverPaso(2)}
                      className="w-full md:w-auto border-1 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-xl mt-10  hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={tercerPasoForm}
                      className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10  hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-2xl">
                  <h1>Todo listo para confirmar</h1>

                  <h3 className="mt-6">Resumen de Informacion</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                    <div>
                      <p className="text-[#6B7280]">Conductor</p>
                      <p>{nombres}</p>
                    </div>

                    <div>
                      <p className="text-[#6B7280]">Email</p>
                      <p>{correo}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">Telefono</p>
                      <p>{telefono}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280]">metodo Pago</p>
                      <p>{seleccionPago == 1 ? 'Tarjeta' : 'efectivo'}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => volverPaso(3)}
                      className="w-full md:w-auto border-1 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-xl mt-10  hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={confirmacion}
                      className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl mt-10  hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              )}
            </div>
            <ResumenRenta
              tarifa={tarifa}
              fechaInicio={fechaInicio}
              fechaFin={fechaFin}
              dias={dias}
              nombreCarro={nombreCarro}
            />
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

export default RentarVehiculo;
