const express = require("express");
const router = express.Router();
const { getResenas, postResena } = require("../controller/resenas");

router.get("/", getResenas);
router.get("/:id", getResenas);
router.post("/:id", postResena);

module.exports = router;