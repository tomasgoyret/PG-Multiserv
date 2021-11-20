const express = require("express");
const router = express.Router();
const putCategoria = require("../controller/putCategorias");

router.put("/", putCategoria);

module.exports = router;