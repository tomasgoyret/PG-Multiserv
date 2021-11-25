const { Horarios, Servicios } = require("../db.js");

const putHorarios = async (req, res) => {
    const { id } = req.params; 
    const { dias, horarios, aDomicilio } = req.body;
    try {
        const newHorario = { aDomicilio, dias, horarios }
        const horario = await Horarios.findByPk(id);
        await horario.update(newHorario)
         res.send(`Horario editado correctamente`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = putHorarios
