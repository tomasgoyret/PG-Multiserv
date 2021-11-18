const express = require("express");
const router = express.Router();
const editUser = require("../controller/putUser");

router.put("/:uidClient", editUser)

module.exports = router;