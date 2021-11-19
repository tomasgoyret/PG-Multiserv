const { db } = require("../db.js");

const putServ = async (req, res) => {
    const { id } = req.params;
    const { title, currency,  category, description, max, min, rating, photos, direccion} = req.body;
    try {
        const serv = await Servicios.update({
            title,
            currency,
            category,
            description,
            max,
            min,
            rating,
            photos,
            direccion
        },{
            where: { id }
            } );
        res.send({ msg: "Servicio actualizado correctamente", serv})
    }
    catch (error) {
        res.send(error)
    }
}

module.exports = putServ;