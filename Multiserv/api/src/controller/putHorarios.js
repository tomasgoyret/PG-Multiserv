const { Horarios } = require("../db.js");

const putHorarios = async (req, res) => {
    const { id } = req.params; 
    const { fechas } = req.body;
    try {
        await Horarios.update(fechas, {where: id})
         res.send(`Horario editado correctamente`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = putHorarios
