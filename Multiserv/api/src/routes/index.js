const { Router } = require('express');
const router = Router();
const postUserRouter = require('./addUser');
const getUsersRouter = require("./getUsers");
const deleteUserRouter = require("./deleteUser");
const editUserRouter = require("./editUser");
const getServRouter = require("./getServ");
const postServRouter = require("./postServ");
const putServRouter = require("./putServ");
const deleteServRouter = require("./deleteServ");
const postCategoriasRouter = require("./postCategorias");
const getCategoriasRouter = require("./getCategorias");
const payServiceRouter = require("./payService");
const putCategoriasRouter = require("./putCategorias");



// Rutas a Usuarios

router.use("/agregar-usuario", postUserRouter); 
router.use("/usuarios", getUsersRouter);
router.use("/eliminar-usuario", deleteUserRouter);
router.use("/editar-usuario", editUserRouter);

// Rutas a Servicios

router.use("/services", getServRouter);
router.use("/newservice", postServRouter);
router.use("/edit-service", putServRouter);
router.use("/delete-service", deleteServRouter);
router.use("/pay-service", payServiceRouter);


//Rutas de categorias

router.use("/categorias",postCategoriasRouter)
router.use("/categorias",getCategoriasRouter)
router.use("/edit-categorias",putCategoriasRouter)

module.exports = router;