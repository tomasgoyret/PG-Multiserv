const express = require("express");
const router = express.Router();
const deleteCitas = require('../controller/deleteCitas');

router.delete("/:id", deleteCitas);

module.exports = router;