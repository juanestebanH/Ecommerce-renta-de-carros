const totalDashboardModel = require('../../models/admin/totalDashboardModel');

const totalControllers = async (req, res) => {
  try {
    const total = await totalDashboardModel();

    if (!total) {
      return res.status(401).json({ mensaje: 'Error interno del servidor' });
    } else {
      res.status(200).json({ data: total });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = totalControllers;
