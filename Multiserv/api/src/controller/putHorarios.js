const { Horarios, Servicios } = require("../db.js");

const putHorarios = async (req, res) => {
    const { id } = req.params; 
        const { direccion, aDomicilio, dias, horarios } = req.body;
    try {
        const newHorario = { direccion, aDomicilio, dias, horarios }
        const horario = await Horarios.findByPk(id);
        await horario.update(newHorario)
        console.log(horario)
         res.send(`Horario editado correctamente`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = putHorarios