const express = require("express");
const router = express.Router();

const totalControllers = require("../../controllers/admin/totalDashboardControllers");

router.get("/", totalControllers);

module.exports = router;
