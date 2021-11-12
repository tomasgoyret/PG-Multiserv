const { db, auth } = require("../db.js");

// const getUsers = async(req, res) => {
//     try {
//         const peticion = await db.collection("usuarios").get();
//         const { docs } = peticion;
        
//         const usuarios = docs.map( usuario => {
//             let data = usuario.data()
//             return {
//                 id:usuario.id,
//                 ...data
//             }
//             })
//         res.json(usuarios)
//     } catch (error) {
//         console.log(error)
//     }
// };

const getUsers = async(req, res) => {
    try {
        const peticion = await auth.listUsers()
        res.status(200).json(peticion.users)
    } catch (error) {
        res.status(400).json(error)
    }
};

// const getUserId = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const peticion = await db.collection("usuarios").doc(id).get();
//         let data = peticion.data()
//         const usuario =  {
//             id: id,
//             ...data
//         }
//         res.json(usuario)
//     } catch (error) {
//         console.log(error)
//     }
// };

const getUserId = async(req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const peticion= await auth.getUser(id);
        res.status(200).json(peticion)
    } catch (error) {
        res.status(400).json(error)
    }
};

//en proceso----->
const getUserEmail = async(req, res) => {
    const { email } = req.params;
    console.log(email);
    try {
        const peticion= await auth.getUserByEmail(email);
        res.status(200).json(peticion)
    } catch (error) {
        res.status(400).json(error)
    }
};


module.exports = {
    getUsers,
    getUserId, 
    getUserEmail
};