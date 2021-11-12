const { db } = require("../db.js");

// orderBy:   /oderby?catalogo={}&alfa={}
const getOrderBy = async (req, res) => {
    const query = req.query;
    
    try {
        const peticion = await db.collection("services").get();
        const { docs } = peticion;

        if (docs.length <= 0) {
            res.send('No hay Servicios agregados')
        }
        else {
            const services = docs.map(serv => {
                let servicio = serv.data();
                return { servicio }
            })
            // A-Z
            if (Object.keys(query)[0] === 'alfabe' && Object.values(query)[0] === 'asc') {
                services.sort(function (a, b) {
                    if (a.servicio.titulo.toLowerCase() > b.servicio.titulo.toLowerCase()) {
                        return 1;
                    }
                    if (a.servicio.titulo.toLowerCase() < b.servicio.titulo.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                });
                res.send(services)
            }

            // Z-A

            if (Object.keys(query)[0] === 'alfabe' && Object.values(query)[0] === 'desc') {
                services.sort(function (a, b) {
                    if (a.servicio.titulo.toLowerCase() < b.servicio.titulo.toLowerCase()) {
                        return 1;
                    }
                    if (a.servicio.titulo.toLowerCase() > b.servicio.titulo.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                });
                res.send(services)
            }

            // PUNTUACION MAYOR

            if (Object.keys(query)[0] === 'puntuacion' && Object.values(query)[0] === 'menor') {
                services.sort(function (a, b) {
                    if (a.servicio.value > b.servicio.value) {
                        return 1;
                    }
                    if (a.servicio.value < b.servicio.value) {
                        return -1;
                    }
                    return 0;
                });
                res.send(services)
            }

            // PUNTUACION MENOR

            if (Object.keys(query)[0] === 'puntuacion' && Object.values(query)[0] === 'mayor') {
                services.sort(function (a, b) {
                    if (a.servicio.value < b.servicio.value) {
                        return 1;
                    }
                    if (a.servicio.value > b.servicio.value) {
                        return -1;
                    }
                    return 0;
                });
                res.send(services)
            }
        }
    } catch (error) {
        console.log(error)
    }

};

module.exports = getOrderBy