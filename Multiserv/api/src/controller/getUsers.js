const { Usuarios, Servicios } = require("../db")

const getUsers = async(req, res) => {
   try { const dbUsuarios = await Usuarios.findAll({ include: Servicios});
    // let arrayUsuarios = [];
    // try{ 
    //     for(let usuario of dbUsuarios) {
    //         arrayUsuarios.push({
    //             uidClient: usuario.dataValues.uidClient,
    //             photoURL: usuario.dataValues.photoURL,
    //             displayName: usuario.dataValues.displayName,
    //             email: usuario.dataValues.email,
    //             provider: usuario.dataValues.provider,
    //             uidProvider: usuario.dataValues.uidProvider,
    //             disable: usuario.dataValues.disable
    //         })
    // }
    res.status(200).json(dbUsuarios);
    }
    catch(err){
        console.log(err)
    }
};


const getUserId = async(req, res) => {
    try {
        const { uidClient } = req.params;

        const dbUsuario = await Usuarios.findOne({where: { uidClient }, include: Servicios})
        // const usuario = {
        //     uidClient: dbUsuario.dataValues.uidClient,
        //     photoURL: dbUsuario.dataValues.photoURL,
        //     displayName: dbUsuario.dataValues.displayName,
        //     email: dbUsuario.dataValues.email,
        //     provider: dbUsuario.dataValues.provider,
        //     uidProvider: dbUsuario.dataValues.uidProvider,
        //     disable: dbUsuario.dataValues.disable
        // }
        res.status(200).json(dbUsuario);
    } catch (error) {
        res.status(404).json({msg: "El usuario no existe en la base de datos"});
    }
};

module.exports = {
    getUsers,
    getUserId
};