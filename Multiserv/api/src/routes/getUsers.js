const express = require("express");
const router = express.Router();
const { getUsers, getUserId} = require("../controller/getUsers");

router.get("/", getUsers);
router.get("/:uidClient", getUserId);




module.exports = router;