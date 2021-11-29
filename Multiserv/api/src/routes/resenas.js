const express = require("express");
const router = express.Router();
const { getResenas, deleteResenas, putResenas, getResenasId } = require("../controller/resenas");

router.get("/", getResenas);
router.get("/:id", getResenasId);
router.delete("/:id", deleteResenas);
router.put("/:id", putResenas);

module.exports = router;