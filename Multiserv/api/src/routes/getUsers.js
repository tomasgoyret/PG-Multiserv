const express = require("express");
const router = express.Router();
const { getUsers, getUserId, getUserEmail } = require("../controller/getUsers");

router.get("/", getUsers);
router.get("/:id", getUserId);
router.get("/:email", getUserEmail)




module.exports = router;