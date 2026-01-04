const usuariosModel = require('../../models/admin/usuariosModel');

const usuariosControllers = {
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await usuariosModel.listarUsuarios();
      if (usuarios) {
        res.status(200).json(usuarios);
      } else {
        res.status(404).json({ error: 'No se encontraron usuarios' });
      }
    } catch (error) {
      console.error('Error en listarUsuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  crearUsuario: async (req, res) => {
    try {
      const data = req.body;

      // Validar si el usuario ya existe
      const usuarioExistente = await usuariosModel.buscarUsuario(
        data.id_usuario
      );
      if (usuarioExistente) {
        return res
          .status(400)
          .json({ message: 'El usuario con esta identificación ya existe' });
      }

      const result = await usuariosModel.agregarUsuario(data);
      if (result) {
        res.status(201).json({ message: 'Usuario agregado exitosamente' });
      } else {
        res.status(400).json({ message: 'Error al agregar el usuario' });
      }
    } catch (error) {
      console.error('Error en crearUsuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  obtenerUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await usuariosModel.buscarUsuario(id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error en obtenerUsuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  actualizarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await usuariosModel.actualizarUsuario(id, data);
      if (result) {
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
      } else {
        res.status(400).json({ message: 'Error al actualizar el usuario' });
      }
    } catch (error) {
      console.error('Error en actualizarUsuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  desactivarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await usuariosModel.desactivarUsuario(id);
      if (result) {
        res.status(200).json({ message: 'Usuario desactivado exitosamente' });
      } else {
        res.status(400).json({ message: 'Error al desactivar el usuario' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = usuariosControllers;
