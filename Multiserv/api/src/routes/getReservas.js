const express = require("express");
const router = express.Router();
const getReservas = require("../controller/getReservas");

router.post("/", getReservas);

module.exports = router;