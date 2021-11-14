const express = require("express");
const router = express.Router();
const deleteServ = require("../controller/deleteServ");

router.delete("/:id", deleteServ);

module.exports = router;