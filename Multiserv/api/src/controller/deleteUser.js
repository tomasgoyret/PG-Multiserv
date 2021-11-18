const { Usuarios, auth } = require("../db.js");

const deleteUser = async (req, res) => {
    const uidClient = req.params;
    try {
        //Elimina usuario de Firebase
        await auth.deleteUser(uidClient.uidClient)
        .then()
        
        //Elimina usuario de DB
        const usuario = await Usuarios.destroy({where: uidClient });
        if(usuario === 1) res.json({msg: "El usuario se borró correctamente"});

    } catch (error) {
        res.json({msg: "El usuario que intenta eliminar no existe"})
    }
}

module.exports = deleteUser;