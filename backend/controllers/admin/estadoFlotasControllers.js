const estadoFlotaModel = require('../../models/admin/estadoFlotaModel');

const estadoFlotaControllers = async (req, res) => {
  try {
    const disponible = await estadoFlotaModel.carrosDisponibles();
    const rentas = await estadoFlotaModel.carrosRentas();

    if (disponible == null || rentas == null) {
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    return res.status(200).json({
      data: {
        disponible: disponible,
        rentas: rentas,
      },
    });
  } catch (error) {
    console.error('Error en controllers estado de flota:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = estadoFlotaControllers;
