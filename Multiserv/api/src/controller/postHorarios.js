const { Horarios, Servicios } = require("../db.js");

const postHorarios = async (req, res) => {
    const { idService } = req.params; 
    const { fechas } = req.body;
    try {
        const horario = await Horarios.create({fechas:fechas});
        const servicio = await Servicios.findByPk(idService)
        await servicio.addHorarios(horario)
         res.send(`Horario`) //agregado correctamente al servicio ${servicio.title}, con id: ${idService}
    } catch (error) {
        console.log(error)
    }
}

module.exports = postHorarios