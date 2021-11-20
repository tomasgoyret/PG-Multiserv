const express = require("express");
const router = express.Router();
const deleteCategorias = require("../controller/deleteCategorias");

router.delete("/:id", deleteCategorias);

module.exports = router
