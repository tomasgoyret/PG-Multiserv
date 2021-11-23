const express = require("express");
const router = express.Router();
const putHorarios = require('../controller/putHorarios.js');

router.put("/:id", putHorarios);

module.exports = router;