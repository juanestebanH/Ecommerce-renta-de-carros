const express = require('express');
const router = express.Router();
const reportesControllers = require('../../controllers/admin/reportesControllers');

router.get('/', reportesControllers.reportes);

module.exports = router;
