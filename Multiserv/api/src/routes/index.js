const { Router } = require('express')
const router = Router()

const userRouter = require('./user')
const serviceRouter = require('./service')
const payServiceRouter = require('./payService')
const categorieRouter = require('./categorie')
const favoriteRouter = require('./favorite')
const reviewRouter = require('./review')
const locationRouter = require('./location')
const appointmentRouter = require('./appointment')
const appointmentTimeRouter = require('./appointmentTime')
const postMailPago = require('./mailPago')
const notificaciones = require('./mailsNotificaciones')
const reservationRouter = require('./reservation')

// Rutas a Usuarios
router.use('/users', userRouter)
// Rutas a Servicios
router.use('/services', serviceRouter)
router.use('/payService', payServiceRouter)
// Rutas de categorias
router.use('/categories', categorieRouter)
// Rutas de favoritos
router.use('/favorites', favoriteRouter)
// Rutas reseñas
router.use('/reviews', reviewRouter)
// Ruta para crear/editar ubicacion
router.use('/locations', locationRouter)
// Rutas de horarios
router.use('/appointmentsTimes', appointmentTimeRouter)
// Rutas de Citas
router.use('/appointments', appointmentRouter)
// Rutas de Envío de mails
router.use('/mail', postMailPago)
router.use('/notificaciones', notificaciones)
// Ruta de Reservaciones
router.use('/reservations', reservationRouter)

module.exports = router
