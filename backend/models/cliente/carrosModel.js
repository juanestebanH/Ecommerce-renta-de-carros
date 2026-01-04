const supabase = require('../../config/conexion');

const carrosModel = {
  // =====================================
  // LISTAR CARROS (no desactivados)
  // =====================================
  ListarCarros: async () => {
    try {
      const { data, error } = await supabase
        .from('carros')
        .select(
          `nombre,
           id_carro,
           id_marca,
           ano,
           id_categoria,
           capacidad,
           tarifa,
           foto,
           combustible,
           transmision`
        )
        .eq('estado', 'disponible');

      if (error) throw error;

      return data; // igual que antes
    } catch (error) {
      console.error('Error en Model ListarCarros:', error.message);
    }
  },

  // =====================================
  // BUSCAR CARRO POR PLACA
  // =====================================
  BuscarCarro: async (placa) => {
    try {
      const { data, error } = await supabase
        .from('carros')
        .select('*')
        .eq('id_carro', placa)
        .neq('estado', 'desactivado')
        .limit(1);

      if (error) throw error;

      return data[0] || null; // igual que antes: devolver el primer registro
    } catch (error) {
      console.error('Error en Model BuscarCarro:', error.message);
    }
  },

  modficarestadoCarro: async (placa) => {
    try {
      const { error } = await supabase
        .from('carros')
        .update({ estado: 'renta' })
        .eq('id_carro', placa);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model estadoiCarro:', error.message);
      return false;
    }
  },
};

module.exports = carrosModel;
