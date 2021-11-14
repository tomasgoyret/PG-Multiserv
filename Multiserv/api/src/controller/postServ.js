const { db } = require("../db.js");


const postServ = async (req, res) => {
    const { category, description, photos, priceRange, rating, title, uidUser, currency } = req.body;
    const newService = { category, description, photos, priceRange, rating, title, uidUser, currency}
    try {
        const service = await db.collection("services").add(newService);
        const serviceUpdate = await db.collection('services').doc(service.id).update({
            id: service.id
          })
        res.send({ msg: "Nuevo servicio agregado correctamente", idService:service.id })
    } catch (error) {
        res.send(error)
    }
}



module.exports = postServ;