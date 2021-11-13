const { Router } = require('express');
const router = Router();
const postUserRouter = require('./addUser');
const getUsersRouter = require("./getUsers");
const deleteUserRouter = require("./deleteUser");
const getServRouter = require("./getServices");
const getFilterRouter = require("./getFilter.js");
const getOrderByRouter = require("./getOrderBy");
const postNewServiceRouter = require("./postNewService");

router.use("/agregar-usuario", postUserRouter); 
router.use("/api", getUsersRouter);
router.use("/eliminar-usuario", deleteUserRouter); 
router.use("/services", getServRouter);
router.use("/filter", getFilterRouter); 
router.use("/orderby", getOrderByRouter);
router.use("/newservice", postNewServiceRouter);

module.exports = router;