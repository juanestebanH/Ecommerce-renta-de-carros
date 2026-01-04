const supabase = require('../../config/conexion');

const rentasModels = {
  rentarVehiculo: async (data) => {
    try {
      const nuevaRenta = {
        id_renta: data.id_renta,
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        fecha_registro: data.fecha_registro,
        dias_duracion: data.dias_duracion,
        estado: 'activa',
        id_carro: data.id_carro,
        id_cliente: data.id_cliente,
      };

      const { error } = await supabase.from('rentas').insert([nuevaRenta]);
      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model AgregarRenta:', error.message);
      return false;
    }
  },
};

module.exports = rentasModels;
