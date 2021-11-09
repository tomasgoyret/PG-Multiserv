const { Router } = require('express');
const router = Router();

const db = require("../db.js");

router.post("/agregar-usuario", async(req, res) => {
  const {nombre, apellido, correo} = req.body;
  const nuevoUsuario = {
      nombre,
      apellido,
      correo
    };
    const user = await db.collection("usuarios").add(nuevoUsuario)
    console.log(user.id)
    res.status(201).json({data: "User Created"})
});



module.exports = router;