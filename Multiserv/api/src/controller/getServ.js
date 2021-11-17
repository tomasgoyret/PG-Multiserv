const { Servicios } = require("../db.js");

// get all services

const getServ = async (req, res) => {
    const {name} = req.query;
    try {
        const servicios = await Servicios.findAll();
        res.send(servicios)
    }  
    catch (error) {
        console.log(error)
    }
};

// get user by id specific

const getServId = async (req, res) => {
    const {id} = req.params;
    try {
        const servicio = await Servicios.findAll({ where:{ id : id } });        
        !servicio ? res.send('No hay Servicios que coincidan') : res.send(servicio)
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getServ,
    getServId
};