const express = require("express");
const router = express.Router();
const { getServices, getServicesId} = require("../controller/getServ");

router.get("/", getServices);
router.get("/:id", getServicesId);

module.exports = router;