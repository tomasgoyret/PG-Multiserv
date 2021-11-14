const express = require("express");
const router = express.Router();
const postServ = require("../controller/postServ");

router.post("/", postServ);

module.exports = router;