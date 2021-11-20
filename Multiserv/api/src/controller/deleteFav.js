const { Favoritos } = require("../db.js");

// get all services

const deleteFav = async (req, res) => {

    const { id } = req.body;

    try {
        const eliminado = await Favoritos.destroy({
            where: {id}
        });
        eliminado === 1 ? res.send('Favorito eliminado') : res.send('No se encontro favorito')
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = deleteFav;