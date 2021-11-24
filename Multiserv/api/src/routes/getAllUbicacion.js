const express = require("express");
const router = express.Router();
const getAllUbicacion = require("../controller/getAllUbicacion");

router.get("/", getAllUbicacion);

module.exports = router;