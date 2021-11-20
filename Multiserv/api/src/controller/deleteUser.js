const { Usuarios, auth } = require("../db.js");

const deleteUser = async (req, res) => {
    const uidClient = req.params;
    try {
        //Elimina usuario de Firebase
        await auth.deleteUser(uidClient.uidClient)
        .then()
        
        //Elimina usuario de DB
        const usuario = await Usuarios.destroy({where: uidClient });
        usuario === 1 ? res.json({msg: "El usuario se borró correctamente"}) : res.json({msg: 'El usuario que intenta eliminar no existe'})

    } catch (error) {
        res.json({msg: "El usuario que intenta eliminar no existe"})
    }
}

module.exports = deleteUser;