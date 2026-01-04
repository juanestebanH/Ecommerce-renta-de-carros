const supabase = require('../../config/conexion');

const marcasModel = {
  // ============================
  // Buscar marca por nombre
  // ============================
  BuscarMarcaPorNombre: async (nombre) => {
    try {
      const { data, error } = await supabase
        .from('marcas')
        .select('*')
        .eq('nombre', nombre)
        .limit(1);

      if (error) throw error;

      return data[0]; // igual que rows[0]
    } catch (error) {
      console.error('Error en Model BuscarMarcaPorNombre:', error.message);
      return null;
    }
  },

  // ============================
  // Agregar nueva marca
  // ============================
  AgregarMarca: async (nombre) => {
    try {
      const { error } = await supabase
        .from('marcas')
        .insert([{ nombre: nombre.toLowerCase() }]);

      if (error) throw error;

      return true; // equivalente a affectedRows === 1
    } catch (error) {
      console.error('Error en Model AgregarMarca:', error.message);
      return false;
    }
  },

  // ============================
  // Listar marcas
  // ============================
  ListaMarcas: async () => {
    try {
      const { data, error } = await supabase.from('marcas').select('*');

      if (error) throw error;

      return data; // igual que rows
    } catch (error) {
      console.error('Error en Model ListaMarcas:', error.message);
      return [];
    }
  },
};

module.exports = marcasModel;
