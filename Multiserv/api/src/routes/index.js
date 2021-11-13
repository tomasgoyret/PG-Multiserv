const { Router } = require('express');
const router = Router();
const postUserRouter = require('./addUser');
const getUsersRouter = require("./getUsers");
const deleteUserRouter = require("./deleteUser");
const getServRouter = require("./getServ");
const getFilterRouter = require("./getFilter.js");
const getOrderByRouter = require("./getOrderBy");
const postServRouter = require("./postServ");
const putServRouter = require("./putServ");
const deleteServRouter = require("./deleteServ");

router.use("/agregar-usuario", postUserRouter); 
router.use("/api", getUsersRouter);
router.use("/eliminar-usuario", deleteUserRouter); 
router.use("/services", getServRouter);
router.use("/filter", getFilterRouter); 
router.use("/orderby", getOrderByRouter);
router.use("/newservice", postServRouter);
router.use("/editservice", putServRouter);
router.use("/deleteservice", deleteServRouter);

module.exports = router;