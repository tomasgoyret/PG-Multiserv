const express = require("express");
const router = express.Router();
const { getUsers, getUserId} = require("../controller/getUsers");

router.get("/", getUsers);
router.get("/:id", getUserId);




module.exports = router;