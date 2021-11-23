const express = require("express");
const router = express.Router();
const getCitas = require('../controller/getCitas');

router.getCitas('/:uidClient', getCitas);

module.exports = router;