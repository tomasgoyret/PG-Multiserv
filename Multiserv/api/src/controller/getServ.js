const { db } = require("../db.js");

// get all services

const getServ = async (req, res) => {
    const {name} = req.query;
    try {
        const peticion = await db.collection("services").get();
        const { docs } = peticion
        if (docs.length <= 0) {
            res.send('No hay Servicios agregados aun')
        }
        else {
            const services = docs.map(serv => {
                let servicio = serv.data();
                return { servicio }
            })

// onSearch query by name 

            if(name){
                const servicesName = services.filter(serv => serv.servicio.title.toLowerCase().includes(name.toLowerCase()))
                res.json(servicesName)
            }
            else{
            res.json(services)
            }
        }
    } catch (error) {
        console.log(error)
    }
};

// get user by id specific

const getServId = async (req, res) => {
    const {id} = req.params;
    try {
        const peticion = await db.collection("services").where('id', '==', id).get();
        const { docs } = peticion
        if (docs.length <= 0) {
            res.send('No hay Servicios que coincidan')
        } else {
            const services = docs.map(serv => {
                let servicio = serv.data();
                return { servicio }
            })
            res.json(services)
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getServ,
    getServId
};