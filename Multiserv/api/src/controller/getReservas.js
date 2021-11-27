const { Servicios, Citas } = require("../db.js");

// get all services

const getReservas = async (req, res) => {
    const { id } = req.params;
    try {
        const Reservas = await Servicios.findAll({
            where: { id: id },
            include: {
                model: Citas,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: {
                    attributes: []
                }
            },
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