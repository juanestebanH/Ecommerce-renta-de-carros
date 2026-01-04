const supabase = require('../../config/conexion');
const bcrypt = require('bcrypt');

const usuariosModel = {
  listarUsuarios: async () => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .neq('estado', 'inactivo')
        .order('nombre', { ascending: true });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error en Model listarUsuarios:', error.message);
      return null;
    }
  },

  agregarUsuario: async (data) => {
    try {
      const hashedPassword = await bcrypt.hash(data.contrasena, 10);
      const NuevoUsuario = {
        id_usuario: data.id_usuario,
        nombre: data.nombres,
        email: data.email,
        contrasena: hashedPassword,
        rol: data.rol,
        estado: 'activo',
      };
      const { error } = await supabase.from('usuarios').insert([NuevoUsuario]);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model agregarUsuario:', error.message);
      return false;
    }
  },

  buscarUsuario: async (id_usuario) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id_usuario', id_usuario)
        .maybeSingle();

      if (error) throw error;

      return data; // devuelve el objeto del usuario
    } catch (error) {
      console.error('Error en Model buscarUsuario:', error.message);
      return null;
    }
  },

  actualizarUsuario: async (id_usuario, data) => {
    try {
      const updateData = {
        nombre: data.nombres,
        email: data.email,
        rol: data.rol,
      };
      if (data.contrasena) {
        updateData.contrasena = await bcrypt.hash(data.contrasena, 10);
      }
      const { error } = await supabase
        .from('usuarios')
        .update(updateData)
        .eq('id_usuario', id_usuario);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model actualizarUsuario:', error.message);
      return false;
    }
  },

  desactivarUsuario: async (id_usuario) => {
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ estado: 'inactivo' })
        .eq('id_usuario', id_usuario);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error en Model desactivarUsuario:', error.message);
      return false;
    }
  },
};

module.exports = usuariosModel;
