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
        const {name, lastName, mail, password, photoURL, phone} = req.body; 
        try{
        const newUser= await auth.createUser({
            email: mail,
            emailVerified: false,
            phoneNumber: phone,
            password: password,
            displayName: `${name} ${lastName}`,
            photoURL: photoURL,
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
                res.status(404).json(error)
            }     
    }
 


  module.exports = postUser;