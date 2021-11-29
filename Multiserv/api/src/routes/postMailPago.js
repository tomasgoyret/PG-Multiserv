const express = require("express");
const router = express.Router();
const postMailPago = require("../controller/postMailPago");

router.post("/", postMailPago);

module.exports = router;