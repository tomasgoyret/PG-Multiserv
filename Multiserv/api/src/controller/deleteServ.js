const { Servicios } = require("../db.js");

const deleteServ = async (req, res) => {
    const id = req.params;
    try {
        let servicio = true;
        servicio = await Servicios.destroy({ where:{ id : id } });  
        !servicio ? res.send('No hay Servicios que coincidan') : res.send("Servicio borrado correctamente")
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteServ;