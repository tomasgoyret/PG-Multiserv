const { db } = require("../db.js");

const putServ = async (req, res) => {
    const body = req.body;
    try {
        const a = await db.collection('services').doc(body.id).update(body)
        res.send({ msg: "Servicio actualizado correctamente", idService: body.id })
    }
    catch (error) {
        res.send(error)
    }
}

module.exports = putServ;