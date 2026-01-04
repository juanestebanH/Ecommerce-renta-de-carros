const express = require('express');
const router = express.Router();
const clientesControllers = require('../../controllers/admin/clientesControllers');

router.get('/', clientesControllers.listarClientes);
router.post('/', clientesControllers.crearCliente);
router.get('/:id_cliente', clientesControllers.listaRentasCliente);

module.exports = router;
