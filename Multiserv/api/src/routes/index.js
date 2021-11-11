const { Router } = require('express');
const router = Router();
const postUserRouter = require('./addUser');
const getUsersRouter = require("./getUsers");
const deleteUserRouter = require("./deleteUser");
const getServRouter = require("./getServices");

router.use("/agregar-usuario", postUserRouter); 
router.use("/api", getUsersRouter);
router.use("/eliminar-usuario", deleteUserRouter); 
router.use("/services", getServRouter);


module.exports = router;