const { Favoritos } = require("../db.js");
const { v4: uuidv4 } = require('uuid');
// get all services

const postFav = async (req, res) => {

    const { uidClient, id } = req.body;

    try {
        const newFav = await Favoritos.create({
            id: uuidv4(),
            idService: id
        });
        const a = await newFav.addUsuarios(uidClient);
        console.log(a)
        res.send(`Se agrego favorito al usuario uid:${uidClient} como Favorito id: ${newFav.id}`)
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = postFav;