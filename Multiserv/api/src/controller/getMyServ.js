const { Servicios, Categorias } = require("../db.js");

// get all services

const getMyServ = async (req, res) => {
    const { uidClient } = req.params;
    try {
        const servicios = await Servicios.findAll({
            where: { usuarioUidClient: uidClient }, include: {
                model: Categorias,
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
        res.send(servicios)
    }
    catch (error) {
        console.log(error)
    }
};


module.exports = getMyServ;