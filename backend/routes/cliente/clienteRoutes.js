const express = require('express');
const router = express.Router();
const loginControllers = require('../../controllers/cliente/loginControllers');

router.post('/', loginControllers.registrarLogin);

module.exports = router;
