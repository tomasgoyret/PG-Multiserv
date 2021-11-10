const { Router } = require('express');
const router = Router();
const postUserRouter = require('./addUser');
const getUsersRouter = require("./getUsers");
const deleteUserRouter = require("./deleteUser")

router.use("/agregar-usuario", postUserRouter);
router.use("/api", getUsersRouter);
router.use("/eliminar-usuario", deleteUserRouter);



module.exports = router;