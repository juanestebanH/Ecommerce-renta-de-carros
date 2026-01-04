const carrosModel = require('../../models/cliente/carrosModel');

const carrosControllers = {
  listarCarros: async (req, res) => {
    try {
      const carros = await carrosModel.ListarCarros();

      if (carros) {
        res.status(200).json(carros);
      } else {
        res.status(500).json({ message: 'Error al listar los vehículos' });
      }
    } catch (error) {
      console.error('Error en Controller ListarCarros:', error);
      res.status(500).json({ message: 'Error al listar los vehículos' });
    }
  },

  DetalleCarro: async (req, res) => {
    const { placa } = req.params;
    try {
      const carro = await carrosModel.BuscarCarro(placa);
      if (carro) {
        res.status(200).json(carro);
      } else {
        res.status(404).json({ message: 'Vehículo no encontrado' });
      }
    } catch (error) {
      console.error('Error en Controller DetalleCarro:', error);
      res
        .status(500)
        .json({ message: 'Error al obtener el detalle del vehículo' });
    }
  },
};

module.exports = carrosControllers;
