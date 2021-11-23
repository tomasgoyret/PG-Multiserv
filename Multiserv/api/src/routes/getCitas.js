const express = require("express");
const router = express.Router();
const getCitas = require('../controller/getCitas');

router.get('/:uidClient', getCitas);

module.exports = router;