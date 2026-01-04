// models for admin login
const supabase = require('../../config/conexion');

const LoginModel = {
  login: async (identificacion) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id_usuario', identificacion)
        .limit(1);

      if (error) throw error;

      return data[0];
    } catch (error) {
      console.error('Error en loginModel:', error.message);
      return null;
    }
  },
};

module.exports = LoginModel;
