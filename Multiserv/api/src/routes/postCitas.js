const express = require("express");
const router = express.Router();
const postCitas = require('../controller/postCitas');

//id del serviciode la cita
router.post("/:id", postCitas);

module.exports = router;