const { Favoritos } = require("../db.js");
const { v4: uuidv4 } = require('uuid');

const postFav = async (req, res) => {

    const { uidClient, idService } = req.body;

    try {            
        const newFav = await Favoritos.create({
            id: uuidv4(),
            idService
        });
        await newFav.addUsuarios(uidClient);
        res.send(`Se agrego favorito al usuario uid:${uidClient} como Favorito id: ${newFav.id}`)
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = postFav;