const { Favoritos, Usuarios } = require("../db.js");

// get all services

const getFav = async (req, res) => {

    const { uidClient } = req.body;

    try {
        const favoritos = await Usuarios.findOne({
            where: { uidClient }, include: [{
                model: Favoritos,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: {
                    attributes: []
                }
            }], attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.send(favoritos)
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = getFav;