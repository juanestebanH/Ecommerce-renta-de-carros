const express = require('express');
const router = express.Router();
const rentasRecientesControllers = require('../../controllers/admin/rentasRecientesControllers');

router.get('/', rentasRecientesControllers);

module.exports = router;
