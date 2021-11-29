const { Citas, Usuarios, Servicios, Horarios } = require("../db.js");
const { sendEmail, mailTurno } = require("../mails/mails.js");

const postCitas = async (req, res, next) => {
    const { id } = req.params;
    const { dia, hora, uidClient, direccion, ciudad } = req.body;
    try {
        const user = await Usuarios.findByPk(uidClient)
        const servicio = await Servicios.findByPk(id, { include: [Horarios] })
        const horario = await Horarios.findByPk(id)
        const cita = { dia, hora, nameUser: user.displayName, direccion, ciudad, title: servicio.title }
        const citas = await Citas.create(cita);
        await user.addCitas(citas)
        await servicio.addCitas(citas)

        await Horarios.update({
            fechas: horario.fechas.map((e) => {
                if (e[dia]) {
                    e[dia].map((h) => {
                        if (h.hora === hora.hora) {
                            h.reservado = true
                            return h
                        }
                        else {
                            return h
                        }
                    })
                    return e
                } else { return e }
            })
        }, {
            where: { id }
        })


        const template = await mailTurno(user.displayName, dia, hora, direccion, ciudad, servicio.title)

        await sendEmail(user.email, subject = " Confirmación de turno ", template)

        res.send(`Turno reservado para el dia : ${dia}, hora : ${hora}, servicio : ${servicio.title}`)

    } catch (error) {
        next(error)
    }
}

module.exports = postCitas