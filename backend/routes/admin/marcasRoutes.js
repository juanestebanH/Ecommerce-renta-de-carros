const marcasController = require('../../controllers/admin/marcasControllers');
const express = require('express');
const router = express.Router();

router.get('/', marcasController.listaMarcas);

module.exports = router;
