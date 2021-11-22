const { Favoritos } = require("../db.js");

// get all services

const deleteFav = async (req, res) => {

    const { id, uidClient } = req.query;
 console.log(id, uidClient);
    try {
        const eliminado = await Favoritos.destroy({
            where: {id}
        });
        const newLista = await Favoritos.findAll({
            usuarios_favoritos: { where:{ usuarioUidClient: uidClient} },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        } );
        eliminado === 1 ? res.send(newLista) : res.send('No se encontro favorito')
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = deleteFav
