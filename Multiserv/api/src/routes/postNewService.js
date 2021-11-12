const express = require("express");
const router = express.Router();
const postNewService = require("../controller/postNewService");

router.post("/", postNewService);




module.exports = router;