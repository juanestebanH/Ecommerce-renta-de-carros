const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/admin/loginControllers");

router.post("/", loginController.login);

module.exports = router;
