const express = require("express");
const router = express.Router();
const getUsers = require("../controller/getUsers");

router.get("/", getUsers);



module.exports = router;