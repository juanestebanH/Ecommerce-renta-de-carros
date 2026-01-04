const carrosControllers = require('../../controllers/cliente/carrosControllers');
const express = require('express');
const router = express.Router();

router.get('/', carrosControllers.listarCarros);
router.get('/:placa', carrosControllers.DetalleCarro);

module.exports = router;
