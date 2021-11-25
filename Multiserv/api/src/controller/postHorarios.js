const { Horarios, Servicios } = require("../db.js");

const postHorarios = async (req, res) => {
    const { idService } = req.params; 
    const { dias, horarios } = req.body;
    try {
        const newHorario = { dias, horarios }
        const horario = await Horarios.create(newHorario);
        const servicio = await Servicios.findByPk(idService)
        console.log(servicio)
        await servicio.addHorarios(horario)
         res.send(`Horario agregado correctamente al servicio ${servicio.title}, con id: ${idService}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postHorarios
