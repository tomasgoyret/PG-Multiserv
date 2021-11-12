const express = require("express");
const router = express.Router();
const getOrderBy = require("../controller/getOrderBy");

router.get("/", getOrderBy);

module.exports = router; 