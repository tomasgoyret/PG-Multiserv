const express = require("express");
const router = express.Router();
const postHorarios = require('../controller/postHorarios');

// id del servicio
router.post("/:idService", postHorarios);

module.exports = router;