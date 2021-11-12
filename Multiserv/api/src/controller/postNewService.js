const { db } = require("../db.js");


const postNewService = async (req, res) => {
    const { category, description, photos, priceRange, rating, title, uid } = req.body;
    const newService = { category, description, photos, priceRange, rating, title, uid }
    try {
        const service = await db.collection("services").add(newService);
        res.send({ msg: "Nuevo servicio agregado correctamente", serviceId: service.id })
    } catch (error) {
        res.send(error)
    }
}



module.exports = postNewService;