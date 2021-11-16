const { Servicios } = require("../db.js");


const postServ = async (req, res, next) => {
    const { title,  currency,  category, description, max, min, uidProvider, rating, photos, direccion} = req.body;
    const newService = { title,  currency,description, max, min, rating, photos}
    try {
        const service = await Servicios.create(newService);
        // await Servicios.addUsuarios(uidProvider)
        // await Servicios.addCategorias(category)
        // await Servicios.addDirecciones(direccion)
        // const serviceUpdate = await db.collection('services').doc(service.id).update({
        //     id: service.id
        //   })
        res.send({ msg: "Nuevo servicio agregado correctamente", servicio:service})
    } catch (error) {
        next(error)
    }
}



module.exports = postServ;