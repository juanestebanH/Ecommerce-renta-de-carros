const marcasModel = require('../../models/admin/marcasModel');

const marcasController = {
  listaMarcas: async (req, res) => {
    try {
      const marcas = await marcasModel.ListaMarcas();
      res.status(200).json({ data: marcas });
    } catch (error) {
      console.error('Error en Controller listaMarcas:', error);
      res.status(500).json({ message: 'Error al obtener las marcas' });
    }
  },
};

module.exports = marcasController;
