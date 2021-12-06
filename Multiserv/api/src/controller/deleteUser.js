const { Usuarios, auth, Resenas, Servicios, Citas } = require("../db.js");

const deleteUser = async (req, res, next) => {
    const {uidClient} = req.params;
    try {
        //Elimina usuario de Firebase
        await auth.deleteUser(uidClient)
        .then()

        //Elimina usuario de DB
        // const resena = await Resenas.destroy({where: {usuarioUidClient: uidClient}})
        // const servicio = await Servicios.destroy({where: {usuarioUidClient: uidClient}})
        // const cita = await Citas.destroy({where: {usuarioUidClient: uidClient}})
        const usuario = await Usuarios.destroy({where: { uidClient: uidClient } });
        usuario === 1 ? res.json({msg: "El usuario se borró correctamente"}) : res.json({msg: 'El usuario que intenta eliminar no existe'})
   

        usuario === 1 ? res.json({msg: "El usuario se borró correctamente"}) : res.json({msg: 'El usuario que intenta eliminar no existe'})

    } catch (error) {
        next(error)
    }
}

module.exports = deleteUser;
