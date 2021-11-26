const { Horarios, Servicios } = require("../db.js");

const getHorarios = async (req, res) => {
    const { id } = req.params;
    try {
        let servicio = await Servicios.findByPk( id , { include: [Horarios] } )
        res.send(servicio.horarios)
    } catch (error) {
        console.log(error)
    }
}


module.exports = getHorarios