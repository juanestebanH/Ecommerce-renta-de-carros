const rentasModel = require('../../models/admin/rentasModel');
const carrosModel = require('../../models/admin/carrosModel');
const clienteModel = require('../../models/cliente/clientesModel');
const pagosModel = require('../../models/cliente/pagosModel');
const dayjs = require('dayjs');

const rentasController = {
  listarRentas: async (req, res) => {
    try {
      const { estado } = req.params;
      const rentas = await rentasModel.listarRentas(estado);

      if (rentas) {
        res.status(200).json(rentas);
      } else {
        res.status(404).json({ message: 'No se encontraron rentas' });
      }
    } catch (error) {
      res.status(404).json({ message: 'No se encontraron rentas' });
    }
  },

  crearRenta: async (req, res) => {
    const data = req.body;
    const cliente = data.cliente;
    const renta = data.renta;

    try {
      // Verificar que exista el cliente
      const existe_cliente = await clienteModel.buscarCliente(
        cliente.id_cliente
      );

      let respuestaCliente;

      if (existe_cliente) {
        // Si existe, actualizamos los datos de licencia
        respuestaCliente = await clienteModel.actualizarLicencias(cliente);
      } else {
        // Si no existe, lo agregamos a la base de datos
        respuestaCliente = await clienteModel.agregarCliente(cliente);
      }

      if (!respuestaCliente) {
        return res.status(500).json({ message: 'Error al procesar cliente' });
      }

      // Lógica de la renta
      const id_renta = rentasController.generarIdRenta();
      const id_pago = rentasController.generarIdPago();
      const fechaFormateada = dayjs().format('YYYY/MM/DD');

      renta.id_renta = id_renta;
      renta.id_pago = id_pago;
      renta.fecha_registro = fechaFormateada;
      let estadoRenta = await rentasModel.rentarVehiculo(renta);

      // Registrar pago
      if (estadoRenta) {
        await carrosModel.ActualizarEstadoCarro(renta.id_carro, 'renta');
        await pagosModel.agregarPago(renta);
        res.status(200).json({ message: 'Renta registrada' });
      } else {
        res
          .status(500)
          .json({ message: 'Ocurrió un error, vuelva a intentarlo' });
      }
    } catch (error) {
      console.error('Error en Controllers crearRenta:', error);
      res
        .status(500)
        .json({ message: 'Ocurrió un error, vuelva a intentarlo' });
    }
  },

  generarIdRenta: () => {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `RENT-${fecha}-${random}`;
  },

  generarIdPago: () => {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `PAGO-${fecha}-${random}`;
  },

  ActualizarRenta: async (req, res) => {
    try {
      const { id_renta, id_carro } = req.body;

      const actualizar = await rentasModel.ActualizarRenta(id_renta);
      const carro = await carrosModel.ActualizarEstadoCarro(
        id_carro,
        'disponible'
      );

      if (actualizar && carro) {
        res.status(200).json({ message: 'Renta completada con exito' });
      } else {
        res.status(404).json({ message: 'No se pudo completar la renta' });
      }
    } catch (error) {
      res.status(404).json({ message: 'No se pudo completar la renta' });
    }
  },

  DetalleRenta: async (req, res) => {
    try {
      const { id_renta } = req.params;
      const renta = await rentasModel.DetalleRenta(id_renta);
      if (renta) {
        res.status(200).json(renta);
      } else {
        res.status(404).json({ message: 'Renta no encontrada' });
      }
    } catch (error) {
      res.status(404).json({ message: 'Renta no encontrada' });
    }
  },
};

module.exports = rentasController;
