const reportesModel = require('../../models/admin/ReportesModel');

const reportesControllers = {
  reportes: async (req, res) => {
    try {
      const topCarros = await reportesModel.topCarros();
      const topClientes = await reportesModel.topClientes();
      const topcategorias = await reportesModel.reportePorCategoria();

      if (topCarros || topClientes || topcategorias) {
        res.status(200).json({ topCarros, topClientes, topcategorias });
      } else {
        res.status(404).json({ message: 'No se encontraron reportes' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener los reportes',
        error: error.message,
      });
    }
  },
};

module.exports = reportesControllers;
