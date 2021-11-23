const express = require("express");
const router = express.Router();
const getHorarios = require('../controller/getHorarios');

//id del servicio
router.get("/:id", getHorarios); 

module.exports = router;