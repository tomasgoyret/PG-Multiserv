const express = require("express");
const router = express.Router();
const putUbicacion = require("../controller/putUbicacion");

router.put("/:id", putUbicacion);

module.exports = router;