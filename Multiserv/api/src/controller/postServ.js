const { Servicios, Categorias, Usuarios } = require("../db.js");


const postServ = async (req, res, next) => {
    const { title,  currency,  category, description, max, min, uidClient, rating, photos, direccion} = req.body;
    const newService = { title, currency, description, max, min, rating, photos, usuarioUidClient: uidClient}
    try {
        // const user = await Usuarios.update({ where: { uidClient: uidProvider } });
        // user.provider = true;
        // user.save();
        const service = await Servicios.create(newService);
        const usuario = await Usuarios.findOne( {where : { uidClient }})
        await usuario.addServicios(service)
        const categoria = await Categorias.findOne({ where: { title: category}})
        await service.addCategorias(categoria)
        res.send({ msg: "Nuevo servicio agregado correctamente", servicio:service})

    } catch (error) {
        next(error)
    }
}



module.exports = postServ;