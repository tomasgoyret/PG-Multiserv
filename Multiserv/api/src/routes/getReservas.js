const express = require("express");
const router = express.Router();
const { getReservas } = require("../controller/getReservas");

router.get("/:id", getReservas);

module.exports = router;