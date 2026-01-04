const supabase = require('../../config/conexion');

const pagosModel = {
  agregarPago: async (data) => {
    try {
      const nuevoPago = {
        id_pago: data.id_pago,
        id_renta: data.id_renta,
        metodo_pago: data.metodo_pago,
        total_pago: data.total_pago,
        fecha_pago: data.fecha_registro,
        estado: data.metodo_pago == 'efectivo' ? 'pendiente' : 'realizado',
      };
      const { error } = await supabase.from('pagos').insert([nuevoPago]);
      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model Agregarpago:', error.message);
      return false;
    }
  },
};

module.exports = pagosModel;
