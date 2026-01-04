const clientesModel = require('../../models/cliente/clientesModel');

const loginControllers = {
  iniciarLogin: async (req, res) => {
    const data = req.body;

    try {
      // verificar que exista el cliente
      const respuestaCliente = await clientesModel.buscarCliente(
        data.identificacion
      );

      if (respuestaCliente) {
        if (respuestaCliente.email == data.email) {
          res.status(200).json({
            message: 'inicio de sesion, exitosa',
            data: respuestaCliente,
          });
        } else {
          res
            .status(401)
            .json({ message: 'identificacion o email incorrectos' });
        }
      } else {
        res.status(401).json({ message: 'identificacion o email incorrectos' });
      }
    } catch (error) {
      console.error('Error en Controller logincontrollers:', error);
      res
        .status(500)
        .json({ message: 'ocurrio un problema, vuelva intentarlo' });
    }
  },

  registrarLogin: async (req, res) => {
    const data = req.body;

    try {
      const clienteExistente = await clientesModel.buscarCliente(
        data.id_cliente
      );

      if (clienteExistente) {
        res.status(400).json({ message: 'El cliente ya existe' });
      } else {
        const respuesta = await clientesModel.agregarCliente(data);

        if (respuesta) {
          res.status(200).json({ message: 'registro exitoso' });
        } else {
          res
            .status(500)
            .json({ message: 'error en el registro, vuelva intentarlo' });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'error en el registro, vuelva intentarlo' });
    }
  },
};

module.exports = loginControllers;
