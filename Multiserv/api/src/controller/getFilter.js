const { db } = require("../db.js");

const getFilter = async (req, res) => {

    const query  = req.query;

    // query --> { atributo: valor }
    // Busco en base de datos atributo con ese valor y filtro
    try {
        const peticion = await db.collection("services").where(Object.keys(query)[0], '==', Object.values(query)[0].toLowerCase()).get();        
        const { docs } = peticion;
        
        if (docs.length <= 0) {
            res.send('No hay Servicios que coincidan')
        } else {
            const services = docs.map(serv => {
            let servicio = serv.data();
            return { servicio }
        })
        res.send(services)}
    } catch (error) { console.log(error) }
}

module.exports = getFilter;