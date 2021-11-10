const db = require("../db.js");

const getUsers = async(req, res) => {
    try {
        const peticion = await db.collection("usuarios").get();
        const {docs} = peticion;
        const usuarios = docs.map(usuario => ({
            id:usuario.id,
            datos:usuario.data()
        }  
        ));
        res.json(usuarios)
    } catch (error) {
        console.log(error)
    }
};

module.exports = getUsers;