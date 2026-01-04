const supabase = require('../../config/conexion');

const estadoFlotaModel = {
  carrosDisponibles: async () => {
    try {
      const { count, error } = await supabase
        .from('carros')
        .select('*', { count: 'exact', head: true })
        .eq('estado', 'disponible');

      if (error) throw error;

      return count;
    } catch (error) {
      console.error('Error en Model carrosDisponibles:', error.message);
      return 0;
    }
  },

  carrosRentas: async () => {
    try {
      const { count, error } = await supabase
        .from('carros')
        .select('*', { count: 'exact', head: true })
        .eq('estado', 'renta');

      if (error) throw error;

      return count;
    } catch (error) {
      console.error('Error en Model carrosRentas:', error.message);
      return 0;
    }
  },
};

module.exports = estadoFlotaModel;
