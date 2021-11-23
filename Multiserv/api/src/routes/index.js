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
const getFavRouter = require("./getFav.js");
const postFavRouter = require("./postFav.js");
const deleteFavRouter = require("./deleteFav");
const deleteCategoriasRouter = require("./deleteCategorias");
const resenaRouter = require("./resenas")
const getMyServ = require("./getMyServ")
const getHorariosRouter = require("./getHorarios")
const postHorariosRouter = require("./postHorarios")
const putHorariosRouter = require("./putHorarios")
const getCitasRouter = require("./getCitas")
const postCitasRouter = require("./postCitas")
const deleteCitasRouter = require("./deleteCitas")



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
router.use("/my-services", getMyServ);

//Rutas de categorias
router.use("/categorias", deleteCategoriasRouter)
router.use("/categorias", postCategoriasRouter)
router.use("/categorias", getCategoriasRouter)
router.use("/edit-categorias",putCategoriasRouter)

//Rutas de favoritos
router.use("/favoritos", getFavRouter)
router.use("/agregar-fav", postFavRouter)
router.use("/eliminar-fav", deleteFavRouter)

//Rutas reseñas
router.use("/resena", resenaRouter)

//Rutas de horarios
router.use("/horarios", getHorariosRouter)
router.use("/horarios", postHorariosRouter)
router.use("/horarios", putHorariosRouter)

//Rutas de Citas
router.use("/citas", getCitasRouter)
router.use("/citas", postCitasRouter)
router.use("/citas", deleteCitasRouter)

module.exports = router;
