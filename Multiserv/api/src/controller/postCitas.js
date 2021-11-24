const { Citas, Usuarios, Servicios } = require("../db.js");

const postCitas = async (req, res) => {
    const { id } = req.params; 
        const { dia, horario, uidClient } = req.body;
    try {
        const user = await Usuarios.findByPk(uidClient)
        const servicio = await Servicios.findByPk(id)
        const cita = {
            dia, horario,
            nameUser: user.displayName,
            usuarioUidClient: user.uidClient,
            serviceId: id,
            title: servicio.title,
            nameProv: servicio.nameUser,
        }
        const citas = await Citas.create(cita);
        await user.addCitas(citas);
        await servicio.addCitas(citas)
         res.send(`Cita creada correctamente con id: ${citas.id}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postCitas