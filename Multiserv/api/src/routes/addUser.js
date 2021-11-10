const express = require("express");
const router = express.Router();
const postUser = require('../controller/postUser');


router.post("/", postUser);

module.exports = router;