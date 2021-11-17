const express = require("express");
const router = express.Router();
const getDB = require('../controller/DB');

router.get("/", getDB);

module.exports = router;