const express = require("express");
const router = express.Router();
const {getCitas, getCitasId} = require('../controller/getCitas');

router.get('/:uidClient', getCitasId);
router.get('/', getCitas);

module.exports = router;