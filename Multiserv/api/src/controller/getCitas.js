const { Citas, Usuarios } = require("../db.js");

const getCitas = async (req, res) => {
    const { uidClient } = req.params;
    try {
        let citas = await Citas.findAll({
            include: {
                model: Usuarios,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: {
                    attributes: []
                },
                where: { uidClient }
            }
        });
        console.log(citas)
         res.send(citas)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getCitas
