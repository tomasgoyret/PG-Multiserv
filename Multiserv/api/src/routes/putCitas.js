const express = require("express");
const router = express.Router();
const putCitas = require('../controller/putCitas.js');

//id del servicio de la cita
router.put("/:id", putCitas);

module.exports = router;