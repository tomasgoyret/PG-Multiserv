const { Citas } = require("../db.js");

const deleteCitas = async (req, res) => {
    const { id } = req.params;
    try {
        let cita = await Citas.destroy({ where:{ id } });
        cita !== 1 ? res.send('No hay citas que coincidan') : res.send("Cita borrada correctamente")
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteCitas
