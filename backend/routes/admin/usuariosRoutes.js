const express = require('express');
const router = express.Router();
const usuariosControllers = require('../../controllers/admin/usuariosControllers');

router.get('/', usuariosControllers.listarUsuarios);
router.post('/', usuariosControllers.crearUsuario);
router.get('/:id', usuariosControllers.obtenerUsuario);
router.put('/:id', usuariosControllers.actualizarUsuario);
router.delete('/:id', usuariosControllers.desactivarUsuario);

module.exports = router;
