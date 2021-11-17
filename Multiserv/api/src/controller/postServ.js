const { Servicios } = require("../db.js");


const postServ = async (req, res, next) => {
    const { title,  currency,  category, description, max, min, uidProvider, rating, photos, direccion} = req.body;
    const newService = { title, currency, description, max, min, rating, photos}
    try {
        const user = await Usuarios.update({ where: { uidClient: uidProvider } });
        user.provider = true;
        user.save();
        const service = await Servicios.create(newService);

        res.send({ msg: "Nuevo servicio agregado correctamente", servicio:service})

    } catch (error) {
        next(error)
    }
}



module.exports = postServ;