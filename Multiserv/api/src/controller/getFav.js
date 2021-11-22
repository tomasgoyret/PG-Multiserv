const { Favoritos } = require("../db.js");

// get all services

const getFav = async (req, res) => {

    const { uidClient } = req.params;

    try {
        const favoritos = await Favoritos.findAll({
            usuarios_favoritos: { where:{ usuarioUidClient: uidClient} },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        } );
        favoritos.length === 0 ? res.send('No hay favoritos') : res.send(favoritos)
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = getFav;