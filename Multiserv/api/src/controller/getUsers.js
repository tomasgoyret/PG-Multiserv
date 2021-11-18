const { Usuarios } = require("../db")

const getUsers = async(req, res) => {
    const dbUsuarios = await Usuarios.findAll();
    let arrayUsuarios = [];
    try{ 
        for(let usuario of dbUsuarios) {
            arrayUsuarios.push({
                uidClient: usuario.dataValues.uidClient,
                photoURL: usuario.dataValues.photoURL,
                displayName: usuario.dataValues.displayName,
                email: usuario.dataValues.email,
                provider: usuario.dataValues.provider,
                uidProvider: usuario.dataValues.uidProvider,
                disable: usuario.dataValues.disable
            })
    }
    
    res.status(200).json(arrayUsuarios);
    }
    catch(err){
        res.status(404).json({msg: "No hay usuarios en la base de datos"});
    }
};


const getUserId = async(req, res) => {
    try {
        const { uidClient } = req.params;

        const dbUsuario = await Usuarios.findOne({where: { uidClient }})
        const usuario = {
            uidClient: dbUsuario.dataValues.uidClient,
            photoURL: dbUsuario.dataValues.photoURL,
            displayName: dbUsuario.dataValues.displayName,
            email: dbUsuario.dataValues.email,
            provider: dbUsuario.dataValues.provider,
            uidProvider: dbUsuario.dataValues.uidProvider,
            disable: dbUsuario.dataValues.disable
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(404).json({msg: "El usuario no existe en la base de datos"});
    }
};

module.exports = {
    getUsers,
    getUserId
};