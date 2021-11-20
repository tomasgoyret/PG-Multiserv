const express = require("express");
const router = express.Router();
const getFav = require("../controller/getFav");

router.get("/:uidClient", getFav);

module.exports = router;