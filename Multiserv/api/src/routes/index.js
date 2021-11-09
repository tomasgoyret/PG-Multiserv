const { Router } = require('express');
const router = Router();
const postUserRouter = require('./addUser')


router.use("/agregar-usuario", postUserRouter);



module.exports = router;