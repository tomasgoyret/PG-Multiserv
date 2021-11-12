const { db } = require("../db");

// orderBy:   /oderby -- default az  o por body le mandan el estado a ordenar {catalogo:[], rating:mayor/menor o title:asc/desc}
const getOrderBy = async (req, res) => {
    const body = req.body;
    try {
        const peticion = await db.collection("services").get();
        const { docs } = peticion;

        if (docs.length <= 0) {
            res.send('No hay Servicios agregados')
        }
        else {

            // Order Default A-Z

            if (Object.keys(body).length===0) {
                const services = docs.map(serv => {
                    let servicio = serv.data();
                    return { servicio }
                })
                services.sort(function (a, b) {
                    if (a.servicio.title.toLowerCase() > b.servicio.title.toLowerCase()) {
                        return 1;
                    }
                    if (a.servicio.title.toLowerCase() < b.servicio.title.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                });
                res.send(services)
            }

            // A-Z

            if (Object.keys(body)[1] === 'title' && Object.values(body)[1] === 'asc') {
                
                Object.values(body)[0].sort(function (a, b) {
                    if (a.servicio.title.toLowerCase() > b.servicio.title.toLowerCase()) {
                        return 1;
                    }
                    if (a.servicio.title.toLowerCase() < b.servicio.title.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                });
                res.send(Object.values(body)[0])
            }

            // Z-A

            if (Object.keys(body)[1] === 'title' && Object.values(body)[1] === 'desc') {
                Object.values(body)[0].sort(function (a, b) {
                    if (a.servicio.title.toLowerCase() < b.servicio.title.toLowerCase()) {
                        return 1;
                    }
                    if (a.servicio.title.toLowerCase() > b.servicio.title.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                });
                res.send(Object.values(body)[0])
            }

            // PUNTUACION MAYOR

            if (Object.keys(body)[1] === 'rating' && Object.values(body)[1] === 'menor') {
                Object.values(body)[0].sort(function (a, b) {
                    if (a.servicio.rating > b.servicio.rating) {
                        return 1;
                    }
                    if (a.servicio.rating < b.servicio.rating) {
                        return -1;
                    }
                    return 0;
                });
                res.send(Object.values(body)[0])
            }

            // PUNTUACION MENOR

            if (Object.keys(body)[1] === 'rating' && Object.values(body)[1] === 'mayor') {
                Object.values(body)[0].sort(function (a, b) {
                    if (a.servicio.rating < b.servicio.rating) {
                        return 1;
                    }
                    if (a.servicio.rating > b.servicio.rating) {
                        return -1;
                    }
                    return 0;
                });
                res.send(Object.values(body)[0])
            }
        }
    } catch (error) {
        console.log(error)
    }

};

module.exports = getOrderBy