const { Horarios } = require("../db.js");

const putHorarios = async (req, res) => {
    const { id } = req.params; 
    const { fechas } = req.body;
    try {
        const newHorario = fechas
        const horario = await Horarios.findByPk(id);
        await horario.update(newHorario)
         res.send(`Horario editado correctamente`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = putHorarios
