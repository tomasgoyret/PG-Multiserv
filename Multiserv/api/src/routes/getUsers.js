const express = require("express");
const router = express.Router();
const { getUsers, getUserId, getUserEmail, getDB} = require("../controller/getUsers");

router.get("/", getUsers);
router.get("/DB", getDB);
router.get("/:id", getUserId);
router.get("/:email", getUserEmail)




module.exports = router;