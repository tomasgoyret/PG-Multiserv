const { Citas, Usuarios, Servicios } = require("../db.js");
const { sendEmail, mailTurno } = require("../mails/mails.js");

const postCitas = async (req, res,next) => {
    const { id } = req.params;
    const { dia, hora, uidClient, direccion, ciudad } = req.body;
    try {
        const user = await Usuarios.findByPk(uidClient)
        const servicio = await Servicios.findByPk(id)
        const cita = { dia, hora, nameUser:user.displayName, direccion, ciudad }
        const citas = await Citas.create(cita);
        await user.addCitas(citas)
        await servicio.addCitas(citas)
        const template = await mailTurno(user.displayName,dia,hora,direccion,ciudad,servicio.title)
        await sendEmail(user.email,subject = "Confirmación de turno",template)
        res.send(`Turno ok, dia ${dia}, hora ${hora}, servicio: ${servicio.title}`)
    } catch (error) {
        next(error)
    }
}

module.exports = postCitas