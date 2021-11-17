const express = require("express");
const router = express.Router();
const postCategorias = require("../controller/postCategorias");

router.post("/", postCategorias);

module.exports = router;