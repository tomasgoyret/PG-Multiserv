const express = require("express");
const router = express.Router();
const { getServ, getServId} = require("../controller/getServ");

router.get("/", getServ);
router.get("/:id", getServId);

module.exports = router;