const express = require("express");
const router = express.Router();
const postResena = require("../controller/postReview");

router.post("/:id", postResena);

module.exports = router;