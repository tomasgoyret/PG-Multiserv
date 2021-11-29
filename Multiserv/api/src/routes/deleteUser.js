const express = require("express");
const router = express.Router();
const deleteUser = require("../controller/deleteUser");

router.delete("/:uidClient", deleteUser)

module.exports = router;
