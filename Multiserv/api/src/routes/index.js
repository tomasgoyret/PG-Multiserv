const { Router } = require('express');
const router = Router();
const postUserRouter = require('./addUser');
const getUsersRouter = require("./getUsers");


router.use("/agregar-usuario", postUserRouter);
router.use("/api", getUsersRouter);



module.exports = router;