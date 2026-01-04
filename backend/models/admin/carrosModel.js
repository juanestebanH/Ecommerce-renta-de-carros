const supabase = require('../../config/conexion');

const carrosModel = {
  // ==============================
  // Buscar un carro por placa
  // ==============================
  BuscarCarro: async (placa) => {
    try {
      const { data, error } = await supabase
        .from('carros')
        .select('*')
        .eq('id_carro', placa)
        .single(); // trae 1 fila

      if (error) throw error;

      return data; // devuelve el objeto del carro
    } catch (error) {
      console.error('Error en Model BuscarCarro:', error.message);
      return null;
    }
  },

  // ==============================
  // Agregar un nuevo vehículo
  // ==============================
  AgregarVehiculo: async (data) => {
    try {
      const nuevoCarro = {
        id_carro: data.id_carro.toUpperCase(),
        ano: data.ano.toLowerCase(),
        id_marca: data.id_marca.toLowerCase(),
        id_categoria: data.id_categoria.toLowerCase(),
        combustible: data.combustible.toLowerCase(),
        capacidad: data.capacidad,
        seguro: data.seguro,
        transmision: data.transmision,
        aire_acondicionado: data.aire_acondicionado,
        bluetooth: data.bluetooth,
        camara_reversa: data.camara_reversa,
        freno_abs: data.freno_abs,
        control_estabilidad: data.control_estabilidad,
        puertos_usb: data.puertos_usb,
        sistema_sonido: data.sistema_sonido,
        airbags_frontales: data.airbags_frontales,
        airbags_laterales: data.airbags_laterales,
        sistema_frenos_abs: data.sistema_frenos_abs,
        alarma_antirrobo: data.alarma_antirrobo,
        luces_led: data.luces_led,
        foto: data.foto,
        estado: data.estado.toLowerCase(),
        nombre: data.nombre.toLowerCase(),
        tarifa: data.tarifa,
      };

      const { error } = await supabase.from('carros').insert([nuevoCarro]);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model AgregarVehiculo:', error.message);
      return false;
    }
  },

  // ==============================
  // Actualizar un vehículo
  // ==============================
  ActualizarVehiculo: async (placa, data) => {
    try {
      const camposActualizar = {};

      // Solo agregar campos que se enviaron
      if (data.nombre) camposActualizar.nombre = data.nombre.toLowerCase();
      if (data.ano) camposActualizar.ano = data.ano.toLowerCase();
      if (data.id_marca) camposActualizar.id_marca = data.id_marca.toLowerCase();
      if (data.id_categoria) camposActualizar.id_categoria = data.id_categoria.toLowerCase();
      if (data.combustible) camposActualizar.combustible = data.combustible.toLowerCase();
      if (data.capacidad) camposActualizar.capacidad = data.capacidad;
      if (data.seguro !== undefined) camposActualizar.seguro = data.seguro;
      if (data.transmision) camposActualizar.transmision = data.transmision;
      if (data.aire_acondicionado !== undefined) camposActualizar.aire_acondicionado = data.aire_acondicionado;
      if (data.bluetooth !== undefined) camposActualizar.bluetooth = data.bluetooth;
      if (data.camara_reversa !== undefined) camposActualizar.camara_reversa = data.camara_reversa;
      if (data.freno_abs !== undefined) camposActualizar.freno_abs = data.freno_abs;
      if (data.control_estabilidad !== undefined) camposActualizar.control_estabilidad = data.control_estabilidad;
      if (data.puertos_usb !== undefined) camposActualizar.puertos_usb = data.puertos_usb;
      if (data.sistema_sonido !== undefined) camposActualizar.sistema_sonido = data.sistema_sonido;
      if (data.airbags_frontales !== undefined) camposActualizar.airbags_frontales = data.airbags_frontales;
      if (data.airbags_laterales !== undefined) camposActualizar.airbags_laterales = data.airbags_laterales;
      if (data.sistema_frenos_abs !== undefined) camposActualizar.sistema_frenos_abs = data.sistema_frenos_abs;
      if (data.alarma_antirrobo !== undefined) camposActualizar.alarma_antirrobo = data.alarma_antirrobo;
      if (data.luces_led !== undefined) camposActualizar.luces_led = data.luces_led;
      if (data.foto) camposActualizar.foto = data.foto;
      if (data.estado) camposActualizar.estado = data.estado.toLowerCase();
      if (data.tarifa) camposActualizar.tarifa = data.tarifa;

      const { error } = await supabase
        .from('carros')
        .update(camposActualizar)
        .eq('id_carro', placa);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model ActualizarVehiculo:', error.message);
      return false;
    }
  },

  // ==============================
  // Listar carros activos
  // ==============================
  ListarCarros: async () => {
    try {
      const { data, error } = await supabase
        .from('carros')
        .select(
          'nombre, id_marca, id_carro, ano, id_categoria, capacidad, tarifa, foto, estado, combustible, transmision'
        )
        .neq('estado', 'desactivado'); // equivalente a WHERE estado <> 'desactivado'

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error en Model ListarCarros:', error.message);
      return [];
    }
  },

  // ==============================
  // Desactivar carro (soft delete)
  // ==============================
  DesactivarCarro: async (placa) => {
    try {
      const { error } = await supabase
        .from('carros')
        .update({ estado: 'desactivado' })
        .eq('id_carro', placa);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model DesactivarCarro:', error.message);
      return false;
    }
  },

  // actualizar estado del carro
  ActualizarEstadoCarro: async (placa, estado) => {
    try {
      const { error } = await supabase
        .from('carros')
        .update({ estado: estado })
        .eq('id_carro', placa);
      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model ActualizarEstadoCarro:', error.message);
    }
  },
};

module.exports = carrosModel;
