const express = require("express");
const router = express.Router();
const postFav = require("../controller/postFav");

router.post("/", postFav);

module.exports = router;