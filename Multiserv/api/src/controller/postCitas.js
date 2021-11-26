const { Citas, Usuarios, Servicios } = require("../db.js");

const postCitas = async (req, res) => {
    const { id } = req.params;
    const { dia, hora, uidClient, direccion, ciudad } = req.body;
    try {
        const user = await Usuarios.findByPk(uidClient)
        const servicio = await Servicios.findByPk(id)
        const cita = { dia, hora, nameUser:user.displayName, direccion, ciudad }
        const citas = await Citas.create(cita);
        await user.addCitas(citas)
        await servicio.addCitas(citas)
        res.send('Cita creada correctamente')
    } catch (error) {
        console.log(error)
    }
}

module.exports = postCitas