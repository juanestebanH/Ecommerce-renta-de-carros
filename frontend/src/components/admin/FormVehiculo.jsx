import { useState, useRef, useEffect } from 'react';
import { helpHttp } from '../../helpers/helperHttp';
import { marcas } from '../../helpers/marcas';
import { toast, ToastContainer } from 'react-toastify';

// estado inicial de formdata
const initialFormData = {
  id_carro: '',
  ano: '',
  id_marca: '',
  id_categoria: '',
  combustible: '',
  capacidad: '',
  seguro: false,
  transmision: '',
  aire_acondicionado: false,
  bluetooth: false,
  camara_reversa: false,
  freno_abs: false,
  control_estabilidad: false,
  puertos_usb: false,
  sistema_sonido: false,
  airbags_frontales: false,
  airbags_laterales: false,
  sistema_frenos_abs: false,
  alarma_antirrobo: false,
  luces_led: false,
  foto: null,
  estado: 'disponible',
  nombre: '',
  tarifa: '',
};

function FormVehiculo() {
  const [formData, setFormData] = useState(initialFormData);
  const [listaMarcas, setListaMarcas] = useState([]);

  const fileInputRef = useRef(null);

  const obtenerMarcas = async () => {
    const respuesta = await marcas();
    if (respuesta) {
      setListaMarcas(respuesta.data);
    }
  };

  useEffect(() => {
    obtenerMarcas();
  }, []);

  // funcion para los inputs
  const handleChange = (e) => {
    // Obtener los valores del input
    const { id, type, value, checked, files } = e.target;
    // Manejar diferentes tipos de input
    if (type === 'checkbox') {
      // Si es un checkbox, actualizar el estado con el valor de checked
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else if (type === 'file') {
      // Si es un input de tipo file, actualizar el estado con el archivo seleccionado
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      // Para otros tipos de input, actualizar el estado con el valor del input
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const buttonForm = async (e) => {
    e.preventDefault();

    // peticion asincrona a la API
    try {
      const api = helpHttp();
      const data = new FormData();
      // Agregar cada campo del formulario al objeto FormData
      for (const key in formData) {
        // Obtener el valor del campo
        let value = formData[key];

        // Si el campo es booleano, convertirlo a 1 o 0
        if (typeof value === 'boolean') {
          // Convierte true/false en 1/0
          value = value ? 1 : 0;
        }
        data.append(key, value);
      }

      const respuesta = await api.post('admin/carros', {
        body: data,
      });

      if (respuesta.err) {
        if (respuesta.status == 400) {
          toast.warning(respuesta.message);
        } else {
          toast.error(respuesta.message);
        }
      } else {
        toast.success(respuesta.message);

        // Reiniciar los inputs del formulario
        setFormData(initialFormData);

        // Limpiar visualmente el input de archivo
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <form onSubmit={buttonForm} enctype="multipart/form-data" method="POST">
      <div className="mt-15 border-[#6B7280] border-1 rounded-xl  bg-white p-4">
        <h1 className="text-lg text-[#6589FF]">Informacion Basica</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
          <div className="flex flex-col">
            <label htmlFor="nombre">Nombre del vehiculo</label>
            <input
              value={formData.nombre}
              type="text"
              id="nombre"
              onChange={handleChange}
              placeholder="Nombre del vehiculo"
              className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
              required
              title="El nombre no debe contener números ni caracteres especiales"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="id_carro">Placa</label>
            <input
              value={formData.id_carro}
              type="text"
              id="id_carro"
              required
              title='El formato debe ser "ABC-123"'
              onChange={handleChange}
              placeholder="eje: ABC-123"
              className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="ano">año</label>
            <input
              type="text"
              id="ano"
              value={formData.ano}
              pattern="^\d{4}$"
              maxLength="4"
              minLength="4"
              onChange={handleChange}
              placeholder="eje: 2020"
              className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
              required
              title="El año debe ser un número de 4 dígitos"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="combustible">Tipo de combustible</label>
            <select
              value={formData.combustible}
              onChange={handleChange}
              name="combustible"
              id="combustible"
              className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
              required
              title="Seleccione un tipo de combustible"
            >
              <option value="">Seleccione un tipo de combustible</option>
              <option value="gasolina">Gasolina</option>
              <option value="diesel">Diesel</option>
              <option value="electrico">Eléctrico</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="transmision">Transmisión</label>
            <select
              value={formData.transmision}
              name="transmision"
              onChange={handleChange}
              id="transmision"
              className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
              required
              title="Seleccione un tipo de transmisión"
            >
              <option value="">Seleccione un tipo de transmisión</option>
              <option value="manual">Manual</option>
              <option value="automatico">Automático</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="capacidad">Capacidad de pasajeros</label>
            <input
              value={formData.capacidad}
              type="number"
              id="capacidad"
              onChange={handleChange}
              placeholder="Número de pasajeros"
              className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
              required
              title="La capacidad debe ser un número minimo 1 y maximo 15"
              min="1"
              max="15"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="id_marca">Marca</label>
            <input
              type="text"
              id="id_marca"
              value={formData.id_marca}
              onChange={handleChange}
              placeholder="Marca del vehiculo"
              className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
              required
              title="La marca no debe contener números ni caracteres especiales"
              list="marcas-list"
            />
            <datalist id="marcas-list">
              {listaMarcas.map((marca) => (
                <option key={marca.nombre} value={marca.nombre} />
              ))}
            </datalist>
          </div>
          <div className="flex flex-col">
            <label htmlFor="id_categoria">Tipo de vehiculo</label>
            <select
              value={formData.id_categoria}
              onChange={handleChange}
              name="id_categoria"
              id="id_categoria"
              className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
              required
              title="seleccione un tipo de vehiculo"
            >
              <option value="">Seleccione un tipo de vehiculo</option>
              <option value="cars">Car</option>
              <option value="suvs">Suv</option>
              <option value="vans">Van</option>
              <option value="electricos">Eléctrico</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="tarifa">Tarifa diaria</label>
            <input
              value={formData.tarifa}
              onChange={handleChange}
              type="number"
              id="tarifa"
              placeholder="Tarifa diaria"
              className="bg-[#F4F4F7] w-full mt-2 p-3 rounded-lg outline-none"
              required
              title="La tarifa debe ser un número mayor a 0"
            ></input>
          </div>

          <div className="flex flex-col">
            <label htmlFor="foto">Foto</label>
            <input
              onChange={handleChange}
              type="file"
              id="foto"
              className="bg-[#F4F4F7]  mt-2 p-3 rounded-lg outline-none"
              accept="image/*"
              required
              title="Seleccione una foto del vehículo"
              ref={fileInputRef} // <-- Aquí se asigna el ref
            />
          </div>
        </div>
      </div>
      <div className="mt-6 border-[#6B7280] border-1 rounded-xl  bg-white p-4">
        <h1 className="text-lg text-[#6589FF]">Características del Vehículo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
          <div className="flex gap-2">
            <input
              checked={formData.aire_acondicionado}
              type="checkbox"
              id="aire_acondicionado"
              onChange={handleChange}
            />
            <label htmlFor="aire_acondicionado">Aire Acondicionado</label>
          </div>

          <div className="flex gap-2">
            <input
              checked={formData.bluetooth}
              type="checkbox"
              id="bluetooth"
              onChange={handleChange}
            />
            <label htmlFor="bluetooth">Bluetooth</label>
          </div>
          <div className="flex gap-2">
            <input
              checked={formData.camara_reversa}
              type="checkbox"
              id="camara_reversa"
              onChange={handleChange}
            />
            <label htmlFor="camara_reversa">Cámara de Reversa</label>
          </div>

          <div className="flex gap-2">
            <input
              checked={formData.freno_abs}
              type="checkbox"
              id="freno_abs"
              onChange={handleChange}
            />
            <label htmlFor="freno_abs">Freno abs</label>
          </div>

          <div className="flex gap-2">
            <input
              checked={formData.control_estabilidad}
              type="checkbox"
              id="control_estabilidad"
              onChange={handleChange}
            />
            <label htmlFor="control_estabilidad">Control de Estabilidad</label>
          </div>

          {/* <div className="flex gap-2">
            <input type="checkbox" id="cierre_centralizados" />
            <label htmlFor="cierre_centralizados">Cierre Centralizados</label>
          </div> */}

          <div className="flex gap-2">
            <input
              checked={formData.puertos_usb}
              type="checkbox"
              id="puertos_usb"
              onChange={handleChange}
            />
            <label htmlFor="puertos_usb">Puertos USB</label>
          </div>

          <div className="flex gap-2">
            <input
              checked={formData.sistema_sonido}
              type="checkbox"
              id="sistema_sonido"
              onChange={handleChange}
            />
            <label htmlFor="sistema_sonido">Sistema de Sonido</label>
          </div>
        </div>
      </div>
      <div className="mt-6 border-[#6B7280] border-1 rounded-xl  bg-white p-4">
        <h1 className="text-lg text-[#6589FF]">Opciones de Seguridad</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
            <div className="flex gap-2">
              <input
                checked={formData.airbags_frontales}
                type="checkbox"
                id="airbags_frontales"
                onChange={handleChange}
              />
              <label htmlFor="airbags_frontales">Airbags frontales</label>
            </div>
            <div className="flex gap-2">
              <input
                checked={formData.airbags_laterales}
                type="checkbox"
                id="airbags_laterales"
                onChange={handleChange}
              />
              <label htmlFor="airbags_laterales">Airbags laterales</label>
            </div>

            <div className="flex gap-2">
              <input
                checked={formData.sistema_frenos_abs}
                type="checkbox"
                id="sistema_frenos_abs"
                onChange={handleChange}
              />
              <label htmlFor="sistema_frenos_abs">sistema de frenos abs</label>
            </div>

            <div className="flex gap-2">
              <input
                checked={formData.alarma_antirrobo}
                type="checkbox"
                id="alarma_antirrobo"
                onChange={handleChange}
              />
              <label htmlFor="alarma_antirrobo">Alarma antirrobo</label>
            </div>

            <div className="flex gap-2">
              <input
                checked={formData.luces_led}
                type="checkbox"
                id="luces_led"
                onChange={handleChange}
              />
              <label htmlFor="luces_led">luces de dia led</label>
            </div>

            <div className="flex gap-2">
              <input
                checked={formData.seguro}
                type="checkbox"
                id="seguro"
                onChange={handleChange}
              />
              <label htmlFor="seguro">Seguro</label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-end mb-12">
        <button className="border-[#666666] border-1 rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-200 font-medium text-gray-600">
          Cancelar
        </button>

        <button
          type="submit"
          className="bg-[#6589FF] rounded-lg  py-2 px-4 cursor-pointer hover:bg-[#4B6EBA] text-white font-medium ml-6 "
        >
          Guardar vehiculo
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </form>
  );
}

export default FormVehiculo;
