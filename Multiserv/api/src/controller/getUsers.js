const db = require("../db.js");

const getUsers = async(req, res) => {
    try {
        const peticion = await db.collection("usuarios").get();
        const {docs} = peticion;
        const usuarios = docs.map(usuario => ({
            id:usuario.id,
            datos:usuario.data()
        }));
        res.json(usuarios)
    } catch (error) {
        console.log(error)
    }
};

const getUserId = async(req, res) => {
    try {
        const { id } = req.params;
        const peticion = await db.collection("usuarios").doc(id).get();
        const usuario =  {id: id, datos: peticion.data()}
        res.json(usuario)
    } catch (error) {
        console.log(error)
    }
};



module.exports = {
    getUsers,
    getUserId
};