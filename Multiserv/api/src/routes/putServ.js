const express = require("express");
const router = express.Router();
const putServ = require("../controller/putServ");

router.put("/", putServ);

module.exports = router;