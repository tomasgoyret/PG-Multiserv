const express = require("express");
const router = express.Router();
const { getResenas, postResena, deleteResenas, putResenas } = require("../controller/resenas");

router.get("/", getResenas);
router.get("/:id", getResenas);
router.post("/:id", postResena);
router.delete("/:id", deleteResenas);
router.put("/:id", putResenas);

module.exports = router;