const express = require("express");
const router = express.Router();
const getCategorias = require("../controller/getCategorias");

router.get("/", getCategorias);

module.exports = router;