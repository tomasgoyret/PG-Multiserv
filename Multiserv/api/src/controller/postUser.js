const {db, auth} = require("../db.js");

// const postUser = async (req, res) => {
//     try {
//         const {nombre, apellido, correo} = req.body;
//         const nuevoUsuario = {
//             nombre,
//             apellido,
//             correo
//         };
//         const user = await db.collection("usuarios").add(nuevoUsuario);
//         res.status(201).json({msg: "Usuario Creado", userId: user.id})
//     } catch(error) {
//         console.log(error);
//     }
//   }

    const postUser = async(req, res)=>{
        const {nombre, apellido, correo, password, isProvider} = req.body; 
        try{
        const newUser= await auth.createUser({
            email: correo,
            emailVerified: false,
            password: password,
            displayName: nombre + apellido,
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false,
          })
            // if(isProvider) {
            //     const newProvider= {
            //         uid: newUser.uid,
            //         email: newUser.email
            //     }
            //     const proveedor = await db.collection("proveedores").add(newProvider);
            // }
        res.status(200).json({msg: "Usuario Creado", userId: newUser.uid})


        } catch(error) {
                console.log(error);
                res.status(404).json(error)
            }     
    }



  module.exports = postUser;