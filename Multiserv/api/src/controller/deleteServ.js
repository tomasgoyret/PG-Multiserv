const { db } = require("../db.js");

const deleteServ = async (req, res) => {
    const id = req.params;
    try {
        await db.collection('services').doc(id).delete();
        res.send("El servicio se eliminó correctamente")
    }
    catch (error) {
        res.send(error)
    }
}

module.exports = deleteServ;