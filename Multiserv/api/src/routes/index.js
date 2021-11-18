const { Router } = require('express');
const router = Router();
const postUserRouter = require('./addUser');
const getUsersRouter = require("./getUsers");
const deleteUserRouter = require("./deleteUser");
const getServRouter = require("./getServ");
const postServRouter = require("./postServ");
const putServRouter = require("./putServ");
const deleteServRouter = require("./deleteServ");
const postCategoriasRouter = require("./postCategorias");



// Rutas a Usuarios

router.use("/agregar-usuario", postUserRouter); 
router.use("/usuarios", getUsersRouter);
router.use("/eliminar-usuario", deleteUserRouter);

// Rutas a Servicios

router.use("/services", getServRouter);
router.use("/newservice", postServRouter);
router.use("/edit-service", putServRouter);
router.use("/delete-service", deleteServRouter);

//Rutas de categorias

router.use("/categorias",postCategoriasRouter)

module.exports = router;