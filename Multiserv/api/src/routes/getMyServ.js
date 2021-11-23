const express = require("express");
const router = express.Router();
const getMyServ = require("../controller/getMyServ");

router.get("/:uidClient", getMyServ);

module.exports = router;