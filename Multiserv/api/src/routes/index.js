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
const getCategoriasRouter = require("./getCategorias");
const getFavRouter = require("./getFav.js");
const postFavRouter = require("./postFav.js");
const deleteFavRouter = require("./deleteFav");
const deleteCategoriasRouter = require("./deleteCategorias");

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
router.use("/categorias", deleteCategoriasRouter)
router.use("/categorias", postCategoriasRouter)
router.use("/categorias", getCategoriasRouter)

//Rutas de favoritos
router.use("/favoritos", getFavRouter)
router.use("/agregar-fav", postFavRouter)
router.use("/eliminar-fav", deleteFavRouter)

module.exports = router;
