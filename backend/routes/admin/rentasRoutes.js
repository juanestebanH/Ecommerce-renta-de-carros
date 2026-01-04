const express = require('express');
const router = express.Router();
const rentasController = require('../../controllers/admin/rentasControllers');

router.get('/:estado', rentasController.listarRentas);
router.post('/', rentasController.crearRenta);
router.put('/', rentasController.ActualizarRenta);
router.get('/detalle/:id_renta', rentasController.DetalleRenta);

module.exports = router;
