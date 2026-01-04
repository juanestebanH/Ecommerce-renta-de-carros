const estadoFlotaControllers = require('../../controllers/admin/estadoFlotasControllers');
const express = require('express');
const router = express.Router();

router.get('/', estadoFlotaControllers);

module.exports = router;
