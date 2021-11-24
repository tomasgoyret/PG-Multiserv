const { Citas, Usuarios, Servicios } = require("../db.js");

const getCitas = async (req, res) => {
    const { uidClient } = req.params;
    try {
        let citas = await Citas.findAll({where: { usuarioUidClient: uidClient },
            attributes: {
                exclude: ['createdAt', 'updatedAt', ]
            }
        });
        res.send(citas)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getCitas
