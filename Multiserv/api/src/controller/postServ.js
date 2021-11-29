const { Servicios, Categorias, Usuarios } = require("../db.js");


const postServ = async (req, res, next) => {
    const { title, currency, category, description, max, min, uidClient, rating, photos, location , address, homeService } = req.body;
    try {
        await Usuarios.update({provider:true},{where:{uidClient:uidClient}});
        const usuario = await Usuarios.findByPk(uidClient)  
        const newService = {
            title, currency, description, max, min, rating, photos, location, address, homeService,
            usuarioUidClient: uidClient,
            nameUser: usuario.displayName,
            profilePic: usuario.photoURL
        }
        const service = await Servicios.create(newService);
        await usuario.addServicios(service)
        const categoria = await Categorias.findOne({ where: { title: category } })
        await service.addCategorias(categoria)
        res.send({ msg: "Nuevo servicio agregado correctamente", servicio: service })

    } catch (error) {
        next(error)
    }
}



module.exports = postServ;
