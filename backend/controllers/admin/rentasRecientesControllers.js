const rentasRecientesModel = require('../../models/admin/rentasRecientesModel');

const rentasRecientesControllers = async (req, res) => {
  try {
    const respuesta = await rentasRecientesModel();

    if (!respuesta) {
      return res.status(401).json({ mensaje: 'Error interno del servidor' });
    } else {
      res.status(200).json({ data: respuesta });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = rentasRecientesControllers;
