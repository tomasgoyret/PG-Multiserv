const express = require("express");
const router = express.Router();
const deleteFav = require("../controller/deleteFav.js");

router.delete("/:id", deleteFav);

module.exports = router;