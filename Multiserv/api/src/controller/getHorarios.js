const { Horarios, Servicios } = require("../db.js");

const getHorarios = async (req, res) => {
    const { id } = req.params;
    try {
        let horario = await Horarios.findAll({
            include: {
                model: Servicios,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: {
                    attributes: []
                },
                where: { id }
            }
        });
        console.log(horario)
        res.send(horario)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getHorarios
