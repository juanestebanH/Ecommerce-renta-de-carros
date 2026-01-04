const express = require('express');
const router = express.Router();
const rentasControllrs = require('../../controllers/cliente/rentasControllers');

router.post('/', rentasControllrs.agregarRenta);
router.get('/:id_cliente/:estado', rentasControllrs.rentasCliente);

module.exports = router;
