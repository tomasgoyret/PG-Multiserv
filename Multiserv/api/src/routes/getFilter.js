const express = require("express");
const router = express.Router();
const getFilter = require("../controller/getFilter");

router.get("/", getFilter);

module.exports = router;