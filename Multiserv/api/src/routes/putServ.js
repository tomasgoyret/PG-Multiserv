const express = require("express");
const router = express.Router();
const putServ = require("../controller/putServ");

router.put("/:id", putServ);

module.exports = router;