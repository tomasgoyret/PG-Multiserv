const { Servicios} = require("../db.js");

// get all ubicaciones

const getAllUbicacion = async (req, res,next) => {
    try {
        const ubicaciones = await Servicios.findAll( {
            attributes: {
                exclude: ['createdAt', 'updatedAt','nameUser','currency','description','max','min','estadoDePago','rating','photos',]
            }})
        ;
        res.send(ubicaciones)
    }  
    catch (error) {
        next(error)
    }
};

module.exports = getAllUbicacion;