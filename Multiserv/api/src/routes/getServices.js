const express = require("express");
const router = express.Router();
const { getServices, getServicesId} = require("../controller/getServ");

router.get("/", getServices);
router.get("/:uid", getServicesId);

module.exports = router;