const express = require("express");
const router = express.Router();
const deleteUser = require("../controller/deleteUser");

router.get("/:id", deleteUser)

module.exports = router;