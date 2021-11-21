const express = require("express");
const router = express.Router();
const payService = require("../controller/payServ");

router.post("/", payService.pago);

module.exports = router;