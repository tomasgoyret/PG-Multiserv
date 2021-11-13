const { db } = require("../db.js");

// orderBy:   /oderby -- default az  o por body le mandan el estado a ordenar {catalogo:[], rating:mayor/menor o title:asc/desc}
const getOrderBy = async (req, res) => {
    const {title, rating } = req.query
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

            // Order Default o title  A-Z

            if (!title && !rating || title === 'asc') {

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


            // title Z-A
            if (title=== 'desc') {
            services.sort(function (a, b) {
                if (a.servicio.title.toLowerCase() > b.servicio.title.toLowerCase()) {
                    return -1;
                }
                if (a.servicio.title.toLowerCase() < b.servicio.title.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            res.send(services)
        }

            // PUNTUACION MAYOR A MENOR

            if (rating=== 'desc') {
                services.sort(function (a, b) {
                    if (a.servicio.rating > b.servicio.rating) {
                        return -1;
                    }
                    if (a.servicio.rating < b.servicio.rating) {
                        return 1;
                    }
                    return 0;
                });
                res.send(services)
            }

            // PUNTUACION MENOR A MAYOR
            if (rating=== 'asc') {
                services.sort(function (a, b) {
                    if (a.servicio.rating > b.servicio.rating) {
                        return 1;
                    }
                    if (a.servicio.rating < b.servicio.rating) {
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