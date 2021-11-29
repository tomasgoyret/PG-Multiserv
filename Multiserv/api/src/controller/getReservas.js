const { Citas } = require("../db.js");

// get all services

const getReservas = async (req, res) => {
    const { ids } = req.body;
    try {
        let reservasArray = [];
        for (let i = 0; i < ids.length; i++) {
            let Reservas = await Citas.findAll({
                where: { servicioId: ids[i] },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            reservasArray.push(Reservas);
        }
        res.send(reservasArray)
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = getReservas;