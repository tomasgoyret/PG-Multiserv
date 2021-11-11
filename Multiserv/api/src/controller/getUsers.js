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
        console.log(peticion)
        
        const usuarios = peticion.users.map( usuario => {
            let data = usuario.data()
            return {
                id:usuario.id,
                ...data
            }
            })
        res.json(usuarios)
    } catch (error) {
        console.log(error)
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
    try {
        const { id } = req.params;
        const peticion = await db.collection("usuarios").doc(id).get();
        let data = peticion.data()
        const usuario =  {
            id: id,
            ...data
        }
        res.json(usuario)
    } catch (error) {
        console.log(error)
    }
};

//Trabajo tirado a la basura por Santiago, GRACIAS!
// const usuarios = docs.map(usuario => ({
        //     id:usuario.id,
        //     datos:usuario.data()
        // }));

//Para que le mostré, mala mía, me mandé un mocaso!



module.exports = {
    getUsers,
    getUserId
};