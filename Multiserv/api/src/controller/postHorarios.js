const { Horarios, Servicios } = require("../db.js");

const postHorarios = async (req, res) => {
    const { id } = req.params; 
    const { direccion, aDomicilio, dias, horarios } = req.body;
    try {
        const newHorario = { direccion, aDomicilio, dias, horarios }
        const horario = await Horarios.create(newHorario);
        const servicio = await Servicios.findByPk(id)
        await servicio.addHorarios(horario)
        console.log(horario)
         res.send(`Horario agregado correctamente al servicio ${servicio.title}, con id: ${id}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postHorarios