const loginModel = require("../../models/admin/loginModel");
const bcrypt = require("bcrypt");

const loginController = {
  login: async (req, res) => {
    try {
      const { identificacion, contrasena } = req.body;

      // 1. Buscar usuario por identificación
      const usuario = await loginModel.login(identificacion);

      if (!usuario) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
      }

      // 2. Comparar contraseña ingresada con el hash en la BD
      const passwordValida = await bcrypt.compare(
        contrasena,
        usuario.contrasena
      );

      if (!passwordValida) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
      }

      // 3. Si es válida, responder
      res.status(200).json({ mensaje: "Login exitoso", data: usuario });
    } catch (error) {
      console.error("Error en el login:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  },
};

module.exports = loginController;
