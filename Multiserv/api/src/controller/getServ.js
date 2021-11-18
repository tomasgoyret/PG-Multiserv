const { Servicios, Categorias } = require("../db.js");

// get all services

const getServ = async (req, res) => {
    try {
        const servicios = await Servicios.findAll( {include :{
            model: Categorias,
            attributes: {
                exclude: ['createdAt', 'updatedAt','servicioId']
            }
        },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }})
        ;
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
        const servicio = await Servicios.findAll({ where:{ id }, include: Categorias });      
        servicio.length < 1 ? res.send('No hay Servicios que coincidan') : res.send(servicio)
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getServ,
    getServId
};