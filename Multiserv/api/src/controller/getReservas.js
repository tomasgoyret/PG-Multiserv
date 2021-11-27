const { Citas } = require("../db.js");

// get all services

const getReservas = async (req, res) => {
    const { id } = req.params;
    try {
        const Reservas = await Citas.findAll({
            where: { servicioId: id },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.send(Reservas)
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = getReservas;