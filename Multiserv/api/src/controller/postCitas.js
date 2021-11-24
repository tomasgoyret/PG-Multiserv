const { Citas, Usuarios } = require("../db.js");

const postCitas = async (req, res) => {
    const { id } = req.params; 
        const { dia, horario, uidClient } = req.body;
    try {
        const user = await Usuarios.findByPk(uidClient) 
        const cita = {dia, horario, nameUser: user.displayName}
        const citas = await Citas.create(cita);
        await user.addCitas(citas)
        await citas.addServicios({where:{id}})
        console.log(citas)
         res.send(`Cita creada correctamente con id: ${citas.id}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postCitas