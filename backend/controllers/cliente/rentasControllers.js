const rentaModel = require('../../models/cliente/rentasModel');
const clienteModel = require('../../models/cliente/clientesModel');
const pagosModel = require('../../models/cliente/pagosModel');
const carrosModel = require('../../models/cliente/carrosModel');
const dayjs = require('dayjs');

const rentasControllrs = {
  agregarRenta: async (req, res) => {
    const data = req.body;
    const cliente = data.cliente;
    const renta = data.renta;

    try {
      // primer paso verificar que exista el cliente
      const existe_cliente = await clienteModel.buscarCliente(
        cliente.id_cliente
      );

      let respuestaCliente;

      if (existe_cliente) {
        // si exoste actualizamos los datos de licencia
        respuestaCliente = await clienteModel.actualizarLicencias(cliente);
      } else {
        // si no existe lo agregaremos a la base de datos
        respuestaCliente = await clienteModel.agregarCliente(cliente);
      }

      if (!respuestaCliente) {
        return res.status(500).json({ message: 'Error al procesar cliente' });
      }

      // segundo paso logica de la renta

      // generar el id de la renta y pago
      const id_renta = rentasControllrs.generarIdRenta();
      const id_pago = rentasControllrs.generarIdpago();
      // fecha de registro para el pago y renta
      const fechaFormateada = dayjs().format('YYYY/MM/DD');

      renta.id_renta = id_renta;
      renta.id_pago = id_pago;
      renta.fecha_registro = fechaFormateada;
      let estadoRenta = await rentaModel.rentarVehiculo(renta);

      // 3 paso registrar pago
      if (estadoRenta) {
        await carrosModel.modficarestadoCarro(renta.id_carro);
        await pagosModel.agregarPago(renta);
        res.status(200).json({ message: 'Renta registrada' });
      } else {
        res
          .status(500)
          .json({ message: 'ocurrio un error, vuelva intentarlo' });
      }
    } catch (error) {
      console.error('Error en Controllers agregarRenta:', error);
      res.status(500).json({ message: 'ocurrio un error, vuelva intentarlo' });
    }
  },

  generarIdRenta: () => {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `RENT-${fecha}-${random}`;
  },

  generarIdpago: () => {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `PAGO-${fecha}-${random}`;
  },

  rentasCliente: async (req, res) => {
    // recibe por parametro
    const { id_cliente, estado } = req.params;

    try {
      const rentas = await clienteModel.reservasCliente(id_cliente, estado);

      if (rentas) {
        res.status(200).json(rentas);
      } else {
        res.status(500).json({ message: 'Error al obtener las rentas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las rentas' });
    }
  },
};

module.exports = rentasControllrs;
