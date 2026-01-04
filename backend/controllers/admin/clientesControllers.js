const clientesModel = require('../../models/cliente/clientesModel');

const clientesControllers = {
  listarClientes: async (req, res) => {
    try {
      const clientes = await clientesModel.listarClientes();
      if (clientes) {
        res.status(200).json(clientes);
      } else {
        res.status(404).json({ error: 'No se encontraron clientes' });
      }
    } catch (error) {
      console.error('Error en listarClientes:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  crearCliente: async (req, res) => {
    try {
      const data = req.body;

      // Validar si el cliente ya existe
      const clienteExistente = await clientesModel.buscarCliente(
        data.id_cliente
      );
      if (clienteExistente) {
        return res
          .status(400)
          .json({ message: 'El cliente con esta identificación ya existe' });
      }

      const result = await clientesModel.agregarCliente(data);
      if (result) {
        res.status(201).json({ message: 'Cliente agregado exitosamente' });
      } else {
        res.status(400).json({ message: 'Error al agregar el cliente' });
      }
    } catch (error) {
      console.error('Error en crearCliente:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  listaRentasCliente: async (req, res) => {
    const { id_cliente } = req.params;
    try {
      const rentas = await clientesModel.listaRentasCliente(id_cliente);
      if (rentas) {
        res.status(200).json(rentas);
      } else {
        res
          .status(404)
          .json({ error: 'No se encontraron rentas para el cliente' });
      }
    } catch (error) {
      console.error('Error en listaRentasCliente:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = clientesControllers;
