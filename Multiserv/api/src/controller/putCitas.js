const { Citas } = require("../db.js");

const putCitas = async (req, res, next) => {

    const { id } = req.params;
    try {
        const citas = await Citas.update(
            {status:'Concretada'},
            {where: { id: id }}
        );
        res.send(citas);

    } catch (error) {
        next(error)
    }
}

module.exports = putCitas